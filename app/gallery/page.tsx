"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, X } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

const galleryImages = [
  { src: "/Gallery/image1.jpg", alt: "Seeds of Life Global community gathering outdoors in Cebu", caption: "Community gathering" },
  { src: "/Gallery/image2.jpg", alt: "Children and adults together during an outdoor learning session", caption: "Learning together" },
  { src: "/Gallery/image3.jpg", alt: "Seeds of Life Global community members gathered with children outdoors in Cebu", caption: "Community celebration" },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const activeTriggerRef = useRef<HTMLButtonElement>(null)
  const closeDialog = useCallback(() => {
    if (selectedImage === null || isClosing) return
    setIsClosing(true)
    window.setTimeout(() => {
      setSelectedImage(null)
      setIsClosing(false)
      requestAnimationFrame(() => activeTriggerRef.current?.focus())
    }, 180)
  }, [isClosing, selectedImage])

  useEffect(() => {
    if (selectedImage === null) return
    closeButtonRef.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return closeDialog()
      if (event.key !== "Tab") return
      const items = dialogRef.current?.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])")
      if (!items?.length) return
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", onKeyDown) }
  }, [selectedImage, closeDialog])

  return <><Navbar /><main id="main-content" className="overflow-hidden bg-[#f7f3e9] pt-[4.75rem]"><section className="bg-[#173b2a] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8"><div className="mx-auto max-w-[88rem]"><p className="eyebrow text-[#e8c957]">Gallery</p><h1 className="display-type mt-6 max-w-4xl text-5xl font-bold leading-[.92] sm:text-7xl">Moments of<br />gathering and growth.</h1><p className="mt-8 max-w-xl text-lg leading-8 text-white/75">A small collection of photographs shared by Seeds of Life Global. Select an image to view it larger.</p></div></section><section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28"><div className="mb-10 flex items-end justify-between gap-6 border-b border-[#173b2a]/15 pb-5"><p className="eyebrow text-[#a75434]">Shared photographs</p><p className="hidden text-sm text-[#526659] sm:block">Select a photograph to enlarge</p></div><div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[18rem_18rem] xl:grid-rows-[22rem_22rem]">{galleryImages.map((image, index) => <figure key={image.src} className={`group relative overflow-hidden bg-[#dce5cf] ${index === 0 ? "min-h-[28rem] sm:min-h-[36rem] lg:col-span-7 lg:row-span-2 lg:min-h-0" : "min-h-[22rem] lg:col-span-5 lg:min-h-0"}`}><button type="button" className="absolute inset-0 z-10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e8c957]" onClick={(event) => { activeTriggerRef.current = event.currentTarget; setSelectedImage(index) }} aria-label={`Open image: ${image.alt}`}><span className="sr-only">Open image</span></button><Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"} className="object-cover transition duration-700 group-hover:scale-[1.025]" /><figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#122b20]/85 to-transparent px-5 pb-5 pt-12 text-xs font-bold uppercase tracking-[.15em] text-white"><span>{image.caption}</span><ArrowUpRight aria-hidden="true" className="h-4 w-4" /></figcaption></figure>)}</div></section></main><Footer />
    {selectedImage !== null && <div className={`gallery-lightbox fixed inset-0 z-[60] flex items-center justify-center bg-[#10251d]/95 p-3 backdrop-blur-sm sm:p-6 ${isClosing ? "gallery-lightbox--closing" : ""}`} role="presentation" onMouseDown={closeDialog}><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="gallery-dialog-title" className="relative flex h-full w-full max-w-6xl items-center justify-center" onMouseDown={(event) => event.stopPropagation()}><button ref={closeButtonRef} type="button" className="absolute right-0 top-0 z-10 flex min-h-11 min-w-11 items-center justify-center bg-[#f7f3e9] text-[#173b2a]" onClick={closeDialog} aria-label="Close enlarged image"><X aria-hidden="true" className="h-6 w-6" /></button><figure className="relative h-[min(76vh,760px)] w-full"><Image src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].alt} fill sizes="100vw" className="object-contain" preload /><figcaption id="gallery-dialog-title" className="absolute inset-x-0 bottom-0 bg-[#10251d]/80 px-4 py-3 text-center text-sm text-white">{galleryImages[selectedImage].caption}</figcaption></figure></section></div>}
  </>
}
