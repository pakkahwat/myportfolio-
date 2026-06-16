<script setup lang="ts">
// Constellation field behind the hero. Particles drift slowly and link to
// nearby neighbours. When the cursor is present it pulls nearby particles in
// (accelerating as they get closer); once one reaches the pointer it fades out
// and respawns elsewhere — so the field streams *into* the cursor and vanishes
// instead of collapsing into a permanent clump. The pool size is fixed, which
// caps how many particles can ever be on screen. Disabled under
// prefers-reduced-motion (renders nothing — the static grid stays).
const canvas = ref<HTMLCanvasElement>()
let raf = 0
let cleanup: (() => void) | null = null

interface P {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number // 0 = invisible; fades in on spawn, out when consumed
  fading: boolean // true once it has reached the cursor
}

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

  const ATTRACT = 200 // cursor influence radius
  const CONSUME = 14 // within this, the particle is "absorbed" and fades out

  // (Re)place a particle at a random spot, biased away from the cursor so it
  // fades in and drifts before being pulled back in. Resets its drift + life.
  const respawn = (p: P) => {
    let x = 0
    let y = 0
    let tries = 0
    do {
      x = Math.random() * w
      y = Math.random() * h
      tries++
    } while (mouse.active && Math.hypot(x - mouse.x, y - mouse.y) < 110 && tries < 8)
    p.x = x
    p.y = y
    p.vx = (Math.random() - 0.5) * 0.25
    p.vy = (Math.random() - 0.5) * 0.25
    p.alpha = 0
    p.fading = false
  }

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
    // Fixed pool: density scales with area, hard-capped so the screen never
    // gets cluttered no matter how large the viewport.
    const count = Math.min(80, Math.round((w * h) / 17000))
    points = Array.from({ length: count }, () => {
      const p: P = { x: 0, y: 0, vx: 0, vy: 0, alpha: 0, fading: false }
      respawn(p)
      p.alpha = Math.random() // stagger initial fade-in so they don't pop in together
      return p
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

    for (const p of points) {
      // steady drift + wall bounce keeps the field alive
      p.x += p.vx
      p.y += p.vy
      if (p.x <= 0 || p.x >= w) p.vx *= -1
      if (p.y <= 0 || p.y >= h) p.vy *= -1
      p.x = Math.max(0, Math.min(w, p.x))
      p.y = Math.max(0, Math.min(h, p.y))

      // cursor attraction: a gentle proximity-weighted lerp toward the pointer.
      // A squared falloff keeps far particles barely drifting and only eases
      // them in as they get close — a slow, graceful pull rather than a yank.
      if (mouse.active) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < ATTRACT) {
          const t = 1 - d / ATTRACT // 0 at the edge → 1 at the pointer
          const pull = 0.0035 + 0.014 * t * t
          p.x += dx * pull
          p.y += dy * pull
          if (d < CONSUME && p.alpha > 0.3) p.fading = true
        }
      }

      // life cycle: fade out when consumed (then respawn), else fade in
      if (p.fading) {
        p.alpha -= 0.045
        if (p.alpha <= 0) respawn(p)
      } else if (p.alpha < 1) {
        p.alpha = Math.min(1, p.alpha + 0.02)
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(245, 166, 35, ${0.6 * p.alpha})`
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
          const o = 0.12 * (1 - dist / LINK) * Math.min(a.alpha, b.alpha)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(139, 148, 158, ${o})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      // brighter links to the cursor node
      if (mouse.active) {
        const dist = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dist < ATTRACT) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(245, 166, 35, ${0.3 * (1 - dist / ATTRACT) * a.alpha})`
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
