# Pakkahwat Chuesaard — Portfolio

A one-page portfolio & resume site, ported from the original **Nuxt 4 + Vuetify 3**
build to **Next.js 15 + React 19**. The visual identity (GitHub-dark surfaces,
amber accent, JetBrains Mono labels) is carried over unchanged.

## Sections

`summary` → `success_stories` → `skills` → `work_experience` → `key_projects`
→ `education` → `get_in_touch`, with a sticky nav, smooth-scroll, and
scroll-reveal animations (disabled automatically under `prefers-reduced-motion`).

## Requirements

- Node.js **18.18 or newer** (Next.js 15 requirement)
- npm (or pnpm / yarn / bun)

## Getting started

```bash
# 1. install dependencies
npm install

# 2. start the dev server  →  http://localhost:3000
npm run dev
```

## Other commands

```bash
npm run build      # production build
npm run start      # run the production build locally
npm run lint       # lint
```

## Editing your content

Everything you'll want to change lives in **one file**:

```
lib/resume.ts
```

Profile, summary, KPIs, skills, tech stack, languages, success stories,
work experience, projects, education, and contact links are all defined there.
Update the values and the whole site updates with them.

### Add your photo
Drop a square image at `public/profile.jpg`. If it's missing, the hero
falls back to your initials automatically.

### Real contact links
Replace the placeholder email / GitHub / LinkedIn values in the
`contacts` array in `lib/resume.ts`.

## Project structure

```
app/
  layout.tsx              root shell (fonts, <head> meta, sticky header)
  page.tsx                the single page — assembles all sections
  globals.css             tokens, terminal flourishes, reveal styles, grid/utility CSS
lib/
  resume.ts               ← all editable content
  useT.ts                 Localized-value resolver (EN/TH)
  LocaleContext.tsx        EN/TH locale state (no persistence, matches original)
  directives.ts            useReveal / useTilt / useMagnetic hooks (ports of the
                           original Nuxt v-reveal / v-tilt / v-magnetic directives)
  mergeRefs.ts             combine multiple hook refs on one DOM node
components/
  SiteHeader.tsx          sticky nav + mobile drawer
  HeroSection.tsx         name, title, avatar, KPIs, CTAs
  HeroCanvas.tsx          constellation canvas background
  SummarySection.tsx      summary + success stories
  SkillsSection.tsx       skill bars, tech chips, languages
  ExperienceSection.tsx   work history timeline
  ProjectsSection.tsx     project cards
  EducationSection.tsx    education card
  ContactSection.tsx      contact links + footer
  SectionLabel.tsx        reusable mono "// section" heading
  CountUp.tsx             animated KPI numbers
  Reveal.tsx / Tilt.tsx   wrapper components for the scroll-reveal / tilt hooks
  ui.tsx                  small presentational primitives (chip, button, avatar,
                           progress bar, icon) replacing the original Vuetify components
public/
  favicon.svg
  profile.jpg
```

## Theme

Colours are defined once as CSS variables in `app/globals.css` (`--amber`,
`--amber-dim`, etc.), mirroring the original Vuetify `codeDark` theme. Change
the amber (`#F5A623`) there to re-skin the whole site.

## Notes on the port

This is a like-for-like rewrite of the original Nuxt/Vue/Vuetify codebase:
- Vue SFCs → React function components (same file-per-section structure).
- `@nuxtjs/i18n` (`no_prefix` strategy) → a small React context (`LocaleContext`)
  with the same default-English, no-persistence behavior.
- Vuetify components (`v-container`, `v-row`/`v-col`, `v-chip`, `v-btn`,
  `v-avatar`, `v-progress-linear`, `v-timeline`, `v-app-bar`,
  `v-navigation-drawer`) → hand-rolled equivalents in `components/ui.tsx` and
  per-component CSS, tuned to match the original scoped styles pixel-for-pixel.
- Nuxt plugins (`v-reveal`, `v-tilt`, `v-magnetic` directives) → React hooks in
  `lib/directives.ts`, used directly or via the `Reveal`/`Tilt` wrapper
  components when applied inside a list.
- MDI icons via `@mdi/font` (unchanged).
