<script setup lang="ts">
defineProps<{
  /** The section keyword, e.g. "work_experience" */
  label: string
}>()
</script>

<template>
  <div class="d-flex align-center mb-6 section-label">
    <span class="marker" />
    <span class="font-mono text-uppercase label-text">{{ label }}</span>
    <span class="rule" />
  </div>
</template>

<style scoped>
.marker {
  width: 12px;
  height: 12px;
  background: var(--amber);
  border-radius: 2px;
  flex-shrink: 0;
  margin-right: 10px;
}
.label-text {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--text-dim);
}
.label-text::before {
  content: '// ';
  color: var(--amber-dim);
}
.rule {
  flex: 1;
  height: 1px;
  background: var(--line);
  margin-left: 14px;
}
</style>
