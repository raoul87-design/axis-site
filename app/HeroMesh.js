"use client"

import { useEffect, useRef } from "react"

// Four brand colors, fixed order — same as --grad in globals.css.
const COLORS = ["#22c55e", "#4f8df7", "#e8b240", "#b79cff"]
const BG = "#111311"

// Base positions (fraction of canvas), spread so the four colors cover the frame.
const BASE = [
  { x: 0.22, y: 0.28, r: 0.52, freq: 0.021, phase: 0 },
  { x: 0.78, y: 0.22, r: 0.48, freq: 0.017, phase: 2.1 },
  { x: 0.72, y: 0.78, r: 0.5, freq: 0.014, phase: 4.4 },
  { x: 0.24, y: 0.76, r: 0.46, freq: 0.019, phase: 1.3 },
]

export default function HeroMesh() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isTouch = window.matchMedia("(pointer: coarse)").matches

    let width = 0
    let height = 0
    let dpr = 1

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    // Mouse target + heavily damped, lagging follower — "stroop", not a spotlight.
    const mouseTarget = { x: 0.5, y: 0.5 }
    const mouseSmooth = { x: 0.5, y: 0.5 }
    const DAMPING = 0.015
    const INFLUENCE = 0.07

    function onMouseMove(e) {
      const rect = canvas.parentElement.getBoundingClientRect()
      mouseTarget.x = (e.clientX - rect.left) / rect.width
      mouseTarget.y = (e.clientY - rect.top) / rect.height
    }

    if (!isTouch && !reduceMotion) {
      window.addEventListener("mousemove", onMouseMove)
    }

    function draw(t) {
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = "screen"

      BASE.forEach((b, i) => {
        const drift = reduceMotion ? 0 : t * b.freq * 0.001 + b.phase
        const dx = reduceMotion ? 0 : Math.sin(drift) * 0.09
        const dy = reduceMotion ? 0 : Math.cos(drift * 0.83) * 0.09

        const leanX = (mouseSmooth.x - 0.5) * INFLUENCE
        const leanY = (mouseSmooth.y - 0.5) * INFLUENCE

        const cx = (b.x + dx + leanX) * width
        const cy = (b.y + dy + leanY) * height
        const r = b.r * Math.max(width, height)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0, COLORS[i] + "59") // ~35% alpha
        grad.addColorStop(1, COLORS[i] + "00")
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)
      })

      ctx.globalCompositeOperation = "source-over"
    }

    if (reduceMotion) {
      draw(0)
      return () => window.removeEventListener("resize", resize)
    }

    let raf
    function loop(t) {
      mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * DAMPING
      mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * DAMPING
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-mesh-canvas" aria-hidden="true" />
}
