import { Sprout, Heart, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { coreValues, mission, tagline } from "@/lib/data"

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white min-h-screen">
        <div 
          className="py-16 relative"
          style={{
            minHeight: '300px',
            backgroundImage: 'url(/about-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0" 
            style={{ background: 'linear-gradient(to bottom right, rgba(53, 96, 51, 0.92), rgba(45, 77, 43, 0.92))' }}
          />
          
          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg" style={{ color: '#ffde59' }}>Mission and Vision</h1>
            <p className="text-xl text-white italic drop-shadow-md">{tagline}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
            <div className="p-8" style={{ background: 'linear-gradient(to right, #356033, #467a63)' }}>
              <h2 className="text-3xl font-bold text-white mb-2">Our Mission</h2>
              <div className="w-20 h-1" style={{ backgroundColor: '#ffde59' }}></div>
            </div>
            <div className="p-8 md:p-12">
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#467a63' }}>
                {mission}
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#467a63' }}>
                Rooted in the truth of John 15:5 — "I am the vine; you are the branches..." — we believe that lasting
                growth and impact come from abiding in Christ.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
            <div className="p-8" style={{ background: 'linear-gradient(to right, #ffde59, #ffd740)' }}>
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#356033' }}>Our Approach</h2>
              <div className="w-20 h-1" style={{ backgroundColor: '#356033' }}></div>
            </div>
            <div className="p-8 md:p-12">
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#467a63' }}>
                Through mentorship, service projects, and community engagement, we cultivate environments where children
                don't just receive knowledge—they discover their ability to serve, lead, and bring change.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#467a63' }}>
                Regardless of how rich or poor they are, we help young hearts recognize that they are called to be
                light-bearers and world-changers.
              </p>
            </div>
          </div>

          <div className="rounded-3xl p-8 md:p-12 border-2" style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)', borderColor: '#467a63' }}>
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#356033' }}>Core Values</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {coreValues.map((value, index) => {
                const IconComponent = value.icon === "heart" ? Heart : value.icon === "users" ? Users : Sprout
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="rounded-full p-2 mt-1 flex-shrink-0" style={{ backgroundColor: '#356033' }}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1" style={{ color: '#356033' }}>{value.title}</h4>
                      <p style={{ color: '#467a63' }}>{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}