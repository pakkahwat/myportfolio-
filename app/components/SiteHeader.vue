<script setup lang="ts">
import { navItems, profile } from '~/data/resume'

const { locale, setLocale } = useI18n()

const drawer = ref(false)
const scrolled = ref(false)
const progress = ref(0)

function onScroll() {
  scrolled.value = window.scrollY > 24
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function go(id: string) {
  drawer.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <v-app-bar
    :elevation="scrolled ? 4 : 0"
    height="64"
    class="site-bar"
    :class="{ 'site-bar--scrolled': scrolled }"
    flat
  >
    <div class="accent-bar accent-line" />
    <div
      class="scroll-progress"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />

    <v-container class="d-flex align-center py-0" style="max-width: 1080px">
      <!-- Brand -->
      <button class="brand font-mono" type="button" @click="go('top')">
        <span class="brand-bracket">{</span>
        <span class="brand-name">{{ profile.initials }}</span>
        <span class="brand-bracket">}</span>
      </button>

      <v-spacer />

      <!-- Desktop nav -->
      <nav class="d-none d-md-flex align-center ga-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="nav-link font-mono"
          @click="go(item.id)"
        >
          {{ item.label }}
        </button>
        <div class="lang-switch font-mono ml-2" role="group" aria-label="Language">
          <button :class="{ 'lang-on': locale === 'en' }" @click="setLocale('en')">EN</button>
          <span class="lang-sep">/</span>
          <button :class="{ 'lang-on': locale === 'th' }" @click="setLocale('th')">ไทย</button>
        </div>
        <v-btn
          class="ml-3 font-mono cta-btn"
          color="primary"
          variant="flat"
          size="small"
          @click="go('contact')"
        >
          get_in_touch
        </v-btn>
      </nav>

      <!-- Mobile: language switch + menu toggle -->
      <div class="lang-switch font-mono d-md-none ml-auto" role="group" aria-label="Language">
        <button :class="{ 'lang-on': locale === 'en' }" @click="setLocale('en')">EN</button>
        <span class="lang-sep">/</span>
        <button :class="{ 'lang-on': locale === 'th' }" @click="setLocale('th')">ไทย</button>
      </div>
      <v-btn
        class="d-md-none"
        icon="mdi-menu"
        variant="text"
        color="primary"
        @click="drawer = !drawer"
      />
    </v-container>
  </v-app-bar>

  <!-- Mobile drawer -->
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    width="240"
    color="background"
  >
    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.id"
        class="font-mono drawer-item"
        @click="go(item.id)"
      >
        <span class="prompt">{{ item.label }}</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.site-bar {
  background: rgba(13, 17, 23, 0.7) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease, background 0.25s ease;
}
.site-bar--scrolled {
  background: rgba(13, 17, 23, 0.92) !important;
  border-bottom: 1px solid var(--line);
}
.accent-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
}
.scroll-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--amber), #ff6b35);
  transform: scaleX(0);
  transform-origin: left center;
  box-shadow: 0 0 8px rgba(245, 166, 35, 0.6);
  z-index: 2;
}
.brand {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 4px 2px;
  color: var(--text);
}
.brand-bracket {
  color: var(--amber);
}
.brand-name {
  margin: 0 2px;
}
.nav-link {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  padding: 6px 10px;
  border-radius: 6px;
  transition: color 0.18s ease, background 0.18s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 3px;
  height: 1.5px;
  background: var(--amber);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-link:hover::after {
  transform: scaleX(1);
}
.nav-link::before {
  content: '#';
  color: var(--text-dim);
  margin-right: 1px;
}
.nav-link:hover {
  color: var(--amber);
  background: rgba(245, 166, 35, 0.08);
}
.cta-btn {
  letter-spacing: 0.02em;
  text-transform: none;
}
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
}
.lang-switch button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  color: var(--text-dim);
  transition: color 0.18s ease;
}
.lang-switch button:hover {
  color: var(--text-muted);
}
.lang-switch button.lang-on {
  color: var(--amber);
  font-weight: 600;
}
.lang-sep {
  color: var(--text-dim);
  opacity: 0.5;
}
.drawer-item {
  color: var(--text-muted);
}
</style>
