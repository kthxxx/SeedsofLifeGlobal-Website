import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CommunityPhoto } from "@/components/community-photo"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { leadership, mission, organization, programAreas, tagline } from "@/lib/data"
import { pageMetadata } from "@/lib/page-metadata"

export const metadata = pageMetadata(
  "About",
  "Learn about Seeds of Life Global Inc., a non-stock, non-profit organization in Sibonga, Cebu.",
  "/about",
)

export default function AboutPage() {
  return <><Navbar /><main id="main-content" className="bg-[#f7f3e9] pt-[4.75rem] text-[#173b2a] [&_section]:scroll-mt-19">
    <section className="relative isolate flex min-h-[calc(100svh-4.75rem)] items-end overflow-hidden bg-[#173b2a] text-white">
      <Image src="/photos/children-day-gathering.webp" alt="Children and adults gathered beneath a covered court" fill priority unoptimized sizes="100vw" className="-z-20 object-cover object-[center_62%]" style={{ animation: "none" }} />
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "linear-gradient(0deg, rgba(10,31,21,.9) 0%, rgba(10,31,21,.55) 42%, rgba(10,31,21,.12) 100%)" }} />
      <div className="mx-auto w-full max-w-[88rem] px-4 pb-14 pt-32 sm:px-6 sm:pb-20 lg:px-8">
        <p className="text-sm font-semibold text-[#f0d978]">Who we are</p>
        <h1 className="display-type mt-5 max-w-5xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[.98]">Grounded in faith.<br />Rooted in community.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white">{tagline}</p>
      </div>
    </section>

    <section className="border-b border-[#173b2a]/15 bg-[#173b2a] text-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="text-sm font-semibold text-white/90">Our mission</p><div><h2 className="display-type max-w-4xl text-4xl font-bold leading-[1] text-white sm:text-5xl">Nurturing purpose in every child.</h2><p className="mt-8 max-w-3xl text-lg leading-8 text-white/90">{mission}</p></div></div></section>

    <section aria-labelledby="about-story-title" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-[88rem] items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div><p className="text-sm font-semibold text-[#526659]">Why we exist</p><h2 id="about-story-title" className="display-type mt-4 text-4xl font-bold leading-[1.06] sm:text-5xl">Room to learn.<br />People who care.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-[#345040]">We are Seeds of Life Global, a Philippine non-stock, non-profit organization based in Sibonga, Cebu. We help children discover purpose and grow in faith, character, and confidence.</p><p className="mt-5 max-w-xl leading-8 text-[#345040]">Our wider vision includes opportunities for young people to learn, families to build practical skills, and communities to care for each other and their environment.</p></div>
        <CommunityPhoto src="/photos/children-group-celebration.webp" alt="Children and adults smiling beneath a canopy with colorful balloons" caption="Children, teachers, and families sharing time together." />
      </div>
    </section>

    <section className="bg-[#e8c957]"><div className="mx-auto grid max-w-[88rem] lg:grid-cols-[1.05fr_.95fr]"><div className="relative min-h-[26rem] sm:min-h-[34rem]"><Image src="/photos/community-gathering.webp" alt="Children and adults gathered for a group photo outdoors" fill unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-[center_58%]" /></div><div className="flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-16 lg:px-16 xl:px-24"><p className="text-sm font-semibold text-[#173b2a]">Where we serve</p><h2 className="display-type mt-6 text-4xl font-bold leading-[1] text-[#173b2a] sm:text-5xl">Rooted in Sibonga, Cebu.</h2><p className="mt-7 max-w-md leading-8 text-[#526659]">Our home is {organization.location}. Here, our Bible study classes bring children, youth, and parents together. Our work with leaders and partners also connects us with communities across the Philippines and Asia.</p><Link href="/contact" className="editorial-link mt-9 text-[#173b2a]">Contact Seeds of Life <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div></div></section>

    <section className="relative isolate bg-[#173b2a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="text-sm font-semibold text-[#e8c957]">Rooted in faith</p><div><blockquote className="display-type max-w-4xl text-5xl font-bold leading-[.95] sm:text-5xl">&quot;I am the vine; you are the branches...&quot;</blockquote><p className="mt-5 text-sm font-semibold text-[#e8c957]">John 15:5</p><p className="mt-8 max-w-2xl leading-8 text-white/90">We believe lasting growth comes from abiding in Christ. This conviction guides our care for children and our commitment to helping them discover their gifts and serve others.</p></div></div></section>

    <section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-24"><div className="grid gap-10 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="text-sm font-semibold text-[#526659]">Our purpose</p><div><h2 className="display-type max-w-3xl text-4xl font-bold leading-[1] text-[#173b2a] sm:text-5xl">Five areas that guide our wider vision.</h2><p className="mt-6 max-w-2xl leading-8 text-[#345040]">These areas guide where we hope to grow. Some remain plans; explore our programs to see current activities and planned initiatives.</p><div className="mt-12 divide-y divide-[#173b2a]/15 border-y border-[#173b2a]/15">{programAreas.map((area) => <article key={area.title} className="py-5"><div><h3 className="text-lg font-semibold text-[#173b2a]">{area.title}</h3><p className="mt-2 max-w-2xl leading-7 text-[#526659]">{area.summary}</p></div></article>)}</div><Link href="/programs" className="mt-7 inline-flex min-h-11 items-center border-b border-[#173b2a] text-sm font-semibold">Explore our programs</Link></div></div></section>

    <section id="leadership" aria-labelledby="leadership-title" className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[88rem]"><p className="text-sm font-semibold text-[#526659]">Our founders</p><h2 id="leadership-title" className="display-type mt-4 max-w-3xl text-4xl font-bold leading-[1.06] sm:text-5xl">The people behind<br />Seeds of Life.</h2>
        <div className="mt-10 space-y-12 sm:mt-14 sm:space-y-16">{leadership.map((leader, index) => <article key={leader.slug} className={`grid items-center gap-8 lg:gap-16 ${index === 1 ? "lg:grid-cols-[1.25fr_.75fr]" : "lg:grid-cols-[.75fr_1.25fr]"}`}>
          <div className={`relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[.4rem] bg-[#dce5cf] ${index === 1 ? "lg:order-2" : ""}`}><Image src={leader.image} alt={`${leader.name}, ${leader.role}`} fill unoptimized sizes="(max-width: 1024px) 100vw, 35vw" className={`object-cover ${leader.imagePosition}`} /></div>
          <div className={index === 1 ? "lg:order-1" : ""}><p className="text-sm font-semibold text-[#526659]">{leader.role}</p><h3 className="display-type mt-3 text-3xl font-bold leading-[1.08] sm:text-4xl">{leader.name}</h3><p className="mt-5 max-w-xl text-lg leading-8 text-[#345040]">{leader.summary}</p><p className="mt-4 max-w-xl leading-8 text-[#345040]">{leader.bio[1]}</p><Link href={`/leadership/${leader.slug}`} className="mt-6 inline-flex min-h-11 items-center border-b border-[#173b2a] text-sm font-semibold hover:text-[#58724d]">Read full profile</Link></div>
        </article>)}</div>
      </div>
    </section>

    <section className="border-y border-[#173b2a]/15 bg-[#e1e9d7] px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-[88rem]"><p className="text-sm font-semibold text-[#526659]">Organizational information</p><dl className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4"><div><dt className="text-sm font-semibold text-[#526659]">Organization</dt><dd className="mt-3 text-lg font-bold text-[#173b2a]">{organization.name}</dd></div><div><dt className="text-xs font-bold uppercase tracking-[.15em] text-[#526659]">Status</dt><dd className="mt-3 text-lg font-bold text-[#173b2a]">Non-stock / non-profit</dd></div><div><dt className="text-xs font-bold uppercase tracking-[.15em] text-[#526659]">Classification</dt><dd className="mt-3 text-lg font-bold text-[#173b2a]">{organization.classification}</dd></div><div><dt className="text-xs font-bold uppercase tracking-[.15em] text-[#526659]">Corporate existence</dt><dd className="mt-3 text-lg font-bold text-[#173b2a]">Perpetual</dd></div></dl></div></section>
  </main><Footer /></>
}
