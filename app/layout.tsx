import Script from "next/script";
import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

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
          <Analytics />
        </main>
      <Script id="novapath-traffic" strategy="afterInteractive" src="/novapath-traffic.js" data-np-hosts="modecollapse.io,modecollapse.vercel.app,www.modecollapse.io" data-np-paths='["/","/tools"]' data-np-privacy="/analytics-privacy.html" />
</body>
    </html>
  )
}

