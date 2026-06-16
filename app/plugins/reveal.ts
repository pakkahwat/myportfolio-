// v-reveal: fades + lifts an element into view the first time it enters the
// viewport. Respects prefers-reduced-motion (elements just appear). Optional
// numeric value (ms) staggers the transition delay, e.g. v-reveal="120".
export default defineNuxtPlugin((nuxtApp) => {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let observer: IntersectionObserver | null = null
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--in')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (reduceMotion || !observer) {
        el.classList.add('reveal--in')
        return
      }
      const delay = Number(binding.value) || 0
      if (delay) el.style.transitionDelay = delay + 'ms'
      el.classList.add('reveal')
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
