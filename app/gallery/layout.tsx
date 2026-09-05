import { pageMetadata } from "@/lib/page-metadata"

export const metadata = pageMetadata(
  "Gallery",
  "View photos shared by Seeds of Life Global Inc., a nonprofit organization in Sibonga, Cebu.",
  "/gallery",
)

export default function GalleryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
