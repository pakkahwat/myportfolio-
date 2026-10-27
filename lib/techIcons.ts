// Brand logos for the toolbox (Simple Icons, CC0). Imported one by one so the
// bundle only carries these. Tech without a logo in the set falls back to a
// monogram in the UI. Black logos (Next.js, Vercel) render in currentColor so
// they stay visible in the dark theme.
import {
  siNextdotjs, siReact, siTypescript, siJavascript, siPhp, siNodedotjs, siVuedotjs, siNuxt,
  siVuetify, siTailwindcss, siJquery, siHtml5, siMysql, siPostgresql, siDrizzle, siVercel,
  siGooglegemini, siWebassembly, siPython, siOnnx, siVitest, siGithubactions, siGitlab,
  siDocker, siGit, siCloudflare, siNeon, siLine, siPostman, siJira, siClickup,
} from 'simple-icons'

type SimpleIcon = { path: string; hex: string }

const icons: Record<string, SimpleIcon> = {
  'next.js': siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  php: siPhp,
  'node.js': siNodedotjs,
  'vue.js': siVuedotjs,
  'nuxt.js': siNuxt,
  vuetify: siVuetify,
  'tailwind css': siTailwindcss,
  jquery: siJquery,
  'html/css': siHtml5,
  mysql: siMysql,
  postgresql: siPostgresql,
  'drizzle orm': siDrizzle,
  'vercel ai sdk': siVercel,
  vercel: siVercel,
  'gemini api': siGooglegemini,
  webassembly: siWebassembly,
  pyodide: siPython,
  'onnx runtime web': siOnnx,
  vitest: siVitest,
  'github actions': siGithubactions,
  'gitlab ci/cd': siGitlab,
  docker: siDocker,
  git: siGit,
  cloudflare: siCloudflare,
  neon: siNeon,
  'line messaging api': siLine,
  postman: siPostman,
  jira: siJira,
  clickup: siClickup,
}

export function techIcon(name: string): { path: string; color: string } | null {
  const icon = icons[name.toLowerCase()]
  if (!icon) return null
  return { path: icon.path, color: icon.hex === '000000' ? 'currentColor' : `#${icon.hex}` }
}

// "Next.js 16" → next.js · "PostgreSQL (Neon)" → postgresql + neon · "Gemini" → gemini api.
// Lets project tags and toolbox names match without keeping two spellings in sync.
const aliases: Record<string, string> = { gemini: 'gemini api', vue: 'vue.js', nuxt: 'nuxt.js' }

export function techKeys(tag: string): string[] {
  const keys: string[] = []
  const paren = tag.match(/\(([^)]+)\)/)
  const base = tag
    .replace(/\([^)]*\)/, '')
    .replace(/\s+\d+(\.\d+)*\s*$/, '')
    .trim()
    .toLowerCase()
  keys.push(aliases[base] ?? base)
  if (paren) keys.push(paren[1].trim().toLowerCase())
  return keys
}
