import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { contactInfo, tagline } from "@/lib/data"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-secondary rounded-full p-2">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span className="font-bold text-lg">Seeds of Life Global</span>
            </div>
            <p className="text-green-100 text-sm leading-relaxed italic">
              {tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-secondary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-100 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-green-100 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-green-100 hover:text-secondary transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/involved" className="text-green-100 hover:text-secondary transition-colors">
                  Get Involved
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-100 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-secondary mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <a href={`mailto:${contactInfo.email}`} className="text-green-100 hover:text-secondary transition-colors block">
                    {contactInfo.email}
                  </a>
                  <a href={`mailto:${contactInfo.altEmail}`} className="text-green-100 hover:text-secondary transition-colors block">
                    {contactInfo.altEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-green-100 hover:text-secondary transition-colors text-sm">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-green-100 text-sm">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-secondary mb-4">Connect With Us</h3>
            <p className="text-green-100 text-sm mb-3">
              Stay updated with our latest news and events
            </p>
            <Link
              href="/contact"
              className="inline-block bg-secondary text-primary px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors text-sm"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tertiary mt-8 pt-8 text-center">
          <p className="text-green-100 text-sm">
            © {currentYear} Seeds of Life Global. All rights reserved.
          </p>
          <p className="text-green-100 text-sm italic mt-2">
            "I am the vine; you are the branches..." - John 15:5
          </p>
        </div>
      </div>
    </footer>
  )
}