"use client"

import { useEffect } from "react"

// Nav wordmark stays out of the way during the hero spectacle, then fades in
// once the hero has scrolled out of view — and fades out again on the way back up.
export default function NavWordmarkVisibility() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const wordmark = document.querySelector("[data-nav-wordmark]")
    const hero = document.getElementById("hero")
    if (!wordmark || !hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        wordmark.classList.toggle("visible", !entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return null
}
