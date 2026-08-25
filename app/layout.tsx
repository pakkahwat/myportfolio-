import type { Metadata, Viewport } from 'next'
import '@mdi/font/css/materialdesignicons.css'
import './globals.css'
import { LocaleProvider } from '@/lib/LocaleContext'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Pakkahwat Chuesaard — Software Engineer',
  description:
    'Pakkahwat Chuesaard — Software Engineer specializing in full-stack development, production troubleshooting, and ERP integration.',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0D1117',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <LocaleProvider>
          <SiteHeader />
          <main>{children}</main>
        </LocaleProvider>
      </body>
    </html>
  )
}
