import { useEffect, useRef } from 'react'

const GRID = 40

export default function AxisField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)

      // faint graph paper
      ctx.strokeStyle = 'rgba(201, 173, 120, 0.05)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0.5; x <= w; x += GRID) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }
      for (let y = 0.5; y <= h; y += GRID) {
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()

      // axes through the middle, like a manuscript margin
      ctx.strokeStyle = 'rgba(201, 173, 120, 0.14)'
      ctx.beginPath()
      ctx.moveTo(0, h / 2)
      ctx.lineTo(w, h / 2)
      ctx.moveTo(w / 2, 0)
      ctx.lineTo(w / 2, h)
      ctx.stroke()

      // orbit ring near the "origin"
      ctx.strokeStyle = 'rgba(198, 94, 46, 0.10)'
      ctx.beginPath()
      ctx.arc(w / 2, h / 2, 120, 0, Math.PI * 2)
      ctx.stroke()

      // a quiet wave: y = sin(x + phase)
      const cx0 = w / 2
      const cy0 = h / 2
      const amp = 62
      const phase = reduce ? 0 : t * 0.0006
      ctx.strokeStyle = 'rgba(233, 223, 201, 0.12)'
      ctx.lineWidth = 1.4
      ctx.beginPath()
      for (let px = 0; px <= w; px += 3) {
        const u = (px - cx0) / 220
        const y = cy0 - Math.sin(u + phase) * amp * Math.exp(-Math.abs(u) * 0.28)
        if (px === 0) ctx.moveTo(px, y)
        else ctx.lineTo(px, y)
      }
      ctx.stroke()

      // drawing pins on the curve
      ctx.fillStyle = 'rgba(198, 94, 46, 0.5)'
      for (let k = -2; k <= 2; k++) {
        const px = cx0 + k * 110
        const u = k * 0.5
        const y = cy0 - Math.sin(u + phase) * amp * Math.exp(-Math.abs(u) * 0.28)
        ctx.beginPath()
        ctx.arc(px, y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = (t) => {
      draw(t)
      raf = requestAnimationFrame(step)
    }

    resize()
    draw(0)
    if (!reduce) raf = requestAnimationFrame(step)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="axis-field" ref={ref} aria-hidden="true" />
}