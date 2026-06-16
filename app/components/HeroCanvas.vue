<script setup lang="ts">
// Lightweight constellation field behind the hero. Particles drift slowly and
// link to nearby neighbours; the cursor adds a brighter "gravity" node that
// pulls and lights up the network around it. Pure canvas, no deps. Disabled
// under prefers-reduced-motion (renders nothing — the static grid stays).
const canvas = ref<HTMLCanvasElement>()
let raf = 0
let cleanup: (() => void) | null = null

interface P { x: number; y: number; vx: number; vy: number }

onMounted(() => {
  const el = canvas.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const ctx = el.getContext('2d')!
  const parent = el.parentElement as HTMLElement
  let w = 0
  let h = 0
  let dpr = Math.min(window.devicePixelRatio || 1, 2)
  const mouse = { x: -9999, y: -9999, active: false }
  let points: P[] = []

  const resize = () => {
    const r = parent.getBoundingClientRect()
    w = r.width
    h = r.height
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    el.width = w * dpr
    el.height = h * dpr
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    // density scales with area, capped so big screens stay cheap
    const count = Math.min(90, Math.round((w * h) / 16000))
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }))
  }

  const onMove = (e: MouseEvent) => {
    const r = parent.getBoundingClientRect()
    mouse.x = e.clientX - r.left
    mouse.y = e.clientY - r.top
    mouse.active = true
  }
  const onLeave = () => {
    mouse.active = false
    mouse.x = mouse.y = -9999
  }

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    const LINK = 130
    for (const p of points) {
      // cursor gravity
      if (mouse.active) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d2 = dx * dx + dy * dy
        if (d2 < 200 * 200) {
          const f = 0.00018
          p.vx += dx * f
          p.vy += dy * f
        }
      }
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.99
      p.vy *= 0.99
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
      p.x = Math.max(0, Math.min(w, p.x))
      p.y = Math.max(0, Math.min(h, p.y))

      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(245, 166, 35, 0.55)'
      ctx.fill()
    }

    for (let i = 0; i < points.length; i++) {
      const a = points[i]!
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j]!
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.hypot(dx, dy)
        if (dist < LINK) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(139, 148, 158, ${0.12 * (1 - dist / LINK)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      // brighter links to the cursor node
      if (mouse.active) {
        const dist = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dist < 200) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(245, 166, 35, ${0.35 * (1 - dist / 200)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }
    raf = requestAnimationFrame(draw)
  }

  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(parent)
  window.addEventListener('mousemove', onMove)
  parent.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(draw)

  cleanup = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    window.removeEventListener('mousemove', onMove)
    parent.removeEventListener('mouseleave', onLeave)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <canvas ref="canvas" class="hero-canvas" aria-hidden="true" />
</template>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
</style>
