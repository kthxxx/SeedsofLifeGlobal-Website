import type React from "react"
import Link from "next/link"

interface CTAButtonProps {
  href: string
  variant?: "primary" | "secondary"
  children: React.ReactNode
  className?: string
}

export function CTAButton({ href, variant = "primary", children, className = "" }: CTAButtonProps) {
  const baseStyles = "px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-block"
  
  const variantStyles = variant === "primary"
    ? { backgroundColor: '#ffde59', color: '#356033' }
    : { backgroundColor: 'white', color: '#356033' }

  return (
    <Link 
      href={href} 
      className={`${baseStyles} ${className}`}
      style={variantStyles}
    >
      {children}
    </Link>
  )
}