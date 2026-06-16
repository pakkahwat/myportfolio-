<script setup lang="ts">
import { profile, kpis } from '~/data/resume'

const imgError = ref(false)

// Typewriter for the role line — types out once on mount, leaves a blinking
// caret. Falls back to the full string under reduced motion.
const typed = ref('')
const typingDone = ref(false)
onMounted(() => {
  const full = profile.title
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.value = full
    typingDone.value = true
    return
  }
  let i = 0
  const tick = () => {
    typed.value = full.slice(0, i)
    if (i < full.length) {
      i++
      setTimeout(tick, 34)
    } else {
      typingDone.value = true
    }
  }
  setTimeout(tick, 550)
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="top" class="hero grid-bg">
    <div class="accent-bar hero-accent" />
    <HeroCanvas />

    <v-container class="hero-content" style="max-width: 1080px">
      <v-row align="center" class="py-10 py-md-14">
        <!-- Left: identity -->
        <v-col cols="12" md="8" order="2" order-md="1">
          <div v-reveal class="font-mono terminal-line mb-4">
            <span class="dot dot--red" />
            <span class="dot dot--amber" />
            <span class="dot dot--green" />
            <span class="terminal-path">~/pakkahwat — zsh</span>
          </div>

          <p v-reveal="60" class="font-mono prompt greeting mb-2">whoami</p>

          <h1 v-reveal="120" class="hero-name">
            {{ profile.name }}
          </h1>

          <p v-reveal="180" class="font-mono hero-title prompt">
            {{ typed }}<span class="type-caret" :class="{ 'type-caret--blink': typingDone }" />
          </p>

          <div v-reveal="240" class="d-flex flex-wrap ga-2 mt-5">
            <v-chip
              variant="tonal"
              color="primary"
              size="small"
              prepend-icon="mdi-map-marker-outline"
              class="font-mono"
            >
              {{ profile.location }}
            </v-chip>
            <v-chip
              variant="outlined"
              size="small"
              prepend-icon="mdi-laptop"
              class="font-mono chip-muted"
            >
              {{ profile.focus }}
            </v-chip>
          </div>

          <div v-reveal="300" class="d-flex flex-wrap ga-3 mt-7">
            <v-btn
              v-magnetic="0.3"
              color="primary"
              variant="flat"
              class="font-mono action-btn action-btn--glow"
              prepend-icon="mdi-folder-multiple-outline"
              @click="scrollTo('projects')"
            >
              view_projects
            </v-btn>
            <v-btn
              v-magnetic="0.3"
              variant="outlined"
              color="primary"
              class="font-mono action-btn"
              prepend-icon="mdi-email-outline"
              @click="scrollTo('contact')"
            >
              contact_me
            </v-btn>
          </div>
        </v-col>

        <!-- Right: avatar -->
        <v-col cols="12" md="4" order="1" order-md="2" class="text-center text-md-end">
          <div v-reveal class="avatar-wrap">
            <v-avatar size="148" class="avatar">
              <v-img
                v-if="!imgError"
                :src="profile.photo"
                :alt="profile.name"
                cover
                @error="imgError = true"
              />
              <span v-else class="font-mono avatar-initials">{{ profile.initials }}</span>
            </v-avatar>
            <span class="status-pill font-mono">
              <span class="status-dot" /> available
            </span>
          </div>
        </v-col>
      </v-row>

      <!-- KPI strip -->
      <v-row v-reveal="120" class="kpi-row pb-12" dense>
        <v-col v-for="kpi in kpis" :key="kpi.label" cols="6" sm="3">
          <div class="kpi">
            <div class="font-mono kpi-value"><CountUp :value="kpi.value" /></div>
            <div class="font-mono kpi-label">{{ kpi.label }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  background: #0d1117;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}
.hero-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 3;
}
/* Lift the actual content above the constellation canvas */
.hero-content {
  position: relative;
  z-index: 2;
}

.terminal-line {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #161b22;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.72rem;
  color: var(--text-dim);
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot--red {
  background: #ff5f56;
}
.dot--amber {
  background: #ffbd2e;
}
.dot--green {
  background: #27c93f;
}
.terminal-path {
  margin-left: 6px;
}

.greeting {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.hero-name {
  font-size: clamp(2.1rem, 6vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.04;
  background: linear-gradient(
    100deg,
    var(--text) 0%,
    var(--text) 35%,
    var(--amber) 50%,
    var(--text) 65%,
    var(--text) 100%
  );
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: name-shimmer 6s ease-in-out infinite;
}
@keyframes name-shimmer {
  0%,
  100% {
    background-position: 130% 0;
  }
  50% {
    background-position: -30% 0;
  }
}
.hero-title {
  font-size: clamp(0.85rem, 2.4vw, 1.05rem);
  color: var(--amber);
  margin-top: 10px;
  min-height: 1.5em;
}
.type-caret {
  display: inline-block;
  width: 8px;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--amber);
  translate: 0 2px;
}
.type-caret--blink {
  animation: caret-blink 1.1s step-end infinite;
}
@keyframes caret-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-name {
    animation: none;
  }
  .type-caret {
    display: none;
  }
}
.chip-muted {
  color: var(--text-muted) !important;
  border-color: var(--line) !important;
}
.action-btn {
  text-transform: none;
  letter-spacing: 0.01em;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.action-btn--glow:hover {
  box-shadow:
    0 0 0 1px rgba(245, 166, 35, 0.5),
    0 8px 30px -6px rgba(245, 166, 35, 0.55);
}

.avatar-wrap {
  position: relative;
  display: inline-block;
}
.avatar {
  border: 3px solid var(--amber);
  background: #1c2330;
  box-shadow: 0 0 0 6px rgba(245, 166, 35, 0.07);
}
.avatar-initials {
  font-size: 2.6rem;
  font-weight: 600;
  color: var(--amber);
}
.status-pill {
  position: absolute;
  bottom: 4px;
  right: 50%;
  transform: translateX(50%);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #161b22;
  border: 1px solid var(--line);
  color: var(--green);
  font-size: 0.66rem;
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 0 0 rgba(63, 185, 80, 0.6);
  animation: pulse 2s infinite;
}
@media (min-width: 960px) {
  .status-pill {
    right: 8px;
    transform: none;
  }
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(63, 185, 80, 0.5);
  }
  70% {
    box-shadow: 0 0 0 7px rgba(63, 185, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(63, 185, 80, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .status-dot {
    animation: none;
  }
}

.kpi-row {
  border-top: 1px solid var(--line);
  padding-top: 28px;
}
.kpi {
  background: #1c2330;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 16px 12px;
  text-align: center;
  height: 100%;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.kpi:hover {
  transform: translateY(-4px);
  border-color: rgba(245, 166, 35, 0.45);
  box-shadow: 0 10px 28px -12px rgba(245, 166, 35, 0.4);
}
.kpi-value {
  font-size: clamp(1.3rem, 3.5vw, 1.7rem);
  font-weight: 600;
  color: var(--amber);
  line-height: 1;
}
.kpi-label {
  font-size: 0.62rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 8px;
}
</style>
