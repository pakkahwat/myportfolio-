// All résumé content in one typed place. Edit here to update the whole site.
//
// Translatable fields use Localized ({ en, th }); render them through useT()'s
// t(). Plain strings (proper nouns — names, companies, products, tech) are left
// as-is and pass through t() unchanged, so they never get translated.
import type { Localized } from '~/composables/useT'

export interface Kpi {
  value: string
  label: Localized
}

export interface Skill {
  name: Localized
  sub: Localized
  level: Localized
  value: number
}

export interface Language {
  name: Localized
  level: number // out of 5
}

export interface Story {
  head: Localized
  desc: Localized
}

export interface Job {
  role: Localized
  company: string
  period: Localized
  current?: boolean
  bullets: Localized[]
}

export interface Project {
  name: string
  desc: Localized
  tags: string[]
  outcome: Localized
}

export interface Education {
  degree: Localized
  university: string
  period: string
  gpa: string
}

export interface Contact {
  label: Localized
  value: string
  href: string
  icon: string
}

export const profile = {
  name: 'Pakkahwat Chuesaard',
  initials: 'PC',
  title: {
    en: 'Software Engineer · Full-Stack & Production Systems',
    th: 'วิศวกรซอฟต์แวร์ · Full-Stack & ระบบ Production',
  } as Localized,
  location: 'Ayutthaya, Thailand',
  focus: 'Full-Stack · PHP · Vue · Oracle ERP',
  email: 'pakkahwat.contact@gmail.com',
  // Drop a real photo at /public/profile.jpg to replace the initials avatar.
  photo: '/profile.jpg',
}

// Phrases cycled by the Hero typewriter (type → hold → delete → next → loop).
export const roles: Localized[] = [
  profile.title,
  { en: 'Database Engineering & Optimization', th: 'วิศวกรรมและเพิ่มประสิทธิภาพฐานข้อมูล' },
  { en: 'Production Troubleshooting & Root Cause Analysis', th: 'แก้ปัญหาระบบ Production & วิเคราะห์ต้นเหตุ' },
  { en: 'Backend Developer · PHP · JS · SQL', th: 'นักพัฒนา Backend · PHP · JS · SQL' },
  { en: 'Frontend Developer · Vue · Nuxt.js', th: 'นักพัฒนา Frontend · Vue · Nuxt.js' },
  { en: 'Oracle ERP Integration & APIs', th: 'เชื่อมต่อ Oracle ERP & APIs' },
]

export const summary: Localized = {
  en: 'Software Engineer with 5 years of experience spanning full-stack development and technical support. Specializes in production troubleshooting, database optimization, and mission-critical system maintenance — cutting incident resolution from hours to minutes through direct database intervention and real-time root cause analysis. Operates across finance and pawnshop industries with deep ownership of multiple concurrent production systems.',
  th: 'วิศวกรซอฟต์แวร์ประสบการณ์ 5 ปี ครอบคลุมงานพัฒนา full-stack และ technical support เชี่ยวชาญการแก้ปัญหาระบบ production การเพิ่มประสิทธิภาพฐานข้อมูล และการดูแลระบบที่สำคัญต่อธุรกิจ — ลดเวลาแก้ไขเหตุการณ์จากหลักชั่วโมงเหลือหลักนาที ด้วยการเข้าแก้ที่ฐานข้อมูลโดยตรงและวิเคราะห์ต้นเหตุแบบเรียลไทม์ ดูแลระบบ production หลายตัวพร้อมกันในอุตสาหกรรมการเงินและโรงรับจำนำ',
}

export const kpis: Kpi[] = [
  { value: '5', label: { en: 'Yrs Exp', th: 'ปีประสบการณ์' } },
  { value: '5+', label: { en: 'Systems Owned', th: 'ระบบที่ดูแล' } },
  { value: '99%+', label: { en: 'Uptime SLA', th: 'Uptime SLA' } },
  { value: 'hrs→min', label: { en: 'Incident Time', th: 'เวลาแก้เหตุ' } },
]

