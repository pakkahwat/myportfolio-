<script setup lang="ts">
// Animates the numeric part of a label up from zero the first time it scrolls
// into view, preserving any prefix/suffix (e.g. "99%+" counts 0→99, keeps "%+").
// Non-numeric values (e.g. "hrs→min") render as-is. Static under reduced motion.
const props = defineProps<{ value: string }>()
const el = ref<HTMLElement>()
const display = ref(props.value)

onMounted(() => {
  const m = props.value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  if (!m || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = props.value
    return
  }
  const [, pre, numStr, post] = m
  const target = parseFloat(numStr!)
  const decimals = (numStr!.split('.')[1] || '').length
  display.value = `${pre}0${post}`

  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return
      io.disconnect()
      const dur = 1200
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur)
        const eased = 1 - Math.pow(1 - t, 3)
        display.value = `${pre}${(target * eased).toFixed(decimals)}${post}`
        if (t < 1) requestAnimationFrame(step)
        else display.value = props.value
      }
      requestAnimationFrame(step)
    },
    { threshold: 0.5 },
  )
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <span ref="el">{{ display }}</span>
</template>
