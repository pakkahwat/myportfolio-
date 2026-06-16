<script setup lang="ts">
import { education } from '~/data/resume'
</script>

<template>
  <section id="education" class="py-12 py-md-16">
    <v-container style="max-width: 1080px">
      <SectionLabel label="education" />

      <v-card v-reveal class="edu-card" variant="flat">
        <div class="d-flex flex-wrap justify-space-between align-center ga-4">
          <div class="d-flex align-center ga-4">
            <v-avatar size="46" class="edu-icon">
              <v-icon icon="mdi-school-outline" color="primary" />
            </v-avatar>
            <div>
              <div class="edu-deg">{{ education.degree }}</div>
              <div class="edu-uni">{{ education.university }}</div>
            </div>
          </div>
          <div class="text-md-end">
            <div class="edu-yr font-mono">{{ education.period }}</div>
            <v-chip
              size="x-small"
              color="primary"
              variant="tonal"
              class="font-mono mt-1"
            >
              {{ education.gpa }}
            </v-chip>
          </div>
        </div>
      </v-card>
    </v-container>
  </section>
</template>

<style scoped>
.edu-card {
  background: #1c2330 !important;
  border: 1px solid var(--line);
  padding: 22px 24px;
}
.edu-icon {
  background: rgba(245, 166, 35, 0.1);
  border: 1px solid rgba(245, 166, 35, 0.25);
}
.edu-deg {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
}
.edu-uni {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 2px;
}
.edu-yr {
  font-size: 0.8rem;
  color: var(--amber-dim);
}
</style>
