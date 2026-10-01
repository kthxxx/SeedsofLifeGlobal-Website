"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, CheckCircle2, ChevronDown, Loader2, Send, ShieldCheck } from "lucide-react"
import { contactTopics, type ContactTopic } from "@/lib/contact-topics"

const initialValues = { name: "", email: "", subject: "", message: "", website: "" }

export function ContactForm({ initialTopic }: { initialTopic?: ContactTopic }) {
  const initialSubject = initialTopic ? contactTopics[initialTopic].subject : ""
  const [values, setValues] = useState({ ...initialValues, subject: initialSubject })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const update = (field: keyof typeof initialValues, value: string) =>
    setValues((current) => ({ ...current, [field]: value }))

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
      const result = (await response.json()) as { message?: string }
      if (!response.ok)
        throw new Error(result.message ?? "We could not send your message. Please try again.")
      setStatus("success")
      setMessage("Thank you — your message has been sent. We’ll be in touch soon.")
      setValues({ ...initialValues, subject: initialSubject })
    } catch (error) {
      setStatus("error")
      setMessage(
        error instanceof Error ? error.message : "We could not send your message. Please try again."
      )
    }
  }

  const topicPrompt = Object.values(contactTopics).find(
    (topic) => topic.subject === values.subject
  )?.prompt

  const inputClass =
    "w-full rounded-xl border border-[#173b2a]/20 bg-[#faf8f5] px-4 py-3.5 text-[#173b2a] placeholder-[#173b2a]/40 outline-none transition-all duration-200 focus:border-[#173b2a] focus:bg-white focus:ring-4 focus:ring-[#173b2a]/10"

  return (
    <div className="scroll-mt-24 rounded-3xl border border-[#173b2a]/12 bg-white p-7 shadow-[0_12px_40px_rgba(23,59,42,0.06)] sm:p-10 lg:p-12">
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-10 rounded-full bg-[#a75434]" />
        <p className="eyebrow text-[#a75434]">Send a message</p>
      </div>

      <h2 className="display-type mt-4 text-3xl font-bold text-[#173b2a] sm:text-4xl lg:text-[2.5rem]">
        How can we help?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-[#526659]">
        Share a little about your question or interest. Fields marked with an asterisk (
        <span className="text-[#a75434] font-semibold">*</span>) are required.
      </p>

      {status === "success" ? (
        <div className="mt-8 rounded-2xl border border-[#58724d]/30 bg-[#f4f7f2] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#173b2a] text-[#e8c957]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="display-type mt-4 text-2xl font-bold text-[#173b2a]">Message Received!</h3>
          <p className="mt-2 text-[#526659] leading-relaxed max-w-md mx-auto">{message}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#173b2a] hover:text-[#a75434] transition-colors"
          >
            Send another message
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <form id="contact-form" onSubmit={submit} className="mt-8 space-y-6" noValidate>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                Name <span className="text-[#a75434]" aria-hidden="true">*</span>
              </label>
              <input
                className={inputClass}
                name="name"
                placeholder="Jane Doe"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
                Email <span className="text-[#a75434]" aria-hidden="true">*</span>
              </label>
              <input
                className={inputClass}
                name="email"
                type="email"
                placeholder="jane@example.com"
                autoComplete="email"
                required
                maxLength={254}
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
              What is this about?
            </label>
            <div className="relative">
              <select
                className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                name="subject"
                value={values.subject}
                onChange={(event) => update("subject", event.target.value)}
              >
                <option value="">Select an option</option>
                <option>Programs and activities</option>
                <option>Volunteering</option>
                <option>Partnership</option>
                <option>Giving or support</option>
                <option>Other</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#173b2a]/60"
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#173b2a]">
              Message <span className="text-[#a75434]" aria-hidden="true">*</span>
            </label>
            {topicPrompt && (
              <p className="mb-3 rounded-lg border border-[#173b2a]/10 bg-[#f0ebd9]/70 px-3.5 py-2 text-xs font-medium leading-relaxed text-[#173b2a]">
                {topicPrompt}
              </p>
            )}
            {!topicPrompt && (
              <p className="mb-2 text-xs text-[#526659]">
                Tell us a little about your question or interest.
              </p>
            )}
            <textarea
              className={`${inputClass} min-h-[150px] resize-y`}
              name="message"
              placeholder="How can we help or collaborate with you?"
              required
              minLength={20}
              maxLength={5000}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
            />
          </div>

          {/* Honeypot anti-spam field */}
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Leave this field blank
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => update("website", event.target.value)}
              />
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="cta-button group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-[#173b2a] px-7 py-4 text-xs font-bold uppercase tracking-[.14em] text-white shadow-md shadow-[#173b2a]/10 transition-all hover:bg-[#234d38] hover:shadow-lg hover:shadow-[#173b2a]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#e8c957]" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-start gap-2.5 pt-2 text-xs leading-5 text-[#526659]">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#58724d]" aria-hidden="true" />
            <p>
              Your message is sent directly to the Seeds of Life Global team. We value your privacy and respond within 1–2 business days.
            </p>
          </div>

          {status === "error" && (
            <p
              className="mt-4 rounded-xl bg-[#a75434]/10 border border-[#a75434]/20 p-4 text-sm font-medium text-[#a75434]"
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
