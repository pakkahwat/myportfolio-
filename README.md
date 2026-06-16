# Pakkahwat Chuesaard — Portfolio

A one-page portfolio & resume site built with **Nuxt 4** and **Vuetify 3**.
The visual identity (GitHub-dark surfaces, amber accent, JetBrains Mono labels)
is carried over from the original CV.

## Sections

`summary` → `success_stories` → `skills` → `work_experience` → `key_projects`
→ `education` → `get_in_touch`, with a sticky nav, smooth-scroll, and
scroll-reveal animations (disabled automatically under `prefers-reduced-motion`).

## Requirements

- Node.js **20.x or newer** (Nuxt 4 requires Node 20+)
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
npm run build      # production build (Node server output)
npm run preview    # preview the production build locally
npm run generate   # fully static build → .output/public (deploy anywhere)
```

For static hosting (GitHub Pages, Netlify, Cloudflare Pages, etc.) use
`npm run generate` and deploy the `.output/public` folder.

## Editing your content

Everything you'll want to change lives in **one file**:

```
app/data/resume.ts
```

Profile, summary, KPIs, skills, tech stack, languages, success stories,
work experience, projects, education, and contact links are all defined there.
Update the values and the whole site updates with them.

### Add your photo
Drop a square image at `public/profile.jpg`. If it's missing, the hero
falls back to your initials automatically.

### Real contact links
Replace the placeholder email / GitHub / LinkedIn values in the
`contacts` array in `app/data/resume.ts`.

## Project structure

```
nuxt.config.ts            Nuxt + Vuetify config, fonts, <head> meta
app/
  app.vue                 root shell (v-app + sticky header + <NuxtPage>)
  pages/index.vue         the single page — assembles all sections
  plugins/
    vuetify.ts            Vuetify instance + custom "codeDark" theme
    reveal.client.ts      v-reveal scroll-in directive
  assets/css/main.css     fonts, tokens, terminal flourishes, reveal styles
  data/resume.ts          ← all editable content
  components/
    SiteHeader.vue        sticky nav + mobile drawer
    HeroSection.vue       name, title, avatar, KPIs, CTAs
    SummarySection.vue    summary + success stories
    SkillsSection.vue     skill bars, tech chips, languages
    ExperienceSection.vue work history timeline
    ProjectsSection.vue   project cards
    EducationSection.vue  education card
    ContactSection.vue    contact links + footer
    SectionLabel.vue      reusable mono "// section" heading
public/
  favicon.svg
```

## Theme

Colours are defined once in `app/plugins/vuetify.ts` (the `codeDark` theme)
and mirrored as CSS variables in `app/assets/css/main.css`. Change the amber
(`#F5A623`) in both places to re-skin the whole site.
