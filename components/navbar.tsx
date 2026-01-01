"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/involved", label: "Get Involved" },
    { href: "/contact", label: "Contact" }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            {/* Try to load the logo, if it fails, show fallback */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ backgroundColor: '#356033' }}>
              <Image 
                src="/logo.png" 
                alt="Seeds of Life Global Logo" 
                fill
                className="object-contain"
                onError={(e) => {
                  // If logo fails to load, hide the image and show icon fallback
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="text-2xl font-bold" style={{ color: '#356033' }}>
              Seeds of Life <span style={{ color: '#467a63' }}>Global</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: '#356033' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-2 rounded-full font-bold transition-all hover:opacity-90"
              style={{ backgroundColor: '#ffde59', color: '#356033' }}
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden transition-colors hover:opacity-80"
            style={{ color: '#356033' }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-green-100">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-primary hover:text-tertiary font-semibold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block bg-secondary text-primary px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              DOnate Now!
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}