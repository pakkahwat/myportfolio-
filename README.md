# Pakkahwat Chuesaard — Portfolio

A one-page portfolio & resume site on **Next.js 16 + React 19** (static export,
served by Cloudflare Workers), bilingual EN/TH. Originally a Nuxt 4 + Vuetify 3
build; redesigned in Oct 2026 to a light, minimal (Swiss-style) look with a dark
theme toggle.

## Sections

Hero → Projects → About → Experience → Skills → Education → Contact, with a
sticky header (scroll-spy nav, EN/ไทย switch, light/dark toggle), and a subtle
scroll fade-in that is skipped under `prefers-reduced-motion` and never hides
content when JS is off.

Projects are split into three groups (`projectGroups` in `lib/resume.ts`):
live apps (with a headline number), production systems at work, and earlier work
(compact cards).

## Requirements

- Node.js **20.9 or newer** (Next.js 16 requirement)
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
npm run build      # static export into out/
npm run start      # serve out/ locally
npm run typecheck  # next typegen + tsc
```

`next` is pinned to an exact version: on the Windows dev machine, Smart App
Control blocks the native SWC binary of a freshly published release, so bump
it only to a version that has been out for a while.

## Editing your content

Everything you'll want to change lives in **one file**:

```
lib/resume.ts
```

Profile, hero pitch, summary, KPIs, skills, tech groups, languages, highlights,
work experience, projects, education, contact links, section titles and UI
strings are all defined there.
Update the values and the whole site updates with them.

### Add your photo
Drop a square image at `public/profile.jpg`. If it's missing, the hero
falls back to your initials automatically.

### Real contact links
Replace the placeholder email / GitHub / LinkedIn values in the
`contacts` array in `lib/resume.ts`.

### Résumé PDFs
`public/resume/pakkahwat-chuesaard-resume-{en,th}.pdf` are linked from the hero
and the contact section. They are built from the private CV HTML (kept outside
this repo — it has a birth date, home address and phone number):

```bash
python scripts/make-public-resume.py "<private cv-en.html>" en
python scripts/make-public-resume.py "<private resume-th.html>" th
```

The script strips the private contact details (and refuses to write if any
remain), adds the newer personal projects, and prints 2 A4 pages with headless
Edge/Chrome. Bump `lastUpdated` in `lib/resume.ts` when the content changes.

## Project structure

```
app/
  layout.tsx              root shell: next/font (Inter + Noto Sans Thai + JetBrains Mono),
                          boot script (theme before first paint), skip link, header
  page.tsx                the single page — assembles all sections
  globals.css             design tokens (light + [data-theme=dark]), base, buttons, chips, reveal
lib/
  resume.ts               ← all editable content
  useT.ts                 Localized-value resolver (EN/TH)
  LocaleContext.tsx       EN/TH locale state (defaults to English, not persisted)
  directives.ts           useReveal — fade-in on first view
components/
  SiteHeader.tsx          sticky header, scroll-spy nav, language + theme toggles, mobile menu
  HeroSection.tsx         status, name, pitch, CTAs + résumé download, photo, KPI row
  ProjectsSection.tsx     grouped project cards
  AboutSection.tsx        summary + numbered highlights
  ExperienceSection.tsx   work history (period | role, company, bullets)
  SkillsSection.tsx       core strengths, grouped toolbox, languages
  EducationSection.tsx    education card
  ContactSection.tsx      email CTA, links, résumé downloads, footer
  SectionHeader.tsx       "01  Title" heading used by every section
  Reveal.tsx              wraps an element with useReveal (works inside .map())
  ui.tsx                  inline SVG icon set (Lucide shapes)
public/
  favicon.svg
  profile.jpg
  resume/                 public résumé PDFs (EN/TH)
scripts/
  make-public-resume.py   builds the PDFs above from the private CV
```

## Theme

All colours are CSS variables at the top of `app/globals.css`: `:root` is the
light theme (default) and `:root[data-theme='dark']` the dark one. Every text
colour pair meets WCAG AA (4.5:1). The header toggle stores the choice in
`localStorage` (`theme`), and the boot script in `layout.tsx` applies it before
first paint so a dark reload never flashes light. The accent is amber
(`--accent`), used sparingly for section numbers, metrics and the company name.