export const skills: Skill[] = [
  {
    name: { en: 'Database Engineering', th: 'วิศวกรรมฐานข้อมูล' },
    sub: { en: '& Optimization', th: '& เพิ่มประสิทธิภาพ' },
    level: { en: 'Expert', th: 'เชี่ยวชาญ' },
    value: 95,
  },
  {
    name: { en: 'Prod Troubleshooting', th: 'แก้ปัญหา Production' },
    sub: { en: '& Root Cause Analysis', th: '& วิเคราะห์ต้นเหตุ' },
    level: { en: 'Advanced', th: 'ขั้นสูง' },
    value: 88,
  },
  {
    name: { en: 'Backend Development', th: 'พัฒนา Backend' },
    sub: 'PHP · JS · SQL',
    level: { en: 'Advanced', th: 'ขั้นสูง' },
    value: 85,
  },
  {
    name: { en: 'Frontend Development', th: 'พัฒนา Frontend' },
    sub: 'Vue · Nuxt.js · jQuery',
    level: { en: 'Advanced', th: 'ขั้นสูง' },
    value: 82,
  },
  {
    name: { en: 'ERP Integration', th: 'เชื่อมต่อ ERP' },
    sub: { en: '& API Development', th: '& พัฒนา API' },
    level: { en: 'Proficient', th: 'ชำนาญ' },
    value: 70,
  },
]

export const techStack: string[] = [
  'PHP', 'JavaScript', 'MySQL', 'SQL Server', 'Vue.js', 'Nuxt.js', 'Vuetify',
  'Node.js', 'jQuery', 'HTML/CSS', 'Oracle ERP', 'REST API', 'Cloudflare',
  'Cron Jobs', 'Git', 'Postman',
]

export const languages: Language[] = [
  { name: { en: 'Thai', th: 'ไทย' }, level: 5 },
  { name: { en: 'English', th: 'อังกฤษ' }, level: 3 },
]

export const stories: Story[] = [
  {
    head: {
      en: 'Eliminated Tier 1/2 Dependency for Production Incidents',
      th: 'ตัดการพึ่งพา Tier 1/2 ในการแก้เหตุ Production',
    },
    desc: {
      en: 'Resolved mission-critical issues through real-time troubleshooting and direct DB fixes — cutting resolution time from hours → minutes, bypassing traditional escalation entirely.',
      th: 'แก้ปัญหาที่สำคัญต่อธุรกิจผ่านการ troubleshoot แบบเรียลไทม์และแก้ที่ DB โดยตรง — ลดเวลาแก้จากหลักชั่วโมง → หลักนาที ข้ามขั้นตอน escalation แบบเดิมไปเลย',
    },
  },
  {
    head: {
      en: 'Automated Manual Processes at Scale',
      th: 'ทำงานแมนนวลให้เป็นอัตโนมัติในวงกว้าง',
    },
    desc: {
      en: "Transformed Check Stock from manual branch audits to 24/7 automated nationwide verification; replaced Project M's manual Oracle data entry with direct ERP integration.",
      th: 'เปลี่ยน Check Stock จากการตรวจสาขาด้วยมือ เป็นการตรวจสอบอัตโนมัติทั่วประเทศ 24/7; แทนการคีย์ข้อมูล Oracle ด้วยมือของ Project M ด้วยการเชื่อม ERP โดยตรง',
    },
  },
  {
    head: {
      en: 'Self-Directed Legacy System Recovery',
      th: 'กู้ระบบเดิมด้วยตัวเอง',
    },
    desc: {
      en: 'Independently diagnosed and repaired a 2-year-old production codebase — uncovering hardcoded date logic (−1 day bug) with zero documentation or handover support.',
      th: 'วินิจฉัยและซ่อม codebase production อายุ 2 ปีด้วยตัวเอง — เจอ logic วันที่ที่ hardcode ไว้ (บั๊กลบ 1 วัน) โดยไม่มีเอกสารหรือการส่งต่องานใดๆ',
    },
  },
  {
    head: {
      en: 'Concurrent Multi-System Ownership',
      th: 'ดูแลหลายระบบพร้อมกัน',
    },
    desc: {
      en: 'Sustained engineering ownership across 5+ production systems simultaneously while maintaining 99%+ uptime for finance-industry mission-critical infrastructure.',
      th: 'ดูแลระบบ production มากกว่า 5 ตัวพร้อมกันอย่างต่อเนื่อง พร้อมรักษา uptime 99%+ ให้โครงสร้างพื้นฐานที่สำคัญในอุตสาหกรรมการเงิน',
    },
  },
]

