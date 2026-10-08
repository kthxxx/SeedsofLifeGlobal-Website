"use client"

import Image from "next/image"
import LogoLoop from "@/components/logo-loop"
import { partners } from "@/lib/partners"

const logos = partners.map((partner) => ({
  node: <span className="partner-logo-loop__image"><Image src={partner.logo} alt="" fill unoptimized sizes="180px" className="object-contain p-3" /></span>,
  title: partner.name,
  ariaLabel: partner.name,
  href: partner.href,
}))

export function PartnerLogoLoop() {
  return <LogoLoop logos={logos} speed={34} logoHeight={96} gap={48} hoverSpeed={0} fadeOut fadeOutColor="#ffffff" ariaLabel="Seeds of Life Global partners" className="partner-logo-loop" />
}
