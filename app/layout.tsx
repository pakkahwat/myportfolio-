import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Noto_Sans_Thai, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/lib/LocaleContext'
import SiteHeader from '@/components/SiteHeader'

// Inter carries Latin; Thai glyphs fall through to Noto Sans Thai (see --sans
// in globals.css). Mono is only used for small accents (numbers, tags).
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const thai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-thai',
  display: 'swap',
})
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Pakkahwat Chuesaard — Software Engineer',
  description:
    'Pakkahwat Chuesaard — Software Engineer specializing in full-stack development, production troubleshooting, and ERP integration. Projects: browser-only PDF tools, an on-device-OCR lending system, and an AI-vs-human prediction league.',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#f8fafc',
}

// Runs before first paint: marks JS as available (enables scroll reveal) and
// applies the visitor's saved theme so a dark-theme reload doesn't flash light.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'){d.dataset.theme='dark';var m=document.querySelector('meta[name="theme-color"]');if(m)m.content='#0d1117'}}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${thai.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <Script id="boot" strategy="beforeInteractive">
          {bootScript}
        </Script>
        <LocaleProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
        </LocaleProvider>
      </body>
    </html>
  )
}
