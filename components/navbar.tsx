"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false) }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [])

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 18)
    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })
    return () => window.removeEventListener("scroll", updateScrollState)
  }, [])

  const linkClass = (href: string) => `inline-flex min-h-11 items-center px-2 text-xs font-bold uppercase tracking-[.11em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2a] ${pathname === href ? "text-[#173b2a]" : "text-[#536759] hover:text-[#173b2a]"}`

  return <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur transition-[background-color,box-shadow,border-color] duration-500 ${isScrolled ? "border-[#173b2a]/15 bg-[#f7f3e9]/98 shadow-[0_5px_22px_rgba(23,59,42,.08)]" : "border-transparent bg-[#f7f3e9]/82"}`}>
    <nav aria-label="Primary navigation" className="mx-auto flex h-[4.75rem] max-w-[88rem] items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex min-w-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b2a]">
        <Image src="/logo.png" alt="Seeds of Life Global Inc." width={44} height={44} className="h-10 w-10 shrink-0 object-contain mix-blend-multiply" priority />
        <span className="truncate text-sm font-bold tracking-[-.02em] text-[#173b2a] sm:text-base">Seeds of Life Global<span className="hidden xl:inline"> Inc.</span></span>
      </Link>
      <div className="hidden items-center gap-3 lg:flex">
        {navLinks.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
        <Link href="/involved" className={`ml-2 inline-flex min-h-11 items-center bg-[#173b2a] px-4 text-xs font-bold uppercase tracking-[.13em] text-white transition-colors hover:bg-[#28533d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2a] ${pathname === "/involved" ? "bg-[#28533d]" : ""}`} aria-current={pathname === "/involved" ? "page" : undefined}>Get involved</Link>
      </div>
      <button type="button" className="flex min-h-11 min-w-11 items-center justify-center text-[#173b2a] lg:hidden" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}>
        {isOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
      </button>
    </nav>
    {isOpen && <div id="mobile-navigation" className="border-t border-[#173b2a]/10 bg-[#f7f3e9] px-4 py-4 lg:hidden"><div className="mx-auto grid max-w-[88rem] gap-1">{navLinks.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)} onClick={() => setIsOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}<Link href="/involved" className="mt-3 inline-flex min-h-11 items-center justify-center bg-[#173b2a] px-4 text-xs font-bold uppercase tracking-[.13em] text-white" onClick={() => setIsOpen(false)} aria-current={pathname === "/involved" ? "page" : undefined}>Get involved</Link></div></div>}
  </header>
}
