import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { currentImpact, ministryFocuses, programAreas } from "@/lib/data"
import { PartnerLogoLoop } from "@/components/partner-logo-loop"

function CommunityPhoto({ src, alt, caption, className = "", imageClass = "object-center", sizes = "(max-width: 768px) 100vw, 33vw" }: { src: string; alt: string; caption: string; className?: string; imageClass?: string; sizes?: string }) {
  return (
    <figure className={className}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[.35rem] bg-[#dce5cf]">
        <Image src={src} alt={alt} fill unoptimized sizes={sizes} className={`object-cover ${imageClass}`} />
      </div>
      <figcaption className="mt-3 text-sm leading-6">{caption}</figcaption>
    </figure>
  )
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#f7f3e9] pt-[4.75rem] text-[#173b2a] [&_section]:scroll-mt-19">
        <section className="relative isolate flex min-h-[calc(100svh-4.75rem)] items-end overflow-hidden bg-[#173b2a] text-white">
          <Image
            src="/hero-background.jpg"
            alt="Seeds of Life Global community gathering in rural Cebu"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="-z-20 object-cover object-[center_60%]"
            style={{ animation: "none" }}
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,31,21,.84)_0%,rgba(10,31,21,.52)_50%,rgba(10,31,21,.12)_100%)] max-sm:bg-[linear-gradient(0deg,rgba(10,31,21,.88)_0%,rgba(10,31,21,.52)_58%,rgba(10,31,21,.12)_100%)]" />
          <div className="mx-auto w-full max-w-[88rem] px-4 pb-14 pt-36 sm:px-6 sm:pb-20 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold text-[#f0d978]">Seeds of Life Global · Sibonga, Cebu</p>
              <h1 className="display-type mt-5 text-[clamp(3.3rem,6vw,6rem)] font-bold leading-[.95]">Planting seeds.<br />Nurturing lives.</h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white sm:text-lg sm:leading-8">
                We bring children, youth, and families together through Community Bible Study classes and shared time in Sibonga, Cebu.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link href="/programs" className="inline-flex min-h-11 items-center bg-[#e8c957] px-6 py-3 text-sm font-semibold text-[#173b2a] transition-colors hover:bg-[#f2d96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  See our programs
                </Link>
                <Link href="/about" className="inline-flex min-h-11 items-center border-b border-white text-sm font-semibold transition-colors hover:text-[#e8c957]">
                  Get to know us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="why-title" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-[88rem]">
            <div className="grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-24">
              <div>
                <p className="text-sm font-semibold text-[#526659]">Why we exist</p>
                <h2 id="why-title" className="display-type mt-4 max-w-xl text-4xl font-bold leading-[1.06] sm:text-6xl">A place to learn.<br />People to grow with.</h2>
              </div>
              <div className="max-w-xl text-base leading-8 text-[#345040] sm:text-lg">
                <p>We want every child to discover a sense of purpose. Our Bible study classes make space for learning, connection, and growth rooted in Christ.</p>
                <p className="mt-4">Our wider vision brings education, practical skills, care for the environment, and support for families together with the people and places around each child.</p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 items-start gap-4 text-[#345040] sm:mt-14 sm:grid-cols-[1.15fr_.85fr_1fr] sm:gap-6">
              <CommunityPhoto src="/photos/children-day-outdoors.webp" alt="Children gathered outdoors wearing colorful animal headbands" caption="Room for every child to take part." className="col-span-2 sm:col-span-1" sizes="(max-width: 640px) 100vw, 40vw" />
              <CommunityPhoto src="/photos/community-care.webp" alt="A woman holding bags of supplies in a classroom with children" caption="Care in the everyday moments." className="sm:mt-14" imageClass="object-[65%_center]" />
              <CommunityPhoto src="/photos/mt-moriah/IMG_4084.jpg" alt="Young people gathered around a shared meal outdoors at Mt. Moriah" caption="Time together at Mt. Moriah." className="sm:mt-6" />
            </div>
          </div>
        </section>

        <section id="current-work" aria-labelledby="current-work-title" className="bg-[#e1e9d7] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-[88rem]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
              <h2 id="current-work-title" className="display-type max-w-xl text-4xl font-bold leading-[1.06] sm:text-5xl">What we are doing now</h2>
              <p className="max-w-lg leading-8 text-[#345040]">Our work starts with time spent together: teaching, listening, and making room for children and young people to take part.</p>
            </div>
            <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
              <article className="overflow-hidden rounded-[.4rem] bg-white">
                <div className="relative aspect-[3/2] bg-[#dce5cf]">
                  <Image src="/photos/community-study-circle.webp" alt="Children seated outdoors while a teacher speaks with them" fill unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-center" />
                </div>
                <div className="p-6 sm:p-9">
                  <p className="text-sm font-semibold text-[#526659]">{currentImpact.program.status}</p>
                  <h3 className="display-type mt-3 text-3xl font-bold leading-[1.08] sm:text-4xl">{currentImpact.program.title}</h3>
                  <p className="mt-5 max-w-xl leading-8 text-[#345040]">{currentImpact.program.description}</p>
                  <Link href="/programs" className="mt-5 inline-flex min-h-11 items-center border-b border-[#173b2a] text-sm font-semibold transition-colors hover:text-[#58724d]">Read about our programs</Link>
                </div>
              </article>
              <article className="overflow-hidden rounded-[.4rem] bg-[#e8c957] lg:mt-16">
                <div className="relative aspect-[4/3] bg-[#dce5cf]">
                  <Image src="/photos/mt-moriah/IMG_3973.jpg" alt="Children and adults gathered among chairs outdoors at Mt. Moriah" fill unoptimized sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-center" />
                </div>
                <div className="p-6 sm:p-9">
                  <p className="text-sm font-semibold">{currentImpact.mtMoriah.status}</p>
                  <h3 className="display-type mt-3 text-3xl font-bold leading-[1.08] sm:text-4xl">{currentImpact.mtMoriah.title}</h3>
                  <p className="mt-5 leading-8">{currentImpact.mtMoriah.description}</p>
                  <Link href="/stories/mt-moriah-opening" className="mt-5 inline-flex min-h-11 items-center border-b border-[#173b2a] text-sm font-semibold transition-colors hover:text-[#345040]">Read the Mt. Moriah story</Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="impact-title" className="bg-[#173b2a] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-[88rem]">
            <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <h2 id="impact-title" className="display-type text-4xl font-bold leading-tight sm:text-5xl">Growing together,<br />reaching further.</h2>
              <p className="max-w-2xl text-lg leading-8 text-white/85">{currentImpact.summary}</p>
            </div>
            <dl className="mt-12 grid gap-8 border-t border-white/25 pt-9 md:grid-cols-3 md:gap-12">
              {currentImpact.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="max-w-xs text-sm font-semibold text-white/85">{stat.label}</dt>
                  <dd className="display-type mt-3 text-6xl font-bold leading-none text-[#e8c957] sm:text-7xl">{stat.value}</dd>
                  <p className="mt-4 max-w-sm leading-7 text-white/80">{stat.detail}</p>
                </div>
              ))}
            </dl>
            <p className="mt-9 text-sm leading-6 text-white/75">{currentImpact.sourceNote}</p>
          </div>
        </section>

        <section aria-labelledby="approach-title" className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-[88rem]">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20">
              <CommunityPhoto src="/photos/leader-training.webp" alt="Community Bible Study participants holding certificates after training" caption="Learning and encouragement for the people who lead." sizes="(max-width: 1024px) 100vw, 55vw" className="text-[#526659]" />
              <div>
                <h2 id="approach-title" className="display-type text-4xl font-bold leading-tight sm:text-5xl">How we nurture</h2>
                <p className="mt-5 max-w-xl leading-8 text-[#345040]">Faith, character, mentorship, and service shape our approach. We want children to discover their gifts, care for others, and grow with confidence.</p>
                <div className="mt-7 divide-y divide-[#173b2a]/15">
                  {ministryFocuses.map((focus) => (
                    <article key={focus.title} className="py-4 first:pt-0">
                      <h3 className="text-lg font-bold">{focus.title}</h3>
                      <p className="mt-1 leading-7 text-[#526659]">{focus.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="people-title" className="bg-[#e8c957]">
          <div className="mx-auto grid max-w-[88rem] lg:grid-cols-[1.08fr_.92fr]">
            <div className="relative min-h-[22rem] sm:min-h-[34rem]">
              <Image src="/photos/children-celebration.webp" alt="Children taking part in a lively group activity" fill unoptimized sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover object-center" />
            </div>
            <div className="flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-16 xl:px-24">
              <h2 id="people-title" className="display-type text-4xl font-bold leading-[1.06] sm:text-5xl">Children.<br />Youth.<br />Families.<br />Communities.</h2>
              <p className="mt-6 max-w-md leading-8 text-[#345040]">Children grow within families and communities. Our vision connects their learning with practical skills, care for shared spaces, and support for families facing hardship.</p>
              <Link href="/about" className="mt-7 inline-flex min-h-11 w-fit items-center border-b border-[#173b2a] text-sm font-semibold transition-colors hover:text-[#58724d]">Learn about Seeds of Life</Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="purpose-title" className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:gap-16 lg:px-8">
          <div className="rounded-[.4rem] bg-[#173b2a] px-6 py-10 text-white sm:px-9 sm:py-12 lg:sticky lg:top-28">
            <h2 id="purpose-title" className="display-type text-4xl font-bold leading-tight sm:text-5xl">Why we serve</h2>
            <p className="mt-6 max-w-xl leading-8 text-white/85">
              Our faith in Christ shapes how we care for children and families. We want every child to grow in faith, character, and confidence, with people around them who teach and encourage them.
            </p>
            <blockquote className="display-type mt-10 max-w-md border-t border-white/25 pt-7 text-3xl leading-tight text-[#e8c957]">
              “I am the vine; you are the branches…”
              <cite className="mt-4 block font-sans text-sm not-italic tracking-normal text-white/80">John 15:5</cite>
            </blockquote>
          </div>
          <div>
            <h2 className="display-type text-4xl font-bold leading-tight sm:text-5xl">Where we hope to grow</h2>
            <p className="mt-6 max-w-2xl leading-8 text-[#345040]">
              Alongside today&apos;s classes and gatherings, these areas guide our wider vision. Some are still plans, and we welcome conversations about what could be built together.
            </p>
            <ul className="mt-8 border-t border-[#173b2a]/20">
              {programAreas.map((area) => (
                <li key={area.title} className="border-b border-[#173b2a]/20 py-5">
                  <h3 className="text-lg font-semibold">{area.title}</h3>
                  <p className="mt-2 max-w-2xl leading-7 text-[#526659]">{area.summary}</p>
                </li>
              ))}
            </ul>
            <Link href="/programs" className="mt-7 inline-flex min-h-11 items-center border-b border-[#173b2a] text-sm font-semibold transition-colors hover:text-[#58724d]">
              Explore all areas of work
            </Link>
          </div>
        </section>

        <section aria-labelledby="moments-title" className="bg-[#e1e9d7] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-[88rem]">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-24">
              <h2 id="moments-title" className="display-type max-w-xl text-4xl font-bold leading-[1.06] sm:text-6xl">Life happens<br />when we gather.</h2>
              <div>
                <p className="max-w-md leading-8 text-[#345040]">Shared moments in our community: gatherings, classes, and time spent together in Cebu.</p>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  <Link href="/gallery" className="inline-flex min-h-11 items-center border-b border-[#173b2a] text-sm font-semibold transition-colors hover:text-[#58724d]">View the gallery</Link>
                  <Link href="/stories/mt-moriah-opening" className="inline-flex min-h-11 items-center border-b border-[#173b2a] text-sm font-semibold transition-colors hover:text-[#58724d]">Read the Mt. Moriah story</Link>
                </div>
              </div>
            </div>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[.4rem] sm:mt-14 sm:aspect-[2/1]">
              <Image src="/photos/community-gathering.webp" alt="Children and adults gathered beneath a basketball hoop outdoors in Cebu" fill unoptimized sizes="100vw" className="object-cover object-[center_65%]" />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#345040]">Children, families, and friends together in Cebu.</p>
          </div>
        </section>

        <section aria-labelledby="partners-title" className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[88rem]">
            <h2 id="partners-title" className="text-lg font-semibold">Partners and collaborators</h2>
            <div className="mt-8"><PartnerLogoLoop /></div>
          </div>
        </section>

        <section aria-labelledby="join-title" className="bg-[#e8c957] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 id="join-title" className="display-type max-w-xl text-5xl font-bold leading-[1.06] sm:text-6xl">There&apos;s room<br />for you here.</h2>
            <div className="max-w-xl">
              <p className="text-lg leading-8">Would you like to take part? We welcome people who want to serve, partner, or support this work. Tell us how you would like to help.</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link href="/involved" className="inline-flex min-h-11 items-center bg-[#173b2a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#28533d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2a]">
                  Get involved
                </Link>
                <Link href="/contact" className="inline-flex min-h-11 items-center border-b border-[#173b2a] text-sm font-semibold transition-colors hover:text-[#345040]">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
