// Interactive pointer directives, registered client-side only.
//
//   v-tilt       3D parallax tilt that follows the cursor, with a soft amber
//                glare overlay. Optional value = max tilt in degrees (default 9).
//   v-magnetic   Element is gently pulled toward the cursor while hovered.
//                Optional value = strength 0–1 (default 0.25).
//
// Both bail out entirely under prefers-reduced-motion or on coarse (touch)
// pointers, where the effects would be useless or janky.
export default defineNuxtPlugin((nuxtApp) => {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  const enabled = !reduce && finePointer

  nuxtApp.vueApp.directive('tilt', {
    mounted(el: HTMLElement, binding) {
      if (!enabled) return
      const max = Number(binding.value) || 9
      el.style.transformStyle = 'preserve-3d'
      el.style.transition = 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)'

      const glare = document.createElement('span')
      glare.className = 'tilt-glare'
      el.appendChild(glare)

      let raf = 0
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const rx = (0.5 - py) * max * 2
          const ry = (px - 0.5) * max * 2
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`
          glare.style.setProperty('--mx', `${px * 100}%`)
          glare.style.setProperty('--my', `${py * 100}%`)
          glare.style.opacity = '1'
        })
      }
      const onLeave = () => {
        cancelAnimationFrame(raf)
        el.style.transform = ''
        glare.style.opacity = '0'
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      ;(el as any).__tilt = () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    unmounted(el: HTMLElement) {
      ;(el as any).__tilt?.()
    },
  })

  nuxtApp.vueApp.directive('magnetic', {
    mounted(el: HTMLElement, binding) {
      if (!enabled) return
      const strength = Number(binding.value) || 0.25
      el.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)'
      let raf = 0
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
        })
      }
      const onLeave = () => {
        cancelAnimationFrame(raf)
        el.style.transform = ''
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      ;(el as any).__mag = () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    unmounted(el: HTMLElement) {
      ;(el as any).__mag?.()
    },
  })
})
