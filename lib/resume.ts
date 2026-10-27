// All résumé content in one typed place. Edit here to update the whole site.
//
// Translatable fields use Localized ({ en, th }); render them through useT()'s
// t(). Plain strings (proper nouns — names, companies, products, tech) are left
// as-is and pass through t() unchanged, so they never get translated.
import type { Localized } from './useT'

export interface Kpi {
  value: string
  label: Localized
}

export interface Skill {
  name: Localized
  sub: Localized
  level: Localized
}

export interface TechGroup {
  name: Localized
  items: string[]
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

export interface ProjectLink {
  kind: 'live' | 'github'
  href: string
}

// shipped = personal apps that are live today · work = company/client systems
// (code not public) · early = internship/university-era work, shown compact.
export type ProjectGroup = 'shipped' | 'work' | 'early'

export interface Project {
  name: Localized
  group: ProjectGroup
  // Small status pill on the card ("live", "internal", …).
  badge?: Localized
  // Mono meta line: where / when.
  meta: Localized
  desc: Localized
  // One headline number for shipped cards.
  highlight?: { value: string; label: Localized }
  tags: string[]
  outcome?: Localized
  links?: ProjectLink[]
  // Card artwork: a browser-framed screenshot, the animated ID-scan phone, or an icon.
  visual?: { kind: 'shot'; src: string; host: string } | { kind: 'scan' }
  icon?: 'scan' | 'gavel' | 'sync' | 'receipt' | 'star' | 'cpu' | 'phone'
  // Bento size inside its group: feature = 2/3 width, side = 1/3, wide = full row.
  layout?: 'feature' | 'side' | 'wide'
}

export interface ProjectGroupInfo {
  id: ProjectGroup
  label: Localized
  sub: Localized
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
  icon: 'mail' | 'github' | 'linkedin'
}

export const profile = {
  // The person's name in each language (not a translation — the real Thai name).
  name: { en: 'Pakkahwat Chuesaard', th: 'ภควัต เชื้อสะอาด' } as Localized,
  initials: 'PC',
  // Job title — kept in English (a job position, not translated).
  title: 'Software Engineer · Full-Stack & Production Systems' as Localized,
  location: 'Ayutthaya, Thailand',
  // Same as the résumé header; keep it short — the chip doesn't wrap on phones.
  focus: 'Full-Stack · PHP · Vue · Oracle ERP',
  email: 'pakkahwat.contact@gmail.com',
  // Drop a real photo at /public/profile.jpg to replace the initials avatar.
  photo: '/profile.jpg',
}

// Shown in the footer. Bump whenever the content changes.
export const lastUpdated: Localized = { en: 'Oct 2026', th: 'ต.ค. 2026' }

// Public copies of the résumé (no birth date / home address / phone — this
// site is public). Rebuilt from the private CV with scripts/resume/.
export const resumeFiles = [
  { lang: 'EN', href: '/resume/pakkahwat-chuesaard-resume-en.pdf' },
  { lang: 'TH', href: '/resume/pakkahwat-chuesaard-resume-th.pdf' },
] as const

export const summary: Localized = {
  en: 'Software Engineer with 5 years of experience spanning full-stack development and technical support. Specializes in production troubleshooting, database optimization, and mission-critical system maintenance — cutting incident resolution from hours to minutes through hands-on root cause analysis on live systems. Operates across finance and pawnshop industries with deep ownership of multiple concurrent production systems. In 2026 I also shipped three public web apps of my own: browser-only PDF tools on WebAssembly, an equipment lending system with on-device ID-card OCR that a real community uses every day, and an AI-vs-human football prediction league.',
  th: 'Software Engineer ประสบการณ์ 5 ปี ครอบคลุมงานพัฒนา full-stack และ technical support เชี่ยวชาญการแก้ปัญหาระบบ production การเพิ่มประสิทธิภาพฐานข้อมูล และการดูแลระบบที่สำคัญต่อธุรกิจ — ลดเวลาแก้ไขเหตุการณ์จากหลักชั่วโมงเหลือหลักนาที ด้วยการไล่หาต้นตอจากข้อมูลจริงบนระบบที่ใช้งานอยู่ ดูแลระบบ production หลายตัวพร้อมกันในอุตสาหกรรมการเงินและโรงรับจำนำ ปี 2026 ยังสร้างเว็บแอปของตัวเองที่เปิดใช้งานจริง 3 ตัว ได้แก่ เครื่องมือ PDF ที่ทำงานในเบราว์เซอร์ทั้งหมดด้วย WebAssembly, ระบบยืม-คืนอุปกรณ์ที่อ่านบัตรประชาชนในเครื่องซึ่งชุมชนใช้งานทุกวัน และลีกทายผลฟุตบอล AI ปะทะคน',
}

export const kpis: Kpi[] = [
  { value: '5', label: { en: 'Years of experience', th: 'ปีประสบการณ์' } },
  { value: '5+', label: { en: 'Production systems owned', th: 'ระบบ production ที่ดูแล' } },
  { value: '99%+', label: { en: 'Uptime kept', th: 'Uptime ที่รักษาไว้' } },
  { value: 'hrs→min', label: { en: 'Incident fix time', th: 'เวลาแก้เหตุขัดข้อง' } },
]

// Skill names / sub-labels / levels are technical terms — kept in English.
export const skills: Skill[] = [
  { name: 'Database Engineering', sub: '& Optimization', level: 'Expert' },
  { name: 'Prod Troubleshooting', sub: '& Root Cause Analysis', level: 'Advanced' },
  { name: 'Backend Development', sub: 'PHP · JS · SQL', level: 'Advanced' },
  { name: 'System Analysis & Design', sub: 'Requirements · ERD · Docs', level: 'Advanced' },
  { name: 'Frontend Development', sub: 'Vue · Nuxt · Next.js · React', level: 'Advanced' },
  { name: 'AI / LLM Integration', sub: 'Vercel AI SDK · Gemini', level: 'Advanced' },
  { name: 'Data Integrity & Security', sub: 'RLS · Idempotent Jobs', level: 'Advanced' },
  { name: 'Browser-Native Apps', sub: 'WebAssembly · Workers · OCR', level: 'Proficient' },
  { name: 'ERP Integration', sub: '& API Development', level: 'Proficient' },
]

export const techGroups: TechGroup[] = [
  { name: 'Backend', items: ['PHP', 'Node.js', 'TypeScript', 'JavaScript', 'REST API', 'Cron Jobs'] },
  { name: 'Frontend', items: ['Next.js', 'React', 'Vue.js', 'Nuxt.js', 'Vuetify', 'Tailwind CSS', 'jQuery', 'HTML/CSS'] },
  { name: { en: 'Data & ERP', th: 'ข้อมูลและ ERP' }, items: ['MySQL', 'SQL Server', 'PostgreSQL', 'Oracle ERP', 'Drizzle ORM'] },
  { name: { en: 'AI & in-browser', th: 'AI และงานในเบราว์เซอร์' }, items: ['Vercel AI SDK', 'Gemini API', 'WebAssembly', 'Pyodide', 'Web Workers', 'Tesseract.js', 'ONNX Runtime Web'] },
  { name: { en: 'Testing & delivery', th: 'ทดสอบและส่งมอบ' }, items: ['Playwright', 'Vitest', 'GitHub Actions', 'GitLab CI/CD', 'Docker', 'Git'] },
  { name: { en: 'Platforms & tools', th: 'แพลตฟอร์มและเครื่องมือ' }, items: ['Cloudflare', 'Vercel', 'Neon', 'Auth.js', 'LINE Messaging API', 'Postman', 'Jira', 'ClickUp'] },
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
    role: 'Software Engineer',
    company: 'Tungthanasin Group (Easy Money)',
    period: { en: '2023 – Aug 2026', th: '2023 – ส.ค. 2026' },
    bullets: [
      {
        en: 'Architected and maintained Check Stock — automated 24/7 random stock verification across nationwide branches, eliminating manual processes.',
        th: 'ออกแบบและดูแล Check Stock — ระบบสุ่มตรวจสต็อกอัตโนมัติ 24/7 ทั่วทุกสาขาทั้งประเทศ ขจัดงานแมนนวลทั้งหมด',
      },
      {
        en: 'Built Project M for foreclosed asset & auction management — replaced manual Oracle data entry with direct ERP integration, clearing long-standing backlog jobs.',
        th: 'สร้าง Project M สำหรับจัดการทรัพย์สินหลุดจำนำและการประมูล — แทนการคีย์ข้อมูล Oracle ด้วยมือด้วยการเชื่อม ERP โดยตรง เคลียร์งานค้างที่สะสมมานาน',
      },
      {
        en: 'Resolved critical In-Process system failures — traced root causes across Cron Jobs, status logic, and stuck transactions, then recovered every affected record.',
        th: 'แก้ปัญหาระบบ In-Process — ไล่หาต้นตอตั้งแต่ Cron Job, logic สถานะ ไปจนถึง transaction ที่ค้าง แล้วกู้รายการที่ได้รับผลกระทบกลับมาครบ',
      },
      {
        en: 'Developed ERP Connect for bidirectional automated Oracle ERP data sync — shipped changes to a system in active use with zero downtime.',
        th: 'พัฒนา ERP Connect สำหรับ sync ข้อมูล Oracle ERP สองทิศทางอัตโนมัติ — ส่งงานขึ้นระบบที่ใช้งานจริงอยู่ได้โดยไม่มี downtime',
      },
      {
        en: 'Set up a GitLab CI/CD pipeline where Gemini reviews the code on every merge request.',
        th: 'ตั้ง pipeline บน GitLab CI/CD ให้ Gemini ช่วย review code ในทุก merge request',
      },
      {
        en: 'Managed 5+ concurrent systems while supporting RPA automation and Gemini website integration.',
        th: 'ดูแลระบบมากกว่า 5 ตัวพร้อมกัน พร้อมสนับสนุนงานอัตโนมัติ RPA และการเชื่อมต่อเว็บไซต์ Gemini',
      },
    ],
  },
  {
    role: 'Backend Developer / IT Programmer',
    company: 'AdaSoft',
    period: '2021 – 2023',
    bullets: [
      {
        en: 'Developed a POS system with the CodeIgniter framework for clients including PTT FitAuto and KingpowerClick.',
        th: 'พัฒนาระบบ POS ด้วย CodeIgniter Framework ให้ลูกค้า เช่น PTT FitAuto และ KingpowerClick',
      },
      {
        en: 'Built product-presentation websites — Orafon, Skzicthailand, Kmcgasia.com — covering full frontend and backend.',
        th: 'พัฒนาเว็บไซต์นำเสนอสินค้า Orafon, Skzicthailand, Kmcgasia.com ครอบคลุมทั้ง frontend และ backend',
      },
      {
        en: 'Managed database architecture and performance optimization for client projects.',
        th: 'ออกแบบโครงสร้างฐานข้อมูลและปรับแต่งประสิทธิภาพให้โปรเจกต์ลูกค้า',
      },
      {
        en: 'Delivered maintenance and feature enhancements across the customer portfolio.',
        th: 'ดูแลรักษาและพัฒนาฟีเจอร์เว็บไซต์ให้ลูกค้าหลายราย',
      },
    ],
  },
  {
    role: 'IT Programmer',
    company: 'Oranoss Co., Ltd.',
    period: { en: 'Mar 2020 – May 2021', th: 'มี.ค. 2020 – พ.ค. 2021' },
    bullets: [
      {
        en: 'Designed website frontend, backend, and database architecture for client projects.',
        th: 'ออกแบบเว็บไซต์ฝั่ง frontend และ backend รวมถึงโครงสร้างฐานข้อมูลให้โปรเจกต์ลูกค้า',
      },
      {
        en: 'Developed frontend and backend systems end-to-end.',
        th: 'พัฒนาระบบ frontend และ backend ตั้งแต่ต้นจนจบ',
      },
      {
        en: 'Maintained, debugged, and improved client websites on an ongoing basis.',
        th: 'สนับสนุน แก้ไข และปรับปรุงเว็บไซต์ลูกค้าอย่างต่อเนื่อง',
      },
    ],
  },
  {
    role: 'Backend Developer (Internship)',
    company: 'JobBKK.com',
    period: { en: 'Nov 2019 – Feb 2020', th: 'พ.ย. 2019 – ก.พ. 2020' },
    bullets: [
      {
        en: 'Supported, debugged, and improved website features on a case-by-case basis.',
        th: 'สนับสนุน แก้ไข และปรับปรุงเว็บไซต์เป็นกรณีไป (case by case)',
      },
    ],
  },
]

