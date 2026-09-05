import type { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seedsoflifeglobal.org"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/leadership/jennifer-moore", "/leadership/teacher-sally-blanco-sapalo", "/programs", "/gallery", "/stories/mt-moriah-opening", "/involved", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }))
}
