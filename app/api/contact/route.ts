import { NextResponse } from "next/server"

export const runtime = "nodejs"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seedsoflifeglobal.org"
const recipient = process.env.CONTACT_TO_EMAIL ?? "seedsoflifeglobal@gmail.com"
const rateLimits = new Map<string, { count: number; resetAt: number }>()
const windowMs = 15 * 60 * 1000
const maxRequests = 5

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!)
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = rateLimits.get(ip)
  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }
  current.count += 1
  return current.count > maxRequests
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  if (origin && origin !== new URL(siteUrl).origin && !origin.startsWith("http://localhost:")) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 })
  }

  const forwardedFor = request.headers.get("x-forwarded-for")
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown"
  if (isRateLimited(ip)) return NextResponse.json({ message: "Too many messages. Please try again later." }, { status: 429 })

  let body: { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; website?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const subject = typeof body.subject === "string" ? body.subject.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""
  const website = typeof body.website === "string" ? body.website.trim() : ""
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (website) return NextResponse.json({ ok: true })
  if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || message.length < 20 || message.length > 5000 || subject.length > 100) {
    return NextResponse.json({ message: "Please complete the required fields with valid information." }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !from) return NextResponse.json({ message: "The contact form is not configured yet. Please email us directly." }, { status: 503 })

  const safeSubject = subject || "General inquiry"
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: email,
      subject: `[Website] ${safeSubject} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${safeSubject}\n\n${message}`,
      html: `<h2>Website inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}<br /><strong>Email:</strong> ${escapeHtml(email)}<br /><strong>Topic:</strong> ${escapeHtml(safeSubject)}</p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    }),
  })

  if (!resendResponse.ok) {
    console.error("Resend contact email failed", await resendResponse.text())
    return NextResponse.json({ message: "We could not send your message. Please try again or email us directly." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