export const jobs: Job[] = [
  {
    role: { en: 'Software Engineer', th: 'วิศวกรซอฟต์แวร์' },
    company: 'Tungthanasin Group (Easy Money)',
    period: { en: '2023 – Present', th: '2023 – ปัจจุบัน' },
    current: true,
    bullets: [
      {
        en: 'Architected and maintained Check Stock — automated 24/7 random stock verification across nationwide branches, eliminating manual processes.',
        th: 'ออกแบบและดูแล Check Stock — ระบบตรวจสอบสต็อกแบบสุ่มอัตโนมัติ 24/7 ทั่วทุกสาขาทั้งประเทศ ขจัดงานแมนนวล',
      },
      {
        en: 'Built Project M for foreclosed asset & auction management — replaced manual Oracle data entry with direct ERP integration, clearing long-standing backlog jobs.',
        th: 'สร้าง Project M สำหรับจัดการทรัพย์สินยึดและการประมูล — แทนการคีย์ข้อมูล Oracle ด้วยมือด้วยการเชื่อม ERP โดยตรง เคลียร์งานค้างที่สะสมมานาน',
      },
      {
        en: 'Resolved critical In-Process system failures via Cron Job fixes, status logic corrections, and direct-to-database transaction repairs.',
        th: 'แก้ปัญหาระบบ In-Process ที่สำคัญ ผ่านการแก้ Cron Job แก้ logic สถานะ และซ่อม transaction ที่ฐานข้อมูลโดยตรง',
      },
      {
        en: 'Developed ERP Connect for bidirectional automated Oracle ERP data sync — fixed production code under live conditions with zero downtime.',
        th: 'พัฒนา ERP Connect สำหรับ sync ข้อมูล Oracle ERP สองทางอัตโนมัติ — แก้โค้ด production ภายใต้สภาพใช้งานจริงโดยไม่มี downtime',
      },
      {
        en: 'Managed 5+ concurrent systems while supporting RPA automation and Gemini website integration.',
        th: 'ดูแลระบบมากกว่า 5 ตัวพร้อมกัน พร้อมสนับสนุนงานอัตโนมัติ RPA และการเชื่อมต่อเว็บไซต์ Gemini',
      },
    ],
  },
  {
    role: { en: 'Backend Developer / IT Programmer', th: 'นักพัฒนา Backend / โปรแกรมเมอร์ IT' },
    company: 'AdaSoft',
    period: '2021 – 2023',
    bullets: [
      {
        en: 'Designed and implemented full-stack web applications spanning frontend and backend development.',
        th: 'ออกแบบและพัฒนาเว็บแอป full-stack ครอบคลุมทั้งงาน frontend และ backend',
      },
      {
        en: 'Managed database architecture and optimization for client projects.',
        th: 'ดูแลสถาปัตยกรรมและการเพิ่มประสิทธิภาพฐานข้อมูลให้โปรเจกต์ลูกค้า',
      },
      {
        en: 'Delivered maintenance and feature enhancements across customer portfolio.',
        th: 'ดูแลรักษาและเพิ่มฟีเจอร์ให้กับงานลูกค้าหลายราย',
      },
    ],
  },
  {
    role: { en: 'PHP Programmer', th: 'โปรแกรมเมอร์ PHP' },
    company: 'Oranoss Co., Ltd.',
    period: '2020 – 2021',
    bullets: [
      {
        en: 'Developed POS system with CodeIgniter framework and SQL database management.',
        th: 'พัฒนาระบบ POS ด้วย framework CodeIgniter พร้อมจัดการฐานข้อมูล SQL',
      },
      {
        en: 'Built IoT Smart Petfeeder project and mobile apps for stock & barcode management.',
        th: 'สร้างโปรเจกต์ IoT Smart Petfeeder และแอปมือถือสำหรับจัดการสต็อกและบาร์โค้ด',
      },
    ],
  },
  {
    role: { en: 'Internship Programmer', th: 'นักศึกษาฝึกงาน (Programmer)' },
    company: 'JobBKK.com',
    period: '2019 – 2020',
    bullets: [
      {
        en: 'Completed enterprise-level web development internship with hands-on production experience.',
        th: 'ฝึกงานพัฒนาเว็บระดับองค์กร ได้ประสบการณ์ทำงานจริงกับระบบ production',
      },
    ],
  },
]

