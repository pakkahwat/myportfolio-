// All résumé content in one typed place. Edit here to update the whole site.

export interface Kpi {
  value: string
  label: string
}

export interface Skill {
  name: string
  sub: string
  level: string
  value: number
}

export interface Language {
  name: string
  level: number // out of 5
}

export interface Story {
  head: string
  desc: string
}

export interface Job {
  role: string
  company: string
  period: string
  current?: boolean
  bullets: string[]
}

export interface Project {
  name: string
  desc: string
  tags: string[]
  outcome: string
}

export interface Education {
  degree: string
  university: string
  period: string
  gpa: string
}

export interface Contact {
  label: string
  value: string
  href: string
  icon: string
}

export const profile = {
  name: 'Pakkahwat Chuesaard',
  initials: 'PC',
  title: 'Software Engineer · Full-Stack & Production Systems',
  location: 'Ayutthaya, Thailand',
  focus: 'Full-Stack · PHP · Vue · Oracle ERP',
  // Drop a real photo at /public/profile.jpg to replace the initials avatar.
  photo: '/profile.jpg',
}

// Phrases cycled by the Hero typewriter (type → hold → delete → next → loop).
// First entry is the primary title; the rest echo the core skills.
export const roles: string[] = [
  profile.title,
  'Database Engineering & Optimization',
  'Production Troubleshooting & Root Cause Analysis',
  'Backend Developer · PHP · JS · SQL',
  'Frontend Developer · Vue · Nuxt.js',
  'Oracle ERP Integration & APIs',
]

export const summary =
  'Software Engineer with 5 years of experience spanning full-stack development and technical support. Specializes in production troubleshooting, database optimization, and mission-critical system maintenance — cutting incident resolution from hours to minutes through direct database intervention and real-time root cause analysis. Operates across finance and pawnshop industries with deep ownership of multiple concurrent production systems.'

export const kpis: Kpi[] = [
  { value: '5', label: 'Yrs Exp' },
  { value: '5+', label: 'Systems Owned' },
  { value: '99%+', label: 'Uptime SLA' },
  { value: 'hrs→min', label: 'Incident Time' },
]

export const skills: Skill[] = [
  { name: 'Database Engineering', sub: '& Optimization', level: 'Expert', value: 95 },
  { name: 'Prod Troubleshooting', sub: '& Root Cause Analysis', level: 'Advanced', value: 88 },
  { name: 'Backend Development', sub: 'PHP · JS · SQL', level: 'Advanced', value: 85 },
  { name: 'Frontend Development', sub: 'Vue · Nuxt.js · jQuery', level: 'Advanced', value: 82 },
  { name: 'ERP Integration', sub: '& API Development', level: 'Proficient', value: 70 },
]

export const techStack: string[] = [
  'PHP', 'JavaScript', 'MySQL', 'SQL Server', 'Vue.js', 'Nuxt.js', 'Vuetify',
  'Node.js', 'jQuery', 'HTML/CSS', 'Oracle ERP', 'REST API', 'Cloudflare',
  'Cron Jobs', 'Git', 'Postman',
]

export const languages: Language[] = [
  { name: 'Thai', level: 5 },
  { name: 'English', level: 3 },
]

export const stories: Story[] = [
  {
    head: 'Eliminated Tier 1/2 Dependency for Production Incidents',
    desc: 'Resolved mission-critical issues through real-time troubleshooting and direct DB fixes — cutting resolution time from hours → minutes, bypassing traditional escalation entirely.',
  },
  {
    head: 'Automated Manual Processes at Scale',
    desc: "Transformed Check Stock from manual branch audits to 24/7 automated nationwide verification; replaced Project M's manual Oracle data entry with direct ERP integration.",
  },
  {
    head: 'Self-Directed Legacy System Recovery',
    desc: 'Independently diagnosed and repaired a 2-year-old production codebase — uncovering hardcoded date logic (−1 day bug) with zero documentation or handover support.',
  },
  {
    head: 'Concurrent Multi-System Ownership',
    desc: 'Sustained engineering ownership across 5+ production systems simultaneously while maintaining 99%+ uptime for finance-industry mission-critical infrastructure.',
  },
]

export const jobs: Job[] = [
  {
    role: 'Software Engineer',
    company: 'Tungthanasin Group (Easy Money)',
    period: '2023 – Present',
    current: true,
    bullets: [
      'Architected and maintained Check Stock — automated 24/7 random stock verification across nationwide branches, eliminating manual processes.',
      'Built Project M for foreclosed asset & auction management — replaced manual Oracle data entry with direct ERP integration, clearing long-standing backlog jobs.',
      'Resolved critical In-Process system failures via Cron Job fixes, status logic corrections, and direct-to-database transaction repairs.',
      'Developed ERP Connect for bidirectional automated Oracle ERP data sync — fixed production code under live conditions with zero downtime.',
      'Managed 5+ concurrent systems while supporting RPA automation and Gemini website integration.',
    ],
  },
  {
    role: 'Backend Developer / IT Programmer',
    company: 'AdaSoft',
    period: '2021 – 2023',
    bullets: [
      'Designed and implemented full-stack web applications spanning frontend and backend development.',
      'Managed database architecture and optimization for client projects.',
      'Delivered maintenance and feature enhancements across customer portfolio.',
    ],
  },
  {
    role: 'PHP Programmer',
    company: 'Oranoss Co., Ltd.',
    period: '2020 – 2021',
    bullets: [
      'Developed POS system with CodeIgniter framework and SQL database management.',
      'Built IoT Smart Petfeeder project and mobile apps for stock & barcode management.',
    ],
  },
  {
    role: 'Internship Programmer',
    company: 'JobBKK.com',
    period: '2019 – 2020',
    bullets: [
      'Completed enterprise-level web development internship with hands-on production experience.',
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'Check Stock System',
    desc: 'Nationwide automated stock verification replacing manual branch audits — lead developer & real-time incident responder.',
    tags: ['PHP', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Vuetify', 'MySQL', 'Cron Jobs', 'Cloudflare'],
    outcome: 'Eliminated manual verification; enabled 24/7 automated random checks with immediate production troubleshooting.',
  },
  {
    name: 'Project M — Foreclosed Asset Management',
    desc: 'End-to-end auction & foreclosed asset management system with direct Oracle ERP integration.',
    tags: ['PHP', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Vuetify', 'Oracle ERP', 'SQL Server', 'API Integration'],
    outcome: 'Replaced manual data entry with automated Oracle data pulls; cleared accumulated backlog jobs.',
  },
  {
    name: 'ERP Connect',
    desc: 'Internal-ERP bridge handling bidirectional automated data synchronization under live production conditions.',
    tags: ['PHP', 'Oracle ERP', 'REST API', 'SQL'],
    outcome: 'Automated import/export workflows; resolved production code issues with zero downtime.',
  },
]

export const education: Education = {
  degree: 'B.Sc. Information Technology',
  university: 'Phranakhon Rajabhat University',
  period: '2016 – 2020',
  gpa: 'GPA 3.10',
}

// Update these with real links before publishing.
export const contacts: Contact[] = [
  { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com', icon: 'mdi-email-outline' },
  { label: 'GitHub', value: 'github.com/username', href: 'https://github.com/', icon: 'mdi-github' },
  { label: 'LinkedIn', value: 'linkedin.com/in/username', href: 'https://linkedin.com/', icon: 'mdi-linkedin' },
]

export const navItems = [
  { id: 'summary', label: 'summary' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
]
