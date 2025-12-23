import { Users, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTAButton } from "@/components/cta-button"

export default function GetInvolvedPage() {
  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white min-h-screen">
        <div className="py-16" style={{ background: 'linear-gradient(to bottom right, #356033, #2d4d2b)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#ffde59' }}>Get Involved</h1>
            <p className="text-xl text-white">Join Us in Making a Difference</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 text-center" style={{ background: 'linear-gradient(to right, #356033, #467a63)' }}>
                <Users className="h-16 w-16 mx-auto mb-4" style={{ color: '#ffde59' }} />
                <h2 className="text-3xl font-bold text-white">Volunteer</h2>
              </div>
              <div className="p-8">
                <p className="mb-6 leading-relaxed" style={{ color: '#467a63' }}>
                  Join our team in mentoring children, leading service projects, or helping at Mt. Moriah camps. Your
                  time and talents can transform lives.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#467a63' }}>•</span>
                    <span style={{ color: '#467a63' }}>Camp leadership and volunteering</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#467a63' }}>•</span>
                    <span style={{ color: '#467a63' }}>Youth mentorship programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#467a63' }}>•</span>
                    <span style={{ color: '#467a63' }}>Community service projects</span>
                  </li>
                </ul>
                <CTAButton href="/contact" className="w-full">
                  Learn More
                </CTAButton>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 text-center" style={{ background: 'linear-gradient(to right, #ffde59, #ffd740)' }}>
                <Heart className="h-16 w-16 mx-auto mb-4" style={{ color: '#356033' }} />
                <h2 className="text-3xl font-bold" style={{ color: '#356033' }}>Donate</h2>
              </div>
              <div className="p-8">
                <p className="mb-6 leading-relaxed" style={{ color: '#467a63' }}>
                  Your financial support helps us continue empowering children and building facilities like Mt. Moriah
                  campground.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#467a63' }}>•</span>
                    <span style={{ color: '#467a63' }}>Support camp operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#467a63' }}>•</span>
                    <span style={{ color: '#467a63' }}>Fund youth service projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#467a63' }}>•</span>
                    <span style={{ color: '#467a63' }}>Help build Mt. Moriah facilities</span>
                  </li>
                </ul>
                <CTAButton href="/contact" className="w-full">
                  Contact Us to Give
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 md:p-12 border-2 text-center" style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)', borderColor: '#467a63' }}>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#356033' }}>Partner With Us</h3>
            <p className="text-xl mb-6 leading-relaxed" style={{ color: '#467a63' }}>
              Whether through prayer, volunteering, or financial support, you play a vital role in empowering the next
              generation of purpose-driven leaders.
            </p>
            <CTAButton href="/contact">Start Your Journey</CTAButton>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}