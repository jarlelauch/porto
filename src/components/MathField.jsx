import { useEffect, useRef } from 'react'

const GLYPHS = ['Σ', 'π', 'φ', '√', '∞', '∂', 'λ', 'θ', 'Δ', 'e', '∫', 'ω', 'α', 'Ω']
const COLORS = ['#e8b95c', '#c0487e', '#9a8fc0']

export default function MathField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const stars = []
    const glyphs = []

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const makeGlyphs = () => {
      glyphs.length = 0
      for (let i = 0; i < 14; i++) {
        glyphs.push({
          g: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          x: Math.random() * w,
          y: Math.random() * h,
          size: 16 + Math.random() * 34,
          speed: 0.08 + Math.random() * 0.22,
          sway: 0.4 + Math.random() * 1.1,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.035 + Math.random() * 0.05,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    const makeStars = () => {
      stars.length = 0
      for (let i = 0; i < 90; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + Math.random() * 1,
          a: 0.05 + Math.random() * 0.12,
        })
      }
    }

    const step = (t) => {
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(241, 217, 160, ${s.a})`
        ctx.fill()
      }

      for (const g of glyphs) {
        const y = reduce ? g.y : (g.y + (t * 0.001) * g.speed * 10) % h
        const x = g.x + Math.sin(t * 0.0004 + g.phase) * g.sway * 20
        ctx.fillStyle = g.color
        ctx.globalAlpha = g.alpha
        ctx.font = `${g.size}px Georgia, serif`
        ctx.fillText(g.g, x, y)
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(step)
    }

    resize()
    makeStars()
    makeGlyphs()
    if (reduce) {
      const t2 = performance.now()
      step(t2)
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(step)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="math-field" ref={ref} aria-hidden="true" />
}