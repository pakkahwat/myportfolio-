<script setup lang="ts">
import { jobs } from '~/data/resume'

const { t } = useT()
</script>

<template>
  <section id="experience" class="py-12 py-md-16">
    <v-container style="max-width: 1080px">
      <SectionLabel label="work_experience" />

      <v-timeline
        side="end"
        align="start"
        truncate-line="both"
        density="comfortable"
        class="exp-timeline"
      >
        <v-timeline-item
          v-for="(job, i) in jobs"
          :key="job.company"
          :dot-color="job.current ? 'primary' : 'surface-variant'"
          size="x-small"
          fill-dot
        >
          <template #icon>
            <span v-if="job.current" class="tl-pulse" />
          </template>

          <div v-reveal="i * 60" class="job">
            <div class="d-flex flex-wrap justify-space-between align-baseline ga-2">
              <div>
                <div class="job-role">{{ t(job.role) }}</div>
                <div class="job-co">{{ job.company }}</div>
              </div>
              <v-chip
                size="x-small"
                variant="tonal"
                :color="job.current ? 'primary' : undefined"
                class="font-mono period-chip"
              >
                {{ t(job.period) }}
              </v-chip>
            </div>

            <ul class="bullets mt-3">
              <li v-for="(b, bi) in job.bullets" :key="bi">{{ t(b) }}</li>
            </ul>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </section>
</template>

<style scoped>
.exp-timeline {
  margin-top: 8px;
}
.job-role {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
}
.job-co {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--amber-dim);
  margin-top: 2px;
}
.period-chip {
  color: var(--text-muted) !important;
}
.bullets {
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.bullets li {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
}
.bullets li::marker {
  color: var(--amber);
}
.tl-pulse {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0d1117;
}
</style>
