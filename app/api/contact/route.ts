import { NextResponse } from "next/server"
import { ContactRequestError, checkContactRateLimit, isAllowedContactOrigin, readContactBody } from "@/lib/contact-security"

export const runtime = "nodejs"

const recipient = process.env.CONTACT_TO_EMAIL ?? "seedsoflifeglobal@gmail.com"

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!)
}

function json(body: object, status = 200, extraHeaders: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } })
}

export async function POST(request: Request) {
  if (!isAllowedContactOrigin(request)) {
    return json({ message: "Invalid request origin." }, 403)
  }

  let body: Record<string, unknown>
  try {
    body = await readContactBody(request)
  } catch (error) {
    if (error instanceof ContactRequestError) return json({ message: error.message }, error.status)
    return json({ message: "Invalid form submission." }, 400)
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const subject = typeof body.subject === "string" ? body.subject.trim() : ""
  const message = typeof body.message === "string" ? body.message.trim() : ""
  const website = typeof body.website === "string" ? body.website.trim() : ""
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (website) return json({ ok: true })
  if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || message.length < 20 || message.length > 5000 || subject.length > 100 || /[\x00-\x1f\x7f]/.test(name + email + subject)) {
    return json({ message: "Please complete the required fields with valid information." }, 400)
  }

  try {
    const limit = await checkContactRateLimit(request)
    if (limit.limited) return json({ message: "Too many messages. Please try again later." }, 429, { "Retry-After": String(limit.retryAfter) })
  } catch {
    return json({ message: "The contact form is temporarily unavailable. Please email us directly." }, 503)
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !from) return json({ message: "The contact form is not configured yet. Please email us directly." }, 503)

  const safeSubject = subject || "General inquiry"
  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `[Website] ${safeSubject} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nTopic: ${safeSubject}\n\n${message}`,
        html: `<h2>Website inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}<br /><strong>Email:</strong> ${escapeHtml(email)}<br /><strong>Topic:</strong> ${escapeHtml(safeSubject)}</p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      }),
    })

    if (!resendResponse.ok) throw new Error("Email provider rejected the request")
  } catch {
    // Provider responses may contain personal information; don't log their bodies.
    console.error("Contact email delivery failed")
    return json({ message: "We could not send your message. Please try again or email us directly." }, 502)
  }

  return json({ ok: true })
}
