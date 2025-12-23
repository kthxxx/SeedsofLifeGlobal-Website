import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTAButton } from "@/components/cta-button"
import { Sprout, Users, Heart, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section with Background Image */}
      <div 
        className="pt-20 relative"
        style={{
          minHeight: '600px',
          backgroundImage: 'url(/hero-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better text readability */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom right, rgba(53, 96, 51, 0.9), rgba(45, 77, 43, 0.85), rgba(30, 58, 31, 0.9))' 
          }}
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg" style={{ color: '#ffde59' }}>
              Seeds of Life Global
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-white font-light italic drop-shadow-md">
              Where purpose takes root and lives bear fruit
            </p>
            <p className="text-xl md:text-2xl mb-8 text-green-100 italic drop-shadow-md">
              "I am the vine; you are the branches..." - John 15:5
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <CTAButton href="/about" variant="primary">
                Learn About Our Mission
              </CTAButton>
              <CTAButton href="/involved" variant="secondary">
                Get Involved
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Highlight */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#356033' }}>Our Mission</h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#467a63' }}>
            Our Mission is to raise a generation that lives out its purpose, serves with love, and bears lasting fruit — transforming their communities and inspiring others to do the same.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16" style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#356033' }}>What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sprout,
                title: "Faith Formation",
                description: "Building a strong spiritual foundation rooted in biblical truth"
              },
              {
                icon: Users,
                title: "Community Service",
                description: "Hands-on projects that teach children to serve and lead"
              },
              {
                icon: Heart,
                title: "Character Development",
                description: "Nurturing values of compassion, integrity, and resilience"
              },
              {
                icon: BookOpen,
                title: "Mentorship",
                description: "Guiding young hearts to discover their unique calling"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="rounded-full p-3 w-fit mx-auto mb-4" style={{ backgroundColor: '#356033' }}>
                  <feature.icon className="h-8 w-8" style={{ color: '#ffde59' }} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center" style={{ color: '#356033' }}>{feature.title}</h3>
                <p className="text-center" style={{ color: '#467a63' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16" style={{ background: 'linear-gradient(to right, #ffde59, #ffd740)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#356033' }}>Join Us in Making a Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#356033' }}>
            Whether through volunteering, donations, or partnership, you can help empower 
            the next generation of purpose-driven leaders.
          </p>
          <CTAButton href="/involved" variant="secondary">
            Start Your Journey
          </CTAButton>
        </div>
      </div>

      <Footer />
    </>
  )
}