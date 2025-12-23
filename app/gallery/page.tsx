"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { X } from "lucide-react"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // You'll replace these with your actual image paths
  const galleryImages = [
    { src: "/gallery/image1.jpg", alt: "Children at Mt. Moriah Camp", category: "Camp" },
    { src: "/gallery/image2.jpg", alt: "Community Service Project", category: "Service" },
    { src: "/gallery/image3.jpg", alt: "Leadership Training Session", category: "Training" },
    { src: "/gallery/image4.jpg", alt: "Mentorship Program", category: "Mentorship" },
    { src: "/gallery/image5.jpg", alt: "Mt. Moriah Facilities", category: "Camp" },
    { src: "/gallery/image6.jpg", alt: "Children Learning", category: "Education" },
    // Add more images as needed
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white min-h-screen">
        <div className="py-16" style={{ background: 'linear-gradient(to bottom right, #356033, #2d4d2b)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4 text-secondary">Photo Gallery</h1>
            <p className="text-xl text-yellow-100">Moments of Purpose, Service, and Growth</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold">{image.alt}</p>
                    <p className="text-secondary text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-secondary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-white text-lg font-semibold">{galleryImages[selectedImage].alt}</p>
            <p className="text-secondary">{galleryImages[selectedImage].category}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}