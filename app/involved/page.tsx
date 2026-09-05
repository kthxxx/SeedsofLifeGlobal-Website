import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { pageMetadata } from "@/lib/page-metadata"

export const metadata = pageMetadata(
  "Get involved",
  "Contact Seeds of Life Global Inc. about learning, collaboration, partnerships, or nonprofit support.",
  "/involved",
)

const actions = [
  { number: "01", title: "Connect", text: "Ask about educational and community-development activities, including any current opportunities to participate.", label: "Contact the team" },
  { number: "02", title: "Volunteer", text: "Express interest in supporting community, environmental, educational, or humanitarian initiatives. Current roles and requirements are confirmed directly by the organization.", label: "Ask about volunteering" },
  { number: "03", title: "Partner", text: "The corporation is authorized to partner with local organizations, schools, and government agencies for educational and social-development programs.", label: "Discuss a partnership" },
  { number: "04", title: "Support", text: "The corporation is authorized to accept donations, grants, and voluntary contributions, managed exclusively for nonprofit purposes. This website does not process payments.", label: "Ask about giving" },
]

export default function GetInvolvedPage() {
  return <><Navbar /><main id="main-content" className="overflow-hidden bg-[#f7f3e9] pt-[4.75rem]">
    <section className="relative isolate overflow-hidden bg-[#173b2a] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8 lg:py-36"><Image src="/hero-background.jpg" alt="Seeds of Life Global community gathering in Cebu" fill priority sizes="100vw" className="-z-20 object-cover object-[center_58%]" /><div className="absolute inset-0 -z-10 bg-[#10291e]/85" /><div className="mx-auto max-w-[88rem]"><p className="eyebrow text-[#e8c957]">Get involved</p><h1 className="display-type mt-6 max-w-4xl text-5xl font-bold leading-[.92] sm:text-7xl lg:text-[clamp(5rem,9vw,8.5rem)]">Grow something<br />that matters.</h1><p className="mt-8 max-w-xl text-lg leading-8 text-white/80">Bring your questions, time, skills, care, or partnership to a conversation with Seeds of Life Global.</p></div></section>

    <section className="mx-auto grid max-w-[88rem] gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[.42fr_1fr] lg:gap-20 lg:px-8 lg:py-36"><p className="eyebrow text-[#a75434]">Ways to connect</p><div><h2 className="display-type max-w-4xl text-4xl font-bold leading-[1] text-[#173b2a] sm:text-6xl">Start with the path that feels most useful to you.</h2><div className="mt-12 divide-y divide-[#173b2a]/15 border-y border-[#173b2a]/15">{actions.map((action) => <article key={action.title} className="group grid gap-5 py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-start sm:gap-8"><span className="display-type text-4xl text-[#a75434]">{action.number}</span><div><h3 className="display-type text-3xl font-bold text-[#173b2a] sm:text-4xl">{action.title}</h3><p className="mt-3 max-w-2xl leading-8 text-[#526659]">{action.text}</p></div><Link href="/contact" className="editorial-link min-h-11 self-center text-[#173b2a] sm:justify-self-end">{action.label} <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></article>)}</div></div></section>

    <section className="bg-[#dce5cf] px-4 py-20 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="eyebrow text-[#a75434]">A transparent next step</p><div><h2 className="display-type max-w-3xl text-4xl font-bold leading-[1] text-[#173b2a] sm:text-6xl">No checkout. Just a direct conversation.</h2><p className="mt-6 max-w-2xl leading-8 text-[#526659]">Seeds of Life Global does not currently process payments on this website. Contact the organization for verified information about support or giving.</p><Link href="/contact" className="editorial-link mt-9 text-[#173b2a]">Contact Seeds of Life <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div></div></section>
  </main><Footer /></>
}
