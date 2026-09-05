"use client"

import { useMemo } from "react"
import LogoLoop from "@/components/logo-loop"

export function PartnerLogoLoop({ partners }: { partners: string[] }) {
  const logos = useMemo(() => partners.map((partner) => ({
    node: <span className="partner-logo-loop__wordmark">{partner}</span>,
    title: partner,
    ariaLabel: partner,
  })), [partners])

  return <LogoLoop logos={logos} speed={34} logoHeight={18} gap={16} pauseOnHover fadeOut fadeOutColor="#dce5cf" scaleOnHover ariaLabel="Seeds of Life Global partners" />
}
