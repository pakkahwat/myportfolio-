<script setup lang="ts">
import { skills, techStack, languages } from '~/data/resume'

const { t } = useT()

// Hold the skill bars at 0 until the column scrolls into view, then let them
// sweep up to their real values (the progress bar tweens the width itself).
const skillsCol = ref<any>()
const filled = ref(false)
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    filled.value = true
    return
  }
  const node: Element | undefined = skillsCol.value?.$el ?? skillsCol.value
  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        filled.value = true
        io.disconnect()
      }
    },
    { threshold: 0.35 },
  )
  if (node) io.observe(node)
})
</script>

<template>
  <section id="skills" class="py-12 py-md-16 skills-band">
    <v-container style="max-width: 1080px">
      <SectionLabel label="skills" />

      <v-row>
        <!-- Core skills with bars -->
        <v-col ref="skillsCol" cols="12" md="6">
          <div v-reveal class="block-label font-mono mb-5">core_skills</div>

          <div
            v-for="(skill, i) in skills"
            :key="i"
            v-reveal="i * 70"
            class="skill mb-5"
          >
            <div class="d-flex justify-space-between align-end mb-2">
              <div>
                <span class="skill-name">{{ t(skill.name) }}</span>
                <span class="skill-sub font-mono">{{ t(skill.sub) }}</span>
              </div>
              <span class="skill-lvl font-mono">{{ t(skill.level) }}</span>
            </div>
            <v-progress-linear
              :model-value="filled ? skill.value : 0"
              color="primary"
              bg-color="#30363d"
              height="4"
              rounded
              class="skill-bar"
              :style="{ transitionDelay: `${i * 90}ms` }"
            />
          </div>
        </v-col>

        <!-- Tech stack + languages -->
        <v-col cols="12" md="6">
          <div v-reveal class="block-label font-mono mb-5">tech_stack</div>
          <div v-reveal="80" class="d-flex flex-wrap ga-2 mb-10">
            <v-chip
              v-for="tech in techStack"
              :key="tech"
              size="small"
              variant="outlined"
              class="font-mono tech-chip"
            >
              {{ tech }}
            </v-chip>
          </div>

          <div v-reveal class="block-label font-mono mb-5">languages</div>
          <div
            v-for="(lang, li) in languages"
            :key="li"
            v-reveal="60"
            class="d-flex justify-space-between align-center mb-3"
          >
            <span class="lang-name">{{ t(lang.name) }}</span>
            <div class="d-flex ga-1">
              <span
                v-for="n in 5"
                :key="n"
                class="lang-dot"
                :class="{ 'lang-dot--on': n <= lang.level }"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.skills-band {
  background: #0d1117;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.block-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--line);
}
.block-label::before {
  content: '// ';
  color: var(--amber-dim);
}
/* Slow, eased sweep when the bars fill on scroll-in */
.skill-bar :deep(.v-progress-linear__determinate) {
  transition: width 1.1s cubic-bezier(0.22, 1, 0.36, 1) !important;
}
.skill-name {
  font-size: 0.9rem;
  color: var(--text);
}
.skill-sub {
  font-size: 0.74rem;
  color: var(--text-dim);
  margin-left: 8px;
}
.skill-lvl {
  font-size: 0.68rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--amber-dim);
  white-space: nowrap;
}
.tech-chip {
  color: var(--text-muted) !important;
  border-color: var(--line) !important;
  background: #1c2330 !important;
}
.lang-name {
  font-size: 0.9rem;
  color: var(--text);
}
.lang-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #30363d;
}
.lang-dot--on {
  background: var(--amber);
}
</style>
