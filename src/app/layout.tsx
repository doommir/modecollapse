import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from '@/sections/Nav';
import Footer from '@/sections/Footer';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Modecollapse.io',
  description: 'Upgrading Human Consciousness with AI',
  icons: {
    icon: '/images/modecollapsefavicon.png',
    apple: '/images/modecollapsefavicon.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-darkBg text-textPrimary">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen flex flex-col antialiased`}
      >
        <Nav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
