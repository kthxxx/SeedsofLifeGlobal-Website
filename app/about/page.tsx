import { Sprout, Heart, Users, Lightbulb, Target, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { coreValues, mission, tagline } from "@/lib/data"

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white min-h-screen">
        {/* Hero Section */}
        <div 
          className="py-16 relative"
          style={{
            minHeight: '300px',
            backgroundImage: 'url(/about-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div 
            className="absolute inset-0" 
            style={{ background: 'linear-gradient(to bottom right, rgba(53, 96, 51, 0.92), rgba(45, 77, 43, 0.92))' }}
          />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg" style={{ color: '#ffde59' }}>About Us</h1>
            <p className="text-xl text-white italic drop-shadow-md">{tagline}</p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#356033' }}>Our Story</h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#ffde59' }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Story Image */}
            <div className="order-2 md:order-1">
              <div 
                className="rounded-3xl overflow-hidden shadow-2xl h-96 bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(/founders.jpg)',
                  backgroundColor: '#467a63'
                }}
              >              
              </div>
            </div>

            {/* Story Content */}
            <div className="order-1 md:order-2">
              <div className="space-y-4" style={{ color: '#467a63' }}>
                <div className="flex items-start space-x-3">
                  <div className="rounded-full p-2 mt-1" style={{ backgroundColor: '#ffde59' }}>
                    <Lightbulb className="h-5 w-5" style={{ color: '#356033' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>The Beginning</h3>
                    <p className="leading-relaxed">
                      [Insert: How Seeds of Life Global was founded - the spark moment, the initial vision, 
                      and what inspired the founders to start this journey of empowering children.]
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="rounded-full p-2 mt-1" style={{ backgroundColor: '#ffde59' }}>
                    <Target className="h-5 w-5" style={{ color: '#356033' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>The Need We Saw</h3>
                    <p className="leading-relaxed">
                      [Insert: What problem or gap in the community motivated action - the challenges children 
                      faced and why this work was desperately needed.]
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="rounded-full p-2 mt-1" style={{ backgroundColor: '#ffde59' }}>
                    <TrendingUp className="h-5 w-5" style={{ color: '#356033' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>Our Growth</h3>
                    <p className="leading-relaxed">
                      [Insert: How the organization evolved from its humble beginnings to today - 
                      key milestones, expansion of programs, and impact achieved.]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mt. Moriah Section */}
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #356033 0%, #467a63 100%)' }}>
            <div className="p-8 md:p-12 text-white">
              <h3 className="text-3xl font-bold mb-6 text-center">Mt. Moriah: A Dream Taking Root</h3>
              <div className="max-w-3xl mx-auto space-y-4 text-lg leading-relaxed">
                <p>
                  [Insert: The vision behind Mt. Moriah campground - why this location was chosen, 
                  what it represents, and the significance of the name "Mt. Moriah".]
                </p>
                <p>
                  [Insert: What Mt. Moriah will provide for children - the programs, experiences, 
                  and transformative opportunities that will be available at this special place.]
                </p>
                <p className="italic text-center pt-4" style={{ color: '#ffde59' }}>
                  "Just as Abraham's faith was tested on Mt. Moriah, we believe this place will be 
                  where children's faith grows and their purpose is revealed."
                </p>
              </div>
            </div>
          </div>

          {/* Timeline or Milestones (Optional) */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-12" style={{ color: '#356033' }}>Our Journey</h3>
            <div className="space-y-8">
              {/* Milestone 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#356033' }}>
                    20XX
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderColor: '#ffde59' }}>
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>Founded</h4>
                    <p style={{ color: '#467a63' }}>
                      [Insert: First milestone - when and how the organization was officially established]
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#467a63' }}>
                    20XX
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderColor: '#ffde59' }}>
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>First Programs Launched</h4>
                    <p style={{ color: '#467a63' }}>
                      [Insert: When the first programs started and their initial impact]
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#356033' }}>
                    20XX
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderColor: '#ffde59' }}>
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>Mt. Moriah Vision</h4>
                    <p style={{ color: '#467a63' }}>
                      [Insert: When the Mt. Moriah project began and progress to date]
                    </p>
                  </div>
                </div>
              </div>

              {/* Future Milestone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg border-4" style={{ borderColor: '#ffde59', color: '#356033' }}>
                    20XX
                  </div>
                </div>
                <div className="flex-1">
                  <div className="rounded-xl shadow-lg p-6 border-l-4 border-dashed" style={{ borderColor: '#ffde59', backgroundColor: '#f0fdf4' }}>
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#356033' }}>The Future</h4>
                    <p style={{ color: '#467a63' }}>
                      [Insert: Vision for the future - where you see the organization going in the next 5-10 years]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Founders Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#356033' }}>Meet Our Founders</h2>
          <p className="text-center mb-12 text-lg" style={{ color: '#467a63' }}>
            Passionate about empowering the next generation
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Founder 1 Card */}
            <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-80 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundImage: 'url(/team/founder1.jpg)',
                    backgroundColor: '#356033'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(53, 96, 51, 0.1)' }}>
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full mx-auto" style={{ backgroundColor: '#ffde59' }}></div>
                    </div>
                  </div>
                </div>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(53, 96, 51, 0.8), transparent)' }}
                />
              </div>

              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-opacity-90 transition-colors" style={{ color: '#356033' }}>
                    Jennifer Moore
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 transition-all duration-300 group-hover:w-20" style={{ backgroundColor: '#ffde59' }}></div>
                    <p className="text-lg font-semibold" style={{ color: '#ffde59' }}>
                      Co-Founder & Executive Director
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3" style={{ color: '#467a63' }}>
                  <p className="leading-relaxed text-sm">
                    Jennifer co-founded Seeds of Life Global with a vision to empower children in underserved communities 
                    to discover their God-given purpose and become agents of positive change.
                  </p>
                  <p className="leading-relaxed text-sm">
                    With over 15 years of experience in youth development and community outreach, she is passionate 
                    about creating transformative experiences that help children grow in faith, character, and confidence.
                  </p>
                  <p className="leading-relaxed text-sm">
                    Under her leadership, Seeds of Life Global has impacted hundreds of children and is building 
                    the Mt. Moriah campground to expand its reach throughout the Philippines.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder 2 Card */}
            <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-80 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundImage: 'url(/team/founder2.jpg)',
                    backgroundColor: '#467a63'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(70, 122, 99, 0.1)' }}>
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full mx-auto" style={{ backgroundColor: '#ffde59' }}></div>
                    </div>
                  </div>
                </div>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(70, 122, 99, 0.8), transparent)' }}
                />
              </div>

              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-opacity-90 transition-colors" style={{ color: '#356033' }}>
                    Teacher Sally Blanco Sapalo 
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 transition-all duration-300 group-hover:w-20" style={{ backgroundColor: '#ffde59' }}></div>
                    <p className="text-lg font-semibold" style={{ color: '#ffde59' }}>
                      Co-Founder & President
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3" style={{ color: '#467a63' }}>
                  <p className="leading-relaxed text-sm">
                    Teacher Sally co-founded Seeds of Life Global with a vision to empower children in 
                    underserved communities to discover their God-given purpose and become agents of positive change.
                  </p>
                  <p className="leading-relaxed text-sm">
                    With over 15 years of experience in youth development and community outreach, she is 
                    passionate about creating transformative experiences that help children grow in faith, 
                    character, and confidence.
                  </p>
                  <p className="leading-relaxed text-sm">
                    Under her leadership, Seeds of Life Global has impacted hundreds of children and is 
                    building the Mt. Moriah campground to expand its reach throughout the Philippines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4" style={{ color: '#356033' }}>Our Team</h3>
              <p className="text-lg mb-12" style={{ color: '#467a63' }}>
                Dedicated volunteers and staff committed to our mission
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="h-64 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: 'url(/team/member1.jpg)',
                    backgroundColor: '#467a63'
                  }}
                >
                  <div className="h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(70, 122, 99, 0.1)' }}>
                    <div className="w-24 h-24 rounded-full" style={{ backgroundColor: '#ffde59' }}></div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold mb-1" style={{ color: '#356033' }}>Team Member</h4>
                  <p className="text-sm mb-3" style={{ color: '#ffde59' }}>Program Director</p>
                  <p className="text-sm" style={{ color: '#467a63' }}>
                    Leading our youth mentorship and community service programs
                  </p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="h-64 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: 'url(/team/member2.jpg)',
                    backgroundColor: '#467a63'
                  }}
                >
                  <div className="h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(70, 122, 99, 0.1)' }}>
                    <div className="w-24 h-24 rounded-full" style={{ backgroundColor: '#ffde59' }}></div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold mb-1" style={{ color: '#356033' }}>Team Member</h4>
                  <p className="text-sm mb-3" style={{ color: '#ffde59' }}>Camp Coordinator</p>
                  <p className="text-sm" style={{ color: '#467a63' }}>
                    Overseeing Mt. Moriah campground operations and activities
                  </p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="h-64 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: 'url(/team/member3.jpg)',
                    backgroundColor: '#467a63'
                  }}
                >
                  <div className="h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(70, 122, 99, 0.1)' }}>
                    <div className="w-24 h-24 rounded-full" style={{ backgroundColor: '#ffde59' }}></div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold mb-1" style={{ color: '#356033' }}>Team Member</h4>
                  <p className="text-sm mb-3" style={{ color: '#ffde59' }}>Volunteer Coordinator</p>
                  <p className="text-sm" style={{ color: '#467a63' }}>
                    Recruiting and training volunteers to serve our mission
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}