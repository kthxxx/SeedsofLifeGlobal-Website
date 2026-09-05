import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { leadership } from "@/lib/data"
import { pageMetadata } from "@/lib/page-metadata"
import { notFound } from "next/navigation"

type PageProps = {
  params: Promise<{ slug: string }>
}

function findLeader(slug: string) {
  return leadership.find((leader) => leader.slug === slug)
}

export function generateStaticParams() {
  return leadership.map((leader) => ({ slug: leader.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const leader = findLeader((await params).slug)
  if (!leader) return {}

  return pageMetadata(
    leader.name,
    `Learn about ${leader.name}, ${leader.role} of Seeds of Life Global Inc.`,
    `/leadership/${leader.slug}`,
  )
}

export default async function LeadershipProfilePage({ params }: PageProps) {
  const leader = findLeader((await params).slug)
  if (!leader) notFound()

  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-hidden bg-[#f7f3e9] pt-[4.75rem]">
        <header className="bg-[#173b2a] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-[88rem]">
            <Link href="/about" className="editorial-link text-[#e8c957]">About Seeds of Life <ArrowUpRight aria-hidden="true" className="h-4 w-4 rotate-[-135deg]" /></Link>
            <p className="eyebrow mt-12 text-[#e8c957]">Leadership</p>
            <h1 className="display-type mt-6 max-w-5xl text-5xl font-bold leading-[.92] sm:text-7xl lg:text-[clamp(5rem,9vw,8.5rem)]">{leader.name}</h1>
            <p className="mt-7 text-lg font-bold uppercase tracking-[.08em] text-white/75">{leader.role}</p>
          </div>
        </header>

        <section className="mx-auto grid max-w-[88rem] gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[.72fr_1fr] lg:gap-20 lg:px-8 lg:py-36">
          <div className="relative min-h-[30rem] overflow-hidden bg-[#dce5cf] sm:min-h-[42rem] lg:min-h-full">
            <Image src={leader.image} alt={`${leader.name}, ${leader.role}`} fill sizes="(max-width: 1024px) 100vw, 45vw" className={`object-cover ${leader.imagePosition}`} priority />
          </div>
          <div>
            <p className="eyebrow text-[#a75434]">In her own work</p>
            <p className="display-type mt-6 max-w-3xl text-4xl font-bold leading-[1.05] text-[#173b2a] sm:text-5xl">{leader.summary}</p>
            <div className="mt-10 grid max-w-2xl gap-6 text-lg leading-8 text-[#526659]">{leader.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <Link href="/contact" className="editorial-link mt-11 text-[#173b2a]">Connect with Seeds of Life <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
