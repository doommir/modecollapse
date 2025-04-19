import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FeaturedBlogPost() {
  const post = {
    slug: 'the-system-is-already-dead',
    title: 'The System Is Already Dead',
    tag: 'Education',
    date: 'May 30, 2024',
    excerpt: 'Why education as we know it will collapse — and what the next era of learning will look like.',
    image: '/blog/the-system-is-already-dead/banner.jpg',
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="mb-12 w-full"
    >
      <article className="group relative grid overflow-hidden rounded-2xl bg-darkBg/40 backdrop-blur-sm md:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 md:h-auto">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
          <span className="inline-block w-max rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary shadow-neon-sm">
            {post.tag}
          </span>
          <h2 className="text-2xl font-bold leading-tight text-textPrimary md:text-3xl">
            {post.title}
          </h2>
          <p className="text-sm text-textSecondary">{post.excerpt}</p>
          <div className="mt-2 flex items-center gap-3 text-xs text-textSecondary/80">
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{post.date}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="mt-6 inline-block w-max rounded-md border border-primary px-6 py-2 text-sm font-semibold text-primary shadow-neon transition-all duration-300 hover:bg-primary hover:text-darkBg focus:ring-2 focus:ring-primary/50"
          >
            Read More →
          </Link>
        </div>
      </article>
    </motion.section>
  )
} 