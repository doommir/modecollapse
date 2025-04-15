export const siteConfig = {
  name: 'Mode Collapse',
  description: 'Mode Collapse - AI & Software Development',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.modecollapse.io',
  ogImage: '/images/modecollapse001.png',
  links: {
    twitter: 'https://twitter.com/modecollapse',
    github: 'https://github.com/modecollapse',
  },
  navItems: [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Tools', path: '/tools' },
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
  ]
} 