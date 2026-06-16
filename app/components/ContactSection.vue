<script setup lang="ts">
import { contacts, profile } from '~/data/resume'

const year = new Date().getFullYear()
</script>

<template>
  <section id="contact" class="contact grid-bg">
    <v-container style="max-width: 1080px" class="py-12 py-md-16">
      <SectionLabel label="get_in_touch" />

      <v-row align="center">
        <v-col cols="12" md="7">
          <p v-reveal class="font-mono prompt contact-prompt mb-2">echo $STATUS</p>
          <h2 v-reveal="80" class="contact-head mb-4">
            Open to new challenges &amp;
            <span class="text-amber">production-critical</span> work.
          </h2>
          <p v-reveal="140" class="contact-sub">
            Have a system that needs building, fixing, or rescuing? Let's talk.
          </p>
        </v-col>

        <v-col cols="12" md="5">
          <div class="d-flex flex-column ga-3">
            <a
              v-for="(c, i) in contacts"
              :key="c.label"
              v-reveal="i * 70"
              :href="c.href"
              target="_blank"
              rel="noopener"
              class="contact-link"
            >
              <v-icon :icon="c.icon" color="primary" size="20" class="mr-3" />
              <div class="d-flex flex-column">
                <span class="contact-label font-mono">{{ c.label }}</span>
                <span class="contact-value">{{ c.value }}</span>
              </div>
              <v-icon icon="mdi-arrow-top-right" size="16" class="ml-auto contact-arrow" />
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <footer class="foot">
      <v-container style="max-width: 1080px" class="d-flex flex-wrap justify-space-between align-center ga-2 py-6">
        <span class="font-mono foot-text">
          <span class="text-amber">{{ '{' }}</span>{{ profile.initials }}<span class="text-amber">{{ '}' }}</span>
          · {{ profile.name }}
        </span>
        <span class="font-mono foot-text">
          built with Nuxt 4 + Vuetify 3 · © {{ year }}
        </span>
      </v-container>
    </footer>
  </section>
</template>

<style scoped>
.contact {
  background: #0d1117;
  border-top: 1px solid var(--line);
}
.contact-prompt {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.contact-head {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1.15;
  color: var(--text);
}
.text-amber {
  color: var(--amber);
}
.contact-sub {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
}
.contact-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  background: #1c2330;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 14px 16px;
  transition: transform 0.18s ease, border-color 0.18s ease;
}
.contact-link:hover {
  transform: translateX(3px);
  border-color: rgba(245, 166, 35, 0.45);
}
.contact-label {
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
}
.contact-value {
  font-size: 0.9rem;
  color: var(--text);
}
.contact-arrow {
  color: var(--text-dim);
}
.contact-link:hover .contact-arrow {
  color: var(--amber);
}
.foot {
  border-top: 1px solid var(--line);
  background: #080c10;
}
.foot-text {
  font-size: 0.72rem;
  color: var(--text-dim);
}
</style>
