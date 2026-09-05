import type { ReactNode } from "react"
import Link from "next/link"

interface CTAButtonProps { href: string; variant?: "primary" | "secondary"; children: ReactNode; className?: string }

export function CTAButton({ href, variant = "primary", children, className = "" }: CTAButtonProps) {
  const colors = variant === "primary"
    ? "bg-[#e8c957] text-[#173b2a] hover:bg-[#f2d96f]"
    : "border border-current bg-transparent text-current hover:bg-white/10"
  return <Link href={href} className={`cta-button inline-flex min-h-11 items-center justify-center px-5 py-3 text-xs font-bold uppercase tracking-[.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8c957] ${colors} ${className}`}>{children}</Link>
}
