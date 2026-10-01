import type { Metadata } from "next"
import { MotionObserver } from "@/components/motion-observer"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seedsoflifeglobal.org"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Seeds of Life Global Inc.",
    template: "%s | Seeds of Life Global Inc.",
  },
  description: "Seeds of Life Global Inc. is a non-stock, non-profit organization in Sibonga, Cebu, organized for education, community development, and humanitarian support.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Seeds of Life Global Inc.",
    title: "Seeds of Life Global Inc.",
    description: "Seeds of Life Global Inc. is a non-stock, non-profit organization in Sibonga, Cebu, organized for education, community development, and humanitarian support.",
    url: "/",
    images: [{ url: "/hero-background.jpg", width: 1680, height: 1260, alt: "Seeds of Life Global community gathering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seeds of Life Global Inc.",
    description: "Seeds of Life Global Inc. is a non-stock, non-profit organization in Sibonga, Cebu, organized for education, community development, and humanitarian support.",
    images: ["/hero-background.jpg"],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <MotionObserver />
        {children}
      </body>
    </html>
  )
}
