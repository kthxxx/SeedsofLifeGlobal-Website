import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CalendarDays } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { pageMetadata } from "@/lib/page-metadata"

export const metadata = pageMetadata(
  "Mt. Moriah Opening",
  "An archived Seeds of Life Global story about the Mt. Moriah Campground opening on December 28, 2024.",
  "/stories/mt-moriah-opening",
)

const activities = [
  { number: "01", title: "Tree planting", text: "Children planted trees around the campground, connecting the day’s celebration with care for creation." },
  { number: "02", title: "Creative expression", text: "Children colored and painted the Mt. Moriah sign as part of a shared community art activity." },
  { number: "03", title: "Cooking together", text: "The newly finished kitchen became a place for children to prepare meals and share food together." },
  { number: "04", title: "Song and dance", text: "Music, laughter, singing, and dancing were part of the opening-day celebration." },
]

const mtMoriahPhotos = [
  { src: "/photos/mt-moriah/IMG_2104.jpg", alt: "A group standing beside the Mt. Moriah sign", caption: "Together beside the Mt. Moriah sign" },
  { src: "/photos/mt-moriah/IMG_4057.jpg", alt: "Children and adults gathered beneath a shelter at Mt. Moriah", caption: "A gathering at the campsite" },
  { src: "/photos/mt-moriah/IMG_4084.jpg", alt: "Young people sharing a meal at an outdoor table", caption: "Sharing a meal outdoors" },
  { src: "/photos/mt-moriah/IMG_3973.jpg", alt: "Children and adults taking part in an outdoor group activity", caption: "An outdoor group activity" },
] as const

