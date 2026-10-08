import Image from "next/image"

export function CommunityPhoto({ src, alt, caption, className = "", imagePosition = "object-center", sizes = "(max-width: 1024px) 100vw, 50vw" }: { src: string; alt: string; caption: string; className?: string; imagePosition?: string; sizes?: string }) {
  return <figure className={className}><div className="relative aspect-[4/3] overflow-hidden rounded-[.4rem] bg-[#dce5cf]"><Image src={src} alt={alt} fill unoptimized sizes={sizes} className={`object-cover ${imagePosition}`} /></div><figcaption className="mt-3 text-sm leading-6 text-[#345040]">{caption}</figcaption></figure>
}
