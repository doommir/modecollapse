import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Mode Collapse - AI Tools Directory',
  description: 'The smartest AI tools. Curated by humans. Powered by consciousness.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="pt-16">
          {children}
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
