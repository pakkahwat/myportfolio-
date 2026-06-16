<script setup lang="ts">
import { projects } from '~/data/resume'

const { t } = useT()
</script>

<template>
  <section id="projects" class="py-12 py-md-16 projects-band">
    <v-container style="max-width: 1080px">
      <SectionLabel label="key_projects" />

      <v-row>
        <v-col
          v-for="(proj, i) in projects"
          :key="proj.name"
          cols="12"
          md="4"
        >
          <v-card
            v-reveal="i * 90"
            v-tilt="7"
            class="proj-card h-100 d-flex flex-column"
            variant="flat"
          >
            <div class="proj-name">{{ proj.name }}</div>
            <div class="proj-desc">{{ t(proj.desc) }}</div>

            <div class="d-flex flex-wrap ga-1 mb-3">
              <span v-for="tag in proj.tags" :key="tag" class="pt font-mono">{{ tag }}</span>
            </div>

            <div class="outcome mt-auto">
              <span class="ol font-mono">// outcome</span>
              <span class="outcome-text">{{ t(proj.outcome) }}</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.projects-band {
  background: #0d1117;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.proj-card {
  position: relative;
  background: #1c2330 !important;
  border: 1px solid var(--line);
  padding: 18px 18px 16px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;
}
.proj-card:hover {
  border-color: rgba(245, 166, 35, 0.4);
  box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.7);
}
/* Keep card text above the cursor glare overlay */
.proj-card > *:not(.tilt-glare) {
  position: relative;
  z-index: 1;
}
.proj-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}
.proj-desc {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 8px 0 12px;
}
.pt {
  font-size: 0.66rem;
  color: var(--text-dim);
  background: #30363d;
  border: 1px solid var(--line);
  padding: 2px 7px;
  border-radius: 4px;
}
.outcome {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.55;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}
.ol {
  display: block;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--green);
  margin-bottom: 4px;
}
</style>