export const projects: Project[] = [
  {
    name: 'Check Stock System',
    desc: {
      en: 'Nationwide automated stock verification replacing manual branch audits — lead developer & real-time incident responder.',
      th: 'ระบบตรวจสอบสต็อกอัตโนมัติทั่วประเทศ แทนการตรวจสาขาด้วยมือ — เป็น lead developer และผู้แก้เหตุแบบเรียลไทม์',
    },
    tags: ['PHP', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Vuetify', 'MySQL', 'Cron Jobs', 'Cloudflare'],
    outcome: {
      en: 'Eliminated manual verification; enabled 24/7 automated random checks with immediate production troubleshooting.',
      th: 'ขจัดการตรวจด้วยมือ; เปิดให้ตรวจสุ่มอัตโนมัติ 24/7 พร้อมแก้ปัญหา production ได้ทันที',
    },
  },
  {
    name: 'Project M — Foreclosed Asset Management',
    desc: {
      en: 'End-to-end auction & foreclosed asset management system with direct Oracle ERP integration.',
      th: 'ระบบจัดการการประมูลและทรัพย์สินยึดแบบครบวงจร เชื่อมต่อ Oracle ERP โดยตรง',
    },
    tags: ['PHP', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Vuetify', 'Oracle ERP', 'SQL Server', 'API Integration'],
    outcome: {
      en: 'Replaced manual data entry with automated Oracle data pulls; cleared accumulated backlog jobs.',
      th: 'แทนการคีย์ข้อมูลด้วยมือด้วยการดึงข้อมูล Oracle อัตโนมัติ; เคลียร์งานค้างที่สะสม',
    },
  },
  {
    name: 'ERP Connect',
    desc: {
      en: 'Internal-ERP bridge handling bidirectional automated data synchronization under live production conditions.',
      th: 'สะพานเชื่อมระบบภายในกับ ERP จัดการ sync ข้อมูลสองทางอัตโนมัติภายใต้สภาพ production จริง',
    },
    tags: ['PHP', 'Oracle ERP', 'REST API', 'SQL'],
    outcome: {
      en: 'Automated import/export workflows; resolved production code issues with zero downtime.',
      th: 'ทำ workflow import/export อัตโนมัติ; แก้ปัญหาโค้ด production โดยไม่มี downtime',
    },
  },
]

export const education: Education = {
  degree: { en: 'B.Sc. Information Technology', th: 'วท.บ. เทคโนโลยีสารสนเทศ' },
  university: 'Phranakhon Rajabhat University',
  period: '2016 – 2020',
  gpa: 'GPA 3.10',
}

export const contacts: Contact[] = [
  { label: { en: 'Email', th: 'อีเมล' }, value: profile.email, href: `mailto:${profile.email}`, icon: 'mdi-email-outline' },
  { label: 'GitHub', value: 'github.com/pakkahwat', href: 'https://github.com/pakkahwat', icon: 'mdi-github' },
  { label: 'LinkedIn', value: 'linkedin.com/in/pakkahwat-chuesaard', href: 'https://www.linkedin.com/in/pakkahwat-chuesaard-1ba7202b4/', icon: 'mdi-linkedin' },
]

// Prose that lives directly in component templates (not part of the data above).
export const ui = {
  available: { en: 'available', th: 'ว่างรับงาน' } as Localized,
  contactHead1: { en: 'Open to new challenges &', th: 'พร้อมรับงานท้าทายใหม่ๆ และงานระดับ' } as Localized,
  contactHead2: { en: 'work.', th: '' } as Localized,
  contactSub: {
    en: "Have a system that needs building, fixing, or rescuing? Let's talk.",
    th: 'มีระบบที่ต้องสร้าง แก้ไข หรือกู้คืน? มาคุยกันได้เลย',
  } as Localized,
}

// Nav + code-style mono labels are kept in English on purpose — they are part
// of the terminal aesthetic, not prose.
export const navItems = [
  { id: 'summary', label: 'summary' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
]
