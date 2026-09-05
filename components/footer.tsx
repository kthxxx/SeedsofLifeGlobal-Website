import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { contactInfo, organizationName, tagline, unitedStatesContactInfo } from "@/lib/data"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const linkClass = "text-sm text-white/70 transition-colors hover:text-[#e8c957]"

  return <footer className="overflow-hidden bg-[#122b20] text-white"><div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
    <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.35fr_.65fr_1fr] lg:pb-16">
      <div><p className="eyebrow text-[#e8c957]">Seeds of Life Global Inc.</p><h2 className="display-type mt-5 max-w-md text-4xl font-bold leading-[.98] sm:text-5xl">{tagline}</h2><Link href="/involved" className="editorial-link mt-8 text-[#e8c957]">Get involved <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
      <div><h2 className="eyebrow text-[#e8c957]">Explore</h2><nav aria-label="Footer navigation" className="mt-5 grid gap-3"><Link href="/about" className={linkClass}>About</Link><Link href="/programs" className={linkClass}>Areas of purpose</Link><Link href="/gallery" className={linkClass}>Gallery</Link><Link href="/involved" className={linkClass}>Get involved</Link><Link href="/contact" className={linkClass}>Contact</Link></nav></div>
      <div><h2 className="eyebrow text-[#e8c957]">Contact directly</h2><div className="mt-5 grid gap-4 text-sm text-white/75"><a href={`mailto:${contactInfo.email}`} className="flex min-h-11 items-start gap-3 transition-colors hover:text-[#e8c957]"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /><span className="break-all">{contactInfo.email}</span></a><div className="grid gap-2"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#e8c957]">Philippines</p><a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-start gap-3 transition-colors hover:text-[#e8c957]"><Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{contactInfo.phone}</a><p className="flex items-start gap-3"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{contactInfo.address}</p></div><div className="grid gap-2"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#e8c957]">United States</p><a href={`tel:${unitedStatesContactInfo.phone}`} className="flex min-h-11 items-start gap-3 transition-colors hover:text-[#e8c957]"><Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{unitedStatesContactInfo.phone}</a><p className="flex items-start gap-3"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{unitedStatesContactInfo.address}</p></div></div></div>
    </div>
    <div className="pt-6 text-xs text-white/50 sm:flex sm:items-center sm:justify-between"><p>© {currentYear} {organizationName}. Non-stock, nonprofit organization based in Sibonga, Cebu.</p><p className="mt-3 sm:mt-0">&quot;I am the vine; you are the branches...&quot; — John 15:5</p></div>
  </div></footer>
}
