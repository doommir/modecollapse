import Link from 'next/link'

export default function NewsPage() {
  // Sample blog article placeholders
  const articles = [
    {
      id: 1,
      title: "AI in K-12: Bridging the Gap",
      excerpt: "How modern AI tools can enhance classroom engagement.",
      date: "April 10, 2025",
    },
    {
      id: 2,
      title: "CTE & AI: Future of Vocational Learning",
      excerpt: "Exploring AI-driven skill training for tomorrow's workforce.",
      date: "April 8, 2025",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-heading mb-8">News & Updates</h2>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.id} className="border-b border-textSecondary pb-4">
            <Link href={`/news/${article.id}`} className="block hover:text-primary">
              <h3 className="text-2xl font-semibold">{article.title}</h3>
              <p className="text-textSecondary">{article.excerpt}</p>
              <small className="text-xs text-textSecondary">
                Published on {article.date}
              </small>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
} 