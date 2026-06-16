<script setup lang="ts">
import { summary, stories } from '~/data/resume'

const { t } = useT()
</script>

<template>
  <section id="summary" class="py-12 py-md-16">
    <v-container style="max-width: 1080px">
      <SectionLabel label="summary" />

      <p v-reveal class="summary-text mb-12">{{ t(summary) }}</p>

      <SectionLabel label="success_stories" />

      <v-row dense>
        <v-col
          v-for="(story, i) in stories"
          :key="i"
          cols="12"
          md="6"
        >
          <v-card
            v-reveal="i * 80"
            class="story-card h-100"
            variant="flat"
          >
            <div class="d-flex">
              <v-icon icon="mdi-star-four-points" color="primary" size="18" class="mt-1 mr-3 flex-shrink-0" />
              <div>
                <div class="story-head mb-1">{{ t(story.head) }}</div>
                <div class="story-desc">{{ t(story.desc) }}</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.summary-text {
  font-size: clamp(1rem, 2.4vw, 1.18rem);
  line-height: 1.85;
  color: var(--text-muted);
  max-width: 880px;
}
.story-card {
  background: #1c2330 !important;
  border: 1px solid var(--line);
  border-left: 2px solid var(--amber);
  border-radius: 0 10px 10px 0 !important;
  padding: 16px 18px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.story-card:hover {
  transform: translateY(-2px);
  border-left-color: #ffbd5a;
}
.story-head {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
}
.story-desc {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.65;
}
</style>
