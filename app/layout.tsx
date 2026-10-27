import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Thai, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/lib/LocaleContext'
import { TechFilterProvider } from '@/lib/TechFilter'
import SiteHeader from '@/components/SiteHeader'
import SpotlightEffect from '@/components/SpotlightEffect'
import OverscrollEffect from '@/components/OverscrollEffect'

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
  themeColor: '#f6f6fa',
  // Lets the bottom tab bar sit above the iPhone home indicator (safe-area insets).
  viewportFit: 'cover',
}

// Runs in <head>, before the first paint: marks JS as available (enables the
// scroll reveal), flags Chromium for the glass refraction, applies the saved
// theme, and holds every CSS transition off (`preload`) until the first frames
// are drawn — so a dark-theme reload never flashes light or animates the swap.
// It must be a plain inline <script>: next/script's beforeInteractive queues
// it until Next's own JS has loaded, which is after the first paint.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js','preload');var u=navigator.userAgent;if(u.indexOf('Chrome/')>-1&&!/CriOS|FxiOS/.test(u))d.classList.add('refract');try{var t=localStorage.getItem('theme');if(t==='dark'){d.dataset.theme='dark';var m=document.querySelector('meta[name="theme-color"]');if(m)m.content='#07080d'}}catch(e){}requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.remove('preload')})})})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${thai.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {/* Lens for the liquid-glass bars (used via backdrop + filter on Chromium) */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
          <filter id="lg-refract" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
            <feDisplacementMap in="SourceGraphic" in2="soft" scale="34" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <div className="aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <LocaleProvider>
          <TechFilterProvider>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
          </TechFilterProvider>
        </LocaleProvider>
        <SpotlightEffect />
        <OverscrollEffect />
      </body>
    </html>
  )
}
