"use client"

import { FormEvent, useState } from "react"

const initialValues = { name: "", email: "", subject: "", message: "", website: "" }

export function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const update = (field: keyof typeof initialValues, value: string) => setValues((current) => ({ ...current, [field]: value }))

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const result = await response.json() as { message?: string }
      if (!response.ok) throw new Error(result.message ?? "We could not send your message. Please try again.")
      setStatus("success")
      setMessage("Thank you — your message has been sent. We’ll be in touch soon.")
      setValues(initialValues)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "We could not send your message. Please try again.")
    }
  }

  const fieldClass = "mt-2 w-full border border-[#173b2a]/25 bg-white px-4 py-3 text-[#173b2a] outline-none transition focus:border-[#173b2a] focus:ring-2 focus:ring-[#e8c957]"

  return (
    <form onSubmit={submit} className="border border-[#173b2a]/15 bg-[#eee5d5] p-6 sm:p-9" noValidate>
      <p className="eyebrow text-[#a75434]">Send a message</p>
      <h2 className="display-type mt-4 text-3xl font-bold text-[#173b2a] sm:text-4xl">How can we help?</h2>
      <p className="mt-4 max-w-xl leading-7 text-[#526659]">Share a little about your question or interest. Fields marked with an asterisk are required.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold text-[#173b2a]">Name <span aria-hidden="true">*</span><input className={fieldClass} name="name" autoComplete="name" required minLength={2} maxLength={100} value={values.name} onChange={(event) => update("name", event.target.value)} /></label>
        <label className="block text-sm font-bold text-[#173b2a]">Email <span aria-hidden="true">*</span><input className={fieldClass} name="email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={(event) => update("email", event.target.value)} /></label>
      </div>
      <label className="mt-5 block text-sm font-bold text-[#173b2a]">What is this about?<select className={fieldClass} name="subject" value={values.subject} onChange={(event) => update("subject", event.target.value)}><option value="">Select an option</option><option>Programs and activities</option><option>Volunteering</option><option>Partnership</option><option>Giving or support</option><option>Other</option></select></label>
      <label className="mt-5 block text-sm font-bold text-[#173b2a]">Message <span aria-hidden="true">*</span><textarea className={`${fieldClass} min-h-36 resize-y`} name="message" required minLength={20} maxLength={5000} value={values.message} onChange={(event) => update("message", event.target.value)} /></label>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label>Leave this field blank<input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} /></label></div>

      <button type="submit" disabled={status === "sending"} className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#173b2a] px-5 py-3 text-xs font-bold uppercase tracking-[.14em] text-white transition hover:bg-[#28533d] disabled:cursor-not-allowed disabled:opacity-60">{status === "sending" ? "Sending…" : "Send message"}</button>
      <p className="mt-4 text-sm leading-6 text-[#526659]">Your message is sent directly to the Seeds of Life Global team. Please do not include sensitive personal or financial information.</p>
      <p className={`mt-4 text-sm font-bold ${status === "error" ? "text-[#a75434]" : "text-[#173b2a]"}`} role="status" aria-live="polite">{message}</p>
    </form>
  )
}
