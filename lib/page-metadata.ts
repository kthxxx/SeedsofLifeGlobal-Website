import type { Metadata } from "next"

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: { title, description, url: pathname },
    twitter: { title, description },
  }
}
