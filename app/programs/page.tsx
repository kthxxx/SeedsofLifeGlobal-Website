import { Users, Heart, BookOpen, Home } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTAButton } from "@/components/cta-button"

export default function ProgramsPage() {
  const programs = [
    {
      icon: Users,
      title: "After-School Mentorship",
      description: "Weekly sessions focused on character development, biblical principles, and practical life skills.",
      features: [
        "One-on-one and group mentoring",
        "Character-building activities",
        "Homework help and tutoring",
        "Biblical teaching and discussion"
      ]
    },
    {
      icon: Heart,
      title: "Community Service Projects",
      description: "Hands-on opportunities for children to serve their neighbors and discover the joy of giving.",
      features: [
        "Local community outreach",
        "Environmental initiatives",
        "Helping elderly and disabled",
        "Food distribution programs"
      ]
    },
    {
      icon: BookOpen,
      title: "Leadership Training",
      description: "Age-appropriate workshops that build confidence, communication skills, and servant leadership.",
      features: [
        "Public speaking training",
        "Team building exercises",
        "Conflict resolution skills",
        "Project management basics"
      ]
    },
    {
      icon: Home,
      title: "Mt. Moriah Camp",
      description: "Our dedicated campground facility where children experience immersive faith-building retreats.",
      features: [
        "Weekend and summer camps",
        "Outdoor adventure activities",
        "Spiritual formation retreats",
        "Team building experiences"
      ]
    }
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white min-h-screen"
        style={{ backgroundColor: 'white' }}>
        <div 
          className="py-16 relative"
          style={{
            minHeight: '300px',
            backgroundImage: 'url(/programs-background.jpg)',
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
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg" style={{ color: '#ffde59' }}>Our Programs</h1>
            <p className="text-xl text-white drop-shadow-md">Empowering Children Through Purpose-Driven Activities</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2" style={{ borderColor: '#467a63' }}>
                <div className="p-8 text-center" style={{ background: 'linear-gradient(to right, #356033, #467a63)' }}>
                  <program.icon className="h-16 w-16 mx-auto mb-4" style={{ color: '#ffde59' }} />
                  <h2 className="text-3xl font-bold text-white">{program.title}</h2>
                </div>
                <div className="p-8">
                  <p className="mb-6 leading-relaxed text-lg" style={{ color: '#467a63' }}>
                    {program.description}
                  </p>
                  <h3 className="font-bold mb-3" style={{ color: '#356033' }}>Program Highlights:</h3>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span style={{ color: '#ffde59' }} className="mr-2">✓</span>
                        <span style={{ color: '#467a63' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-8 md:p-12 text-center" style={{ background: 'linear-gradient(to bottom right, #ffde59, #ffd740)' }}>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#356033' }}>Ready to Get Involved?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#356033' }}>
              Join us in empowering children to discover their purpose and make a lasting impact in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/involved" variant="secondary">
                Volunteer With Us
              </CTAButton>
              <CTAButton href="/contact" variant="secondary">
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
} 