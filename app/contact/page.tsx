import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ContactForm } from "@/components/contact-form"
import { contactInfo, organizationName, unitedStatesContactInfo } from "@/lib/data"
import { pageMetadata } from "@/lib/page-metadata"

export const metadata = pageMetadata(
  "Contact",
  "Contact Seeds of Life Global Inc. in Sibonga, Cebu or Upland, California about programs, partnerships, volunteering, or support.",
  "/contact",
)

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-hidden bg-[#f7f3e9] pt-[4.75rem]">
        <section className="bg-[#173b2a] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-[88rem]">
            <p className="eyebrow text-[#e8c957]">Contact</p>
            <h1 className="display-type mt-6 max-w-4xl text-5xl font-bold leading-[.92] sm:text-7xl lg:text-[clamp(5rem,9vw,8.5rem)]">Let&apos;s begin<br />with a conversation.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/75">Ask about areas of purpose, volunteering, partnerships, support or giving, and community activities.</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[88rem] gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[.42fr_1fr] lg:gap-20 lg:px-8 lg:py-36">
          <div>
            <p className="eyebrow text-[#a75434]">Send an inquiry</p>
            <p className="mt-6 max-w-xs text-lg leading-8 text-[#526659]">Use the form to send a message directly to {organizationName}, or use the contact details below.</p>
          </div>
          <ContactForm />
        </section>

        <section className="mx-auto grid max-w-[88rem] gap-12 px-4 pb-20 sm:px-6 sm:pb-28 lg:grid-cols-[.42fr_1fr] lg:gap-20 lg:px-8 lg:pb-36">
          <div><p className="eyebrow text-[#a75434]">Contact directly</p><p className="mt-6 max-w-xs leading-8 text-[#526659]">Prefer email or a phone call? Reach the team through the details below.</p></div>
          <div className="divide-y divide-[#173b2a]/15 border-y border-[#173b2a]/15">
            <a href={`mailto:${contactInfo.email}`} className="group grid min-h-28 gap-4 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
              <Mail aria-hidden="true" className="h-6 w-6 text-[#a75434]" />
              <div><h2 className="display-type text-3xl font-bold text-[#173b2a]">Email</h2><span className="mt-2 block break-all text-[#526659]">{contactInfo.email}</span></div>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-[#173b2a] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="group grid min-h-28 gap-4 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
              <Phone aria-hidden="true" className="h-6 w-6 text-[#a75434]" />
              <div><h2 className="display-type text-3xl font-bold text-[#173b2a]">Phone — Philippines</h2><span className="mt-2 block text-[#526659]">{contactInfo.phone}</span></div>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-[#173b2a] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <a href={`tel:${unitedStatesContactInfo.phone}`} className="group grid min-h-28 gap-4 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
              <Phone aria-hidden="true" className="h-6 w-6 text-[#a75434]" />
              <div><h2 className="display-type text-3xl font-bold text-[#173b2a]">Phone — United States</h2><span className="mt-2 block text-[#526659]">{unitedStatesContactInfo.phone}</span></div>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-[#173b2a] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <div className="grid min-h-28 gap-4 py-7 sm:grid-cols-[3rem_1fr] sm:items-center">
              <MapPin aria-hidden="true" className="h-6 w-6 text-[#a75434]" />
              <div><h2 className="display-type text-3xl font-bold text-[#173b2a]">Location — Philippines</h2><p className="mt-2 text-[#526659]">{contactInfo.address}</p></div>
            </div>
            <div className="grid min-h-28 gap-4 py-7 sm:grid-cols-[3rem_1fr] sm:items-center">
              <MapPin aria-hidden="true" className="h-6 w-6 text-[#a75434]" />
              <div><h2 className="display-type text-3xl font-bold text-[#173b2a]">Location — United States</h2><p className="mt-2 text-[#526659]">{unitedStatesContactInfo.address}</p></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
