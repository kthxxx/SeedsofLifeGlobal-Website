"use client"

import { useEffect } from "react"

const motionEase = "cubic-bezier(.2, .75, .2, 1)"

/**
 * A small, progressive-enhancement reveal system. Server-rendered content is
 * visible by default; classes are only applied when motion is appropriate.
 */
export function MotionObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("motion-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    document.querySelectorAll<HTMLElement>("main > section, main article > section").forEach((section) => {
      const main = section.closest("main")
      if (main?.firstElementChild === section) return

      const staggerItems = [...section.querySelectorAll<HTMLElement>("article, a.group")]
        .filter((item) => item.closest("section") === section)

      if (staggerItems.length >= 2) {
        staggerItems.forEach((item, index) => {
          item.classList.add("motion-item")
          item.style.setProperty("--motion-delay", `${Math.min(index * 90, 360)}ms`)
          observer.observe(item)
        })
        return
      }

      const target = section.querySelector<HTMLElement>(":scope > div:not(.absolute)")
      if (!target) return
      target.classList.add("motion-reveal")
      target.style.setProperty("--motion-ease", motionEase)
      observer.observe(target)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
