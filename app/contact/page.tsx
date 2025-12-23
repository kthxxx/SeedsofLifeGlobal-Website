"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { contactInfo } from "@/lib/data"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for reaching out! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white min-h-screen">
        <div className="py-16" style={{ background: 'linear-gradient(to bottom right, #356033, #2d4d2b)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#ffde59' }}>Contact Us</h1>
            <p className="text-xl text-white">We'd Love to Hear From You</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Location Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="rounded-full p-4 w-fit mx-auto mb-4" style={{ backgroundColor: '#356033' }}>
                <MapPin className="h-8 w-8" style={{ color: '#ffde59' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>Location</h3>
              <p style={{ color: '#467a63' }}>Mt. Moriah Campground</p>
              <p className="text-sm mt-2" style={{ color: '#467a63' }}>Contact for address details</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="rounded-full p-4 w-fit mx-auto mb-4" style={{ backgroundColor: '#356033' }}>
                <Phone className="h-8 w-8" style={{ color: '#ffde59' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>Phone</h3>
              <p style={{ color: '#467a63' }}>Contact us for phone number</p>
              <p className="text-sm mt-2" style={{ color: '#467a63' }}>Available during business hours</p>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="rounded-full p-4 w-fit mx-auto mb-4" style={{ backgroundColor: '#356033' }}>
                <Mail className="h-8 w-8" style={{ color: '#ffde59' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>Email</h3>
              <p style={{ color: '#467a63' }}>Contact us for email address</p>
              <p className="text-sm mt-2" style={{ color: '#467a63' }}>We respond within 24 hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2" style={{ borderColor: '#467a63' }}>
            <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: '#356033' }}>Send us a Message</h2>
            <p className="text-center mb-8" style={{ color: '#467a63' }}>Have questions? We're here to help!</p>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2" style={{ color: '#356033' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ borderColor: '#467a63', color: '#356033' }}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold mb-2" style={{ color: '#356033' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ borderColor: '#467a63', color: '#356033' }}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-semibold mb-2" style={{ color: '#356033' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ borderColor: '#467a63', color: '#356033' }}
                  placeholder="0920 403 2782"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-semibold mb-2" style={{ color: '#356033' }}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{ borderColor: '#467a63', color: '#356033' }}
                >
                  <option value="">Select a subject</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                  <option value="donate">Donation Information</option>
                  <option value="programs">Program Information</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-semibold mb-2" style={{ color: '#356033' }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                  style={{ borderColor: '#467a63', color: '#356033' }}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center space-x-2"
                style={{ backgroundColor: '#ffde59', color: '#356033' }}
              >
                <span>Send Message</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}