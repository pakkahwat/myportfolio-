<script setup lang="ts">
// Lightweight constellation field behind the hero. Particles drift slowly and
// link to nearby neighbours; the cursor adds a brighter "gravity" node that
// pulls and lights up the network around it. Pure canvas, no deps. Disabled
// under prefers-reduced-motion (renders nothing — the static grid stays).
const canvas = ref<HTMLCanvasElement>()
let raf = 0
let cleanup: (() => void) | null = null

// x/y/vx/vy are the steady drift state; dx/dy are the rendered positions
// (drift + a temporary push away from the cursor).
interface P { x: number; y: number; vx: number; vy: number; dx: number; dy: number }

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
    points = Array.from({ length: count }, () => {
      const x = Math.random() * w
      const y = Math.random() * h
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        dx: x,
        dy: y,
      }
    })
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
    const REPEL = 150 // cursor influence radius
    const PUSH = 38 // max px a particle is shoved out of the way

    for (const p of points) {
      // Steady drift + wall bounce. The cursor never touches this base state,
      // so the field can't collapse onto a stationary pointer.
      p.x += p.vx
      p.y += p.vy
      if (p.x <= 0 || p.x >= w) p.vx *= -1
      if (p.y <= 0 || p.y >= h) p.vy *= -1
      p.x = Math.max(0, Math.min(w, p.x))
      p.y = Math.max(0, Math.min(h, p.y))

      // Render position = drift pushed *away* from the cursor, springing back
      // to the drift position as the cursor moves off.
      p.dx = p.x
      p.dy = p.y
      if (mouse.active) {
        const ox = p.x - mouse.x
        const oy = p.y - mouse.y
        const dist = Math.hypot(ox, oy) || 1
        if (dist < REPEL) {
          const push = (1 - dist / REPEL) * PUSH
          p.dx = p.x + (ox / dist) * push
          p.dy = p.y + (oy / dist) * push
        }
      }

      ctx.beginPath()
      ctx.arc(p.dx, p.dy, 1.4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(245, 166, 35, 0.55)'
      ctx.fill()
    }

    for (let i = 0; i < points.length; i++) {
      const a = points[i]!
      for (let j = i + 1; j < points.length; j++) {
        const b = points[j]!
        const dx = a.dx - b.dx
        const dy = a.dy - b.dy
        const dist = Math.hypot(dx, dy)
        if (dist < LINK) {
          ctx.beginPath()
          ctx.moveTo(a.dx, a.dy)
          ctx.lineTo(b.dx, b.dy)
          ctx.strokeStyle = `rgba(139, 148, 158, ${0.12 * (1 - dist / LINK)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      // brighter links to the cursor node
      if (mouse.active) {
        const dist = Math.hypot(a.dx - mouse.x, a.dy - mouse.y)
        if (dist < 200) {
          ctx.beginPath()
          ctx.moveTo(a.dx, a.dy)
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