export const projectGroups: ProjectGroupInfo[] = [
  {
    id: 'shipped',
    label: { en: 'Live apps', th: 'แอปที่ใช้งานจริง' },
    sub: {
      en: 'Personal apps — designed, built and running in production by me',
      th: 'แอปของตัวเอง — ออกแบบ สร้าง และดูแลจนใช้งานจริง',
    },
  },
  {
    id: 'work',
    label: { en: 'Production systems', th: 'ระบบ production' },
    sub: {
      en: 'Company & client systems — code is private, happy to walk you through them',
      th: 'ระบบของบริษัทและลูกค้า — เปิดโค้ดไม่ได้ แต่เล่ารายละเอียดได้',
    },
  },
  {
    id: 'early',
    label: { en: 'Earlier work', th: 'งานยุคแรก' },
    sub: { en: 'Where it started, 2019 – 2021', th: 'จุดเริ่มต้น ปี 2019 – 2021' },
  },
]

const live: Localized = { en: 'live', th: 'ใช้งานจริง' }
const internal: Localized = { en: 'internal', th: 'ระบบภายใน' }

export const projects: Project[] = [
  // ── shipped ────────────────────────────────────────────────────────────
  {
    name: 'PDF Tools — Browser-Only PDF Toolkit',
    group: 'shipped',
    badge: live,
    meta: { en: 'Personal · 2026', th: 'ส่วนตัว · 2026' },
    desc: {
      en: '12 PDF tools — merge, split, compress, protect, PDF→Word and more — that run entirely in the browser. Files never leave the user’s device, so there is no server bill and nothing to leak.',
      th: 'เครื่องมือ PDF 12 อย่าง — รวม แยก บีบอัด ใส่รหัส แปลง PDF→Word ฯลฯ — ทำงานในเบราว์เซอร์ทั้งหมด ไฟล์ไม่ออกจากเครื่องผู้ใช้ จึงไม่มีค่าเซิร์ฟเวอร์และไม่มีข้อมูลให้รั่ว',
    },
    highlight: {
      value: '99.0',
      label: { en: 'Thai PDF→Word visual fidelity', th: 'คะแนนความเหมือนต้นฉบับ PDF→Word ไทย' },
    },
    tags: ['Next.js 16', 'TypeScript', 'WebAssembly', 'Pyodide', 'mupdf.js', 'Web Workers', 'Playwright', 'GitHub Actions'],
    outcome: {
      en: 'Runs pdf2docx + PyMuPDF in the browser on Pyodide and inserts Intl.Segmenter word breaks so Word wraps Thai lines exactly like the source PDF — a Thai form went from 49.7 to 99.0 fidelity.',
      th: 'รัน pdf2docx + PyMuPDF ในเบราว์เซอร์ด้วย Pyodide และแทรกจุดตัดคำไทยด้วย Intl.Segmenter ให้ Word ตัดบรรทัดตรงกับ PDF ต้นฉบับ — แบบฟอร์มภาษาไทยขยับจาก 49.7 เป็น 99.0 คะแนน',
    },
    visual: { kind: 'shot', src: '/projects/pdf.webp', host: 'pdf.devda.fyi' },
    layout: 'feature',
    links: [
      { kind: 'live', href: 'https://pdf.devda.fyi' },
      { kind: 'github', href: 'https://github.com/pakkahwat/pdf-tools' },
    ],
  },
  {
    name: { en: 'Community Equipment Lending', th: 'ระบบยืม-คืนอุปกรณ์ชุมชน' },
    group: 'shipped',
    badge: { en: 'in daily use', th: 'ชุมชนใช้ทุกวัน' },
    visual: { kind: 'scan' },
    layout: 'side',
    meta: { en: 'Personal · 2026', th: 'ส่วนตัว · 2026' },
    desc: {
      en: 'Multi-tenant lending system for tables, chairs and tents: staff roles with approval, inventory, printable A4 loan documents, and QR self-service borrowing with no login — designed for low-tech users on a phone.',
      th: 'ระบบยืม-คืนโต๊ะ เก้าอี้ เต็นท์ สำหรับหลายชุมชน มีสิทธิ์เจ้าหน้าที่แบบอนุมัติ คลังอุปกรณ์ เอกสารยืม A4 พร้อมพิมพ์ และยืมเองผ่าน QR โดยไม่ต้องล็อกอิน — ออกแบบให้คนที่ไม่ถนัดเทคโนโลยีใช้บนมือถือได้',
    },
    highlight: {
      value: '0',
      label: { en: 'ID-card photos sent off the phone', th: 'ภาพบัตรที่ถูกส่งออกจากมือถือ' },
    },
    tags: ['Next.js 16', 'TypeScript', 'PostgreSQL (Neon)', 'Drizzle ORM', 'Tesseract.js', 'ONNX Runtime Web', 'LINE Messaging API', 'Playwright'],
    outcome: {
      en: 'Thai ID cards are read on-device (Tesseract.js + PaddleOCR on ONNX Runtime Web); ID photos and signatures are deleted automatically once every item is returned (PDPA), and staff get LINE Flex alerts for each loan and return.',
      th: 'อ่านบัตรประชาชนในเครื่อง (Tesseract.js + PaddleOCR บน ONNX Runtime Web) ลบภาพบัตรและลายเซ็นอัตโนมัติเมื่อคืนครบ (PDPA) และแจ้งเจ้าหน้าที่ผ่าน LINE Flex ทุกครั้งที่ยืม-คืน',
    },
  },
  {
    name: 'Pundit — AI vs Human Prediction League',
    group: 'shipped',
    badge: live,
    meta: { en: 'Personal · 2026', th: 'ส่วนตัว · 2026' },
    desc: {
      en: 'Football prediction league where AI agents compete against people under identical rules and deadlines, plus a daily AI-written column from live match data. Scores, tables and every pick after kickoff are public; leagues get Discord alerts.',
      th: 'ลีกทายผลฟุตบอลที่ AI ลงแข่งกับคนจริงภายใต้กติกาและเส้นตายเดียวกัน พร้อมคอลัมน์รายวันที่ AI เขียนจากข้อมูลแมตช์จริง ผลสด ตารางคะแนน และคำทายทุกคนหลังคิกออฟเปิดให้ดูได้โดยไม่ต้องล็อกอิน และแจ้งเตือนลีกผ่าน Discord',
    },
    highlight: {
      value: '9',
      label: { en: 'AI players competing with people', th: 'ผู้เล่น AI ที่ลงแข่งกับคน' },
    },
    visual: { kind: 'shot', src: '/projects/pundit.webp', host: 'pundit.devda.fyi' },
    layout: 'wide',
    tags: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Auth.js', 'Vercel AI SDK', 'Gemini', 'Tailwind CSS'],
    outcome: {
      en: 'Fairness enforced in the database, not the UI — kickoff lockout against Postgres now(), Row-Level Security hiding picks until reveal, and idempotent scoring that re-runs safely when results are revised.',
      th: 'บังคับความยุติธรรมที่ฐานข้อมูล ไม่ใช่แค่ซ่อนใน UI — ปิดรับทายด้วย now() ของ Postgres, Row-Level Security กันเห็นคำทายคนอื่นก่อนเปิด และคิดคะแนนแบบรันซ้ำได้ไม่เพี้ยนแม้ผลแข่งถูกแก้ย้อนหลัง',
    },
    links: [
      { kind: 'live', href: 'https://pundit.devda.fyi' },
      { kind: 'github', href: 'https://github.com/pakkahwat/pundit' },
    ],
  },

  // ── production work ───────────────────────────────────────────────────
  {
    name: 'Check Stock System',
    icon: 'scan',
    group: 'work',
    badge: internal,
    meta: 'Easy Money · 2023 – 2026',
    desc: {
      en: 'Nationwide automated stock verification replacing manual branch audits — lead developer & real-time incident responder.',
      th: 'ระบบสุ่มตรวจสต็อกอัตโนมัติทั่วประเทศ แทนการตรวจนับด้วยมือในแต่ละสาขา — เป็น lead developer และผู้แก้เหตุแบบเรียลไทม์',
    },
    tags: ['PHP', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Vuetify', 'MySQL', 'Cron Jobs', 'Cloudflare'],
    outcome: {
      en: 'Eliminated manual verification; enabled 24/7 automated random checks with immediate production troubleshooting.',
      th: 'ขจัดการตรวจด้วยมือ; เปิดให้สุ่มตรวจอัตโนมัติ 24/7 พร้อมแก้ปัญหา production ได้ทันที',
    },
  },
  {
    name: 'Project M — Foreclosed Asset Management',
    icon: 'gavel',
    group: 'work',
    badge: internal,
    meta: 'Easy Money · 2023 – 2026',
    desc: {
      en: 'End-to-end auction & foreclosed asset management system with direct Oracle ERP integration, designed from the business process up.',
      th: 'ระบบจัดการและประมูลทรัพย์สินหลุดจำนำแบบครบวงจร เชื่อม Oracle ERP โดยตรง ออกแบบตั้งแต่กระบวนการทำงานจริง',
    },
    tags: ['PHP', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Vuetify', 'Oracle ERP', 'SQL Server', 'API Integration'],
    outcome: {
      en: 'Replaced manual data entry with automated Oracle data pulls; cleared accumulated backlog jobs.',
      th: 'แทนการคีย์ข้อมูลด้วยมือด้วยการดึงข้อมูล Oracle อัตโนมัติ; เคลียร์งานค้างที่สะสมทั้งหมด',
    },
  },
  {
    name: 'ERP Connect',
    icon: 'sync',
    group: 'work',
    badge: internal,
    meta: 'Easy Money · 2023 – 2026',
    desc: {
      en: 'Internal-ERP bridge handling bidirectional automated data synchronization under live production conditions.',
      th: 'สะพานเชื่อมระบบภายในกับ ERP จัดการ sync ข้อมูลสองทิศทางอัตโนมัติภายใต้สภาพ production จริง',
    },
    tags: ['PHP', 'Oracle ERP', 'REST API', 'SQL'],
    outcome: {
      en: 'Automated import/export workflows; delivered changes to a system in active use with zero downtime.',
      th: 'ทำ workflow import/export อัตโนมัติ; ปรับปรุงระบบที่ใช้งานจริงอยู่ได้โดยไม่มี downtime',
    },
  },
  {
    name: 'POS System — PTT FitAuto & KingpowerClick',
    icon: 'receipt',
    group: 'work',
    badge: { en: 'client', th: 'งานลูกค้า' },
    meta: 'AdaSoft · 2021 – 2023',
    desc: {
      en: 'Full-featured point-of-sale system for enterprise clients, built with CodeIgniter — product management, orders and sales reporting.',
      th: 'ระบบ Point-of-Sale ครบวงจรสำหรับลูกค้าองค์กร พัฒนาด้วย CodeIgniter รองรับการจัดการสินค้า ออเดอร์ และรายงานยอดขาย',
    },
    tags: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'HTML/CSS'],
    outcome: {
      en: 'Deployed for national enterprise clients PTT FitAuto and KingpowerClick.',
      th: 'ใช้งานจริงกับลูกค้าระดับประเทศ PTT FitAuto และ KingpowerClick',
    },
  },

  // ── earlier work ──────────────────────────────────────────────────────
  {
    name: 'Allreview.th',
    icon: 'star',
    group: 'early',
    meta: { en: 'Client project', th: 'งานลูกค้า' },
    desc: {
      en: 'Full-stack product review platform — user accounts, review posting and an admin panel.',
      th: 'เว็บรีวิวสินค้าแบบ full-stack — ระบบสมาชิก โพสต์รีวิว และหลังบ้านแอดมิน',
    },
    tags: ['PHP', 'CodeIgniter', 'MySQL'],
  },
  {
    name: 'Smart PetFeeder',
    icon: 'cpu',
    group: 'early',
    badge: { en: 'senior project', th: 'โปรเจกต์จบ' },
    meta: { en: 'University · 2020', th: 'มหาวิทยาลัย · 2020' },
    desc: {
      en: 'IoT pet feeder with hardware-level control, scheduled and monitored from an Android app and a web dashboard.',
      th: 'เครื่องให้อาหารสัตว์เลี้ยง IoT ควบคุม hardware โดยตรง ตั้งเวลาและดูสถานะผ่านแอป Android และหน้าเว็บ',
    },
    tags: ['Arduino', 'Android', 'PHP', 'MySQL'],
  },
  {
    name: 'Stock & Barcode App',
    icon: 'phone',
    group: 'early',
    meta: { en: 'Android app', th: 'แอป Android' },
    desc: {
      en: 'Inventory app with barcode scanning that replaced manual stock records with real-time mobile tracking.',
      th: 'แอปจัดการสต็อกพร้อมสแกนบาร์โค้ด แทนการจดสต็อกด้วยมือด้วยการติดตามแบบเรียลไทม์บนมือถือ',
    },
    tags: ['Android', 'Java', 'SQLite'],
  },
]

export const education: Education = {
  degree: { en: 'B.Sc. Information Technology', th: 'วท.บ. เทคโนโลยีสารสนเทศ' },
  university: 'Phranakhon Rajabhat University',
  period: '2016 – 2020',
  gpa: 'GPA 3.10',
}

export const contacts: Contact[] = [
  { label: { en: 'Email', th: 'อีเมล' }, value: profile.email, href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'GitHub', value: 'github.com/pakkahwat', href: 'https://github.com/pakkahwat', icon: 'github' },
  { label: 'LinkedIn', value: 'linkedin.com/in/pakkahwat-chuesaard', href: 'https://www.linkedin.com/in/pakkahwat-chuesaard-1ba7202b4/', icon: 'linkedin' },
]

// Prose that lives directly in component templates (not part of the data above).
export const ui = {
  available: { en: 'Available now · remote or hybrid', th: 'พร้อมเริ่มงานทันที · Remote / Hybrid' } as Localized,
  availableShort: { en: 'Available now', th: 'พร้อมเริ่มงานทันที' } as Localized,
  heroPitch: {
    en: 'I take business systems from requirements to production and keep them running — five years in finance and pawnshop operations, plus three apps of my own that are live today.',
    th: 'รับงานระบบตั้งแต่เก็บความต้องการจนขึ้นใช้งานจริง และดูแลให้เดินต่อได้ — 5 ปีในธุรกิจการเงินและโรงรับจำนำ และมีแอปของตัวเองที่เปิดใช้งานจริงอีก 3 ตัว',
  } as Localized,
  viewProjects: { en: 'View projects', th: 'ดูผลงาน' } as Localized,
  contactMe: { en: 'Contact', th: 'ติดต่อ' } as Localized,
  resume: { en: 'Resume', th: 'เรซูเม่' } as Localized,
  resumeLabel: { en: 'Resume (PDF)', th: 'เรซูเม่ (PDF)' } as Localized,
  resumeMeta: { en: '2 pages · A4 · TH / EN', th: '2 หน้า · A4 · ไทย / อังกฤษ' } as Localized,
  outcome: { en: 'Outcome', th: 'ผลลัพธ์' } as Localized,
  liveSite: { en: 'Live site', th: 'เว็บจริง' } as Localized,
  themeToDark: { en: 'Switch to dark theme', th: 'เปลี่ยนเป็นธีมมืด' } as Localized,
  themeToLight: { en: 'Switch to light theme', th: 'เปลี่ยนเป็นธีมสว่าง' } as Localized,
  language: { en: 'Language', th: 'ภาษา' } as Localized,
  coreStrengths: { en: 'Core strengths', th: 'จุดแข็งหลัก' } as Localized,
  toolbox: { en: 'Toolbox', th: 'เครื่องมือที่ใช้' } as Localized,
  toolboxHint: { en: 'Tap a tech to see the projects that used it', th: 'กดชื่อ tech เพื่อดูผลงานที่ใช้' } as Localized,
  filterShowing: { en: 'Showing projects built with', th: 'แสดงผลงานที่ใช้' } as Localized,
  filterClear: { en: 'Show all', th: 'แสดงทั้งหมด' } as Localized,
  languagesHead: { en: 'Languages', th: 'ภาษา' } as Localized,
  highlights: { en: 'Highlights', th: 'ผลงานที่ภูมิใจ' } as Localized,
  contactHead: { en: 'Have a system that needs building, fixing or rescuing?', th: 'มีระบบที่ต้องสร้าง แก้ไข หรือกู้คืนอยู่ไหม?' } as Localized,
  contactSub: {
    en: "I can start right away, remote or hybrid. Email is the fastest way to reach me — I usually reply within a day.",
    th: 'พร้อมเริ่มงานได้ทันที ทั้งแบบ Remote และ Hybrid ติดต่อทางอีเมลเร็วที่สุด ปกติตอบภายในหนึ่งวัน',
  } as Localized,
  updated: { en: 'Updated', th: 'อัปเดต' } as Localized,
  builtWith: { en: 'Built with Next.js 16', th: 'สร้างด้วย Next.js 16' } as Localized,
}

// Section headings, in page order. `n` is the small index shown above each title.
export const sections = {
  projects: { n: '01', title: { en: 'Selected work', th: 'ผลงาน' } as Localized, lead: { en: 'Apps I built and run myself, the production systems I owned at work, and where it started.', th: 'แอปที่สร้างและดูแลเอง ระบบ production ที่รับผิดชอบในงานประจำ และจุดเริ่มต้น' } as Localized },
  about: { n: '02', title: { en: 'About', th: 'เกี่ยวกับผม' } as Localized },
  experience: { n: '03', title: { en: 'Experience', th: 'ประสบการณ์ทำงาน' } as Localized },
  skills: { n: '04', title: { en: 'Skills', th: 'ทักษะ' } as Localized },
  education: { n: '05', title: { en: 'Education', th: 'การศึกษา' } as Localized },
  contact: { n: '06', title: { en: 'Contact', th: 'ติดต่อ' } as Localized },
}

// Header links on desktop; the bottom tab bar on phones (icon + label, max 5).
export const navItems: {
  id: keyof typeof sections
  label: Localized
  icon: 'grid' | 'user' | 'briefcase' | 'code' | 'mail'
}[] = [
  { id: 'projects', label: { en: 'Projects', th: 'ผลงาน' }, icon: 'grid' },
  { id: 'about', label: { en: 'About', th: 'เกี่ยวกับ' }, icon: 'user' },
  { id: 'experience', label: { en: 'Experience', th: 'ประสบการณ์' }, icon: 'briefcase' },
  { id: 'skills', label: { en: 'Skills', th: 'ทักษะ' }, icon: 'code' },
  { id: 'contact', label: { en: 'Contact', th: 'ติดต่อ' }, icon: 'mail' },
]