export default function MtMoriahOpeningStory() {
  return <><Navbar /><main id="main-content" className="overflow-hidden bg-[#f7f3e9] pt-[4.75rem]">
    <article>
      <header className="relative isolate overflow-hidden bg-[#173b2a] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8 lg:py-36"><Image src="/photos/mt-moriah/IMG_2145.jpg" alt="People standing beside the Mt. Moriah Camp Site signs" fill priority unoptimized sizes="100vw" className="-z-20 object-cover object-[center_55%]" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,31,21,.94)_0%,rgba(10,31,21,.72)_52%,rgba(10,31,21,.38)_100%)]" /><div className="mx-auto max-w-[88rem]"><p className="eyebrow text-[#e8c957]">Previously shared story</p><div className="mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-[.14em] text-white/85"><CalendarDays aria-hidden="true" className="h-4 w-4 text-[#e8c957]" /><time dateTime="2024-12-28">December 28, 2024</time></div><h1 className="display-type mt-7 max-w-5xl text-5xl font-bold leading-[.92] sm:text-7xl lg:text-[clamp(5rem,9vw,8.5rem)]">A new chapter begins:<br />Mt. Moriah opens its doors.</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-white/85">An archived account of the Mt. Moriah Campground opening and the official launch of Seeds of Life Global, as previously shared on the organization’s website.</p></div></header>

      <section className="mx-auto grid max-w-[88rem] gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[.42fr_1fr] lg:gap-20 lg:px-8 lg:py-36"><p className="eyebrow text-[#a75434]">Opening day</p><div><p className="display-type max-w-4xl text-4xl font-bold leading-[1.05] text-[#173b2a] sm:text-6xl">A dream became a gathering place.</p><p className="mt-8 max-w-2xl text-lg leading-8 text-[#526659]">On December 28, 2024, Mt. Moriah Campground officially opened its gates. The story previously published by Seeds of Life Global described a day of celebration with more than 50 children and their families.</p><p className="mt-5 max-w-2xl leading-8 text-[#526659]">It marked a shared vision for a place where young people could discover purpose, build relationships, and grow in faith and community.</p><dl className="mt-12 grid gap-8 border-y border-[#173b2a]/15 py-8 sm:grid-cols-2"><div><dt className="eyebrow text-[#a75434]">Opening date</dt><dd className="display-type mt-3 text-3xl font-bold text-[#173b2a]">Dec. 28, 2024</dd></div><div><dt className="eyebrow text-[#a75434]">Previously shared</dt><dd className="display-type mt-3 text-3xl font-bold text-[#173b2a]">50+ children celebrated</dd></div></dl></div></section>

      <section className="bg-[#e9e1d0] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"><div className="mx-auto max-w-[88rem]"><div className="grid gap-8 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="eyebrow text-[#a75434]">Mt. Moriah in photographs</p><div><h2 className="display-type max-w-3xl text-4xl font-bold leading-[1] text-[#173b2a] sm:text-6xl">A place for people to gather.</h2><p className="mt-6 max-w-2xl leading-8 text-[#526659]">These images show Mt. Moriah and gatherings there. Their photo dates have not been confirmed, so they are not presented as a record of the December 2024 opening day.</p></div></div><div className="mt-12 grid gap-8 md:grid-cols-2">{mtMoriahPhotos.map((photo) => <figure key={photo.src}><div className="relative aspect-[4/3] overflow-hidden bg-[#dce5cf]"><Image src={photo.src} alt={photo.alt} fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><figcaption className="mt-3 text-sm leading-6 text-[#526659]">{photo.caption}</figcaption></figure>)}</div></div></section>

      <section className="bg-[#e9e1d0] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"><div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="eyebrow text-[#a75434]">A day together</p><div><h2 className="display-type max-w-4xl text-4xl font-bold leading-[1] text-[#173b2a] sm:text-6xl">Meaningful activities, shared by many hands.</h2><div className="mt-12 divide-y divide-[#173b2a]/15 border-y border-[#173b2a]/15">{activities.map((activity) => <article key={activity.title} className="grid gap-5 py-7 sm:grid-cols-[5rem_1fr]"><span className="display-type text-4xl text-[#a75434]">{activity.number}</span><div><h3 className="text-xl font-bold uppercase tracking-[.04em] text-[#173b2a]">{activity.title}</h3><p className="mt-3 max-w-2xl leading-8 text-[#526659]">{activity.text}</p></div></article>)}</div></div></div></section>

      <section className="bg-[#f7f3e9] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"><div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="eyebrow text-[#a75434]">Seeds of Life Global</p><div><h2 className="display-type max-w-4xl text-4xl font-bold leading-[1] text-[#173b2a] sm:text-6xl">An official launch, shared in the spirit of partnership.</h2><div className="mt-8 max-w-2xl border-l-2 border-[#a75434] pl-6 text-lg leading-8 text-[#526659]"><p>The previous website announced Seeds of Life Global as a partner organization of Mt. Moriah. It described a shared commitment to children’s development through mentorship, education, and formative community experiences.</p><p className="mt-5">The opening story also recognized co-founder Jennifer Moore and her family, who were described as having travelled from the United States for the occasion.</p></div></div></div></section>

      <section className="relative isolate bg-[#2d5139] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8"><div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(#e8c957_1px,transparent_1px)] [background-size:18px_18px]" /><div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="eyebrow text-[#e8c957]">A foundation of faith</p><div><blockquote className="display-type max-w-4xl text-5xl font-bold leading-[.95] sm:text-7xl">&quot;I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit...&quot;</blockquote><p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-[#e8c957]">John 15:5</p><p className="mt-8 max-w-2xl leading-8 text-white/75">The opening story presented Mt. Moriah as a place for children to grow in faith, discover their gifts, and find connection in community.</p></div></div></section>

      <section className="border-y border-[#173b2a]/15 bg-[#dce5cf] px-4 py-20 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.42fr_1fr] lg:gap-20"><p className="eyebrow text-[#a75434]">Looking forward</p><div><h2 className="display-type max-w-4xl text-4xl font-bold leading-[1] text-[#173b2a] sm:text-6xl">What the 2024 story hoped to grow.</h2><p className="mt-7 max-w-2xl leading-8 text-[#526659]">The original opening story looked ahead to programs, facilities, community partnerships, mentoring, and environmental care. These were shared aspirations at the time; contact the organization for current information.</p><Link href="/contact" className="editorial-link mt-9 text-[#173b2a]">Ask about current activities <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div></div></section>

      <footer className="mx-auto max-w-[88rem] px-4 py-10 text-sm leading-7 text-[#526659] sm:px-6 lg:px-8"><div className="border-t border-[#173b2a]/15 pt-6"><span className="font-bold text-[#173b2a]">Archive note: </span>This page is based on content previously published by Seeds of Life Global about the December 28, 2024 Mt. Moriah opening. It is a historical account, not a confirmation of current activities or future plans.</div></footer>
    </article>
  </main><Footer /></>
}
