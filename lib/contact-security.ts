import { createHmac } from "node:crypto"
import { isIP } from "node:net"

const maxBodyBytes = 32 * 1024
const windowSeconds = 15 * 60
const maxRequests = 5
// Local development only: one bounded bucket, never caller-provided IP headers.
let localBucket = { count: 0, resetAt: 0 }

export class ContactRequestError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

export function isAllowedContactOrigin(request: Request) {
  const origin = request.headers.get("origin")
  if (!origin) return false
  try {
    const parsed = new URL(origin)
    if (parsed.origin !== origin) return false
    const allowed = new Set([
      new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seedsoflifeglobal.org").origin,
      ...(process.env.CONTACT_ALLOWED_ORIGINS ?? "").split(",").filter(Boolean).map(value => new URL(value.trim()).origin),
    ])
    if (process.env.VERCEL === "1") {
      for (const host of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]) {
        if (host) allowed.add(new URL(`https://${host}`).origin)
      }
    }
    if (allowed.has(origin)) return true
    // Never allow loopback origins on a deployed preview or production function.
    return process.env.NODE_ENV === "development" && process.env.VERCEL !== "1"
      && ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname)
      && parsed.origin === new URL(request.url).origin
  } catch {
    return false
  }
}

export async function readContactBody(request: Request): Promise<Record<string, unknown>> {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new ContactRequestError(415, "Please submit the form as JSON.")
  }
  const length = request.headers.get("content-length")
  if (length && (!/^\d+$/.test(length) || Number(length) > maxBodyBytes)) {
    throw new ContactRequestError(413, "Your message is too large.")
  }
  if (!request.body) throw new ContactRequestError(400, "Invalid form submission.")

  const reader = request.body.getReader()
  const decoder = new TextDecoder("utf-8", { fatal: true })
  let bytes = 0
  let text = ""
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new ContactRequestError(408, "The submission timed out. Please try again."))
      void reader.cancel().catch(() => {})
    }, 5000)
  })
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), timeout])
      if (done) break
      bytes += value.byteLength
      if (bytes > maxBodyBytes) {
        void reader.cancel().catch(() => {})
        throw new ContactRequestError(413, "Your message is too large.")
      }
      text += decoder.decode(value, { stream: true })
    }
    text += decoder.decode()
    const body: unknown = JSON.parse(text)
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new ContactRequestError(400, "Invalid form submission.")
    }
    const record = body as Record<string, unknown>
    for (const field of ["name", "email", "subject", "message", "website"]) {
      if (record[field] !== undefined && typeof record[field] !== "string") {
        throw new ContactRequestError(400, "Invalid form submission.")
      }
    }
    return record
  } catch (error) {
    if (error instanceof ContactRequestError) throw error
    throw new ContactRequestError(400, "Invalid form submission.")
  } finally {
    clearTimeout(timer)
    reader.releaseLock()
  }
}

// One EVAL ensures a counter cannot be created without a TTL by another instance.
const rateLimitScript = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return {count, redis.call('TTL', KEYS[1])}
`

export async function checkContactRateLimit(request: Request): Promise<{ limited: boolean; retryAfter: number }> {
  if (process.env.NODE_ENV === "development" && process.env.VERCEL !== "1") {
    const now = Date.now()
    if (localBucket.resetAt <= now) localBucket = { count: 0, resetAt: now + windowSeconds * 1000 }
    localBucket.count = Math.min(localBucket.count + 1, maxRequests + 1)
    return { limited: localBucket.count > maxRequests, retryAfter: Math.max(1, Math.ceil((localBucket.resetAt - now) / 1000)) }
  }

  // Trust this header only when executing behind Vercel's own ingress.
  // Do not fall back to x-forwarded-for or a caller-controlled shared "unknown" key.
  const ip = request.headers.get("x-vercel-forwarded-for")?.trim()
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (process.env.VERCEL !== "1" || !ip || !isIP(ip) || !url || !token) {
    throw new ContactRequestError(503, "The contact form is temporarily unavailable. Please email us directly.")
  }

  try {
    const endpoint = new URL(url)
    if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password || endpoint.search || endpoint.hash) throw new Error("Invalid Redis URL")
    const key = `sol:contact:v1:${createHmac("sha256", token).update(ip).digest("hex")}`
    const response = await fetch(endpoint.href, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", rateLimitScript, "1", key, String(windowSeconds)]),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    })
    if (!response.ok) throw new Error("Rate limiter unavailable")
    const body: unknown = await response.json()
    const result = body && typeof body === "object" && "result" in body ? body.result : undefined
    if (!Array.isArray(result) || result.length !== 2 || !Number.isSafeInteger(result[0]) || result[0] < 1 || !Number.isSafeInteger(result[1]) || result[1] < 0 || result[1] > windowSeconds) {
      throw new Error("Invalid rate limit response")
    }
    return { limited: result[0] > maxRequests, retryAfter: Math.max(1, result[1]) }
  } catch {
    // Never expose Redis credentials/provider errors or silently bypass protection.
    throw new ContactRequestError(503, "The contact form is temporarily unavailable. Please email us directly.")
  }
}
