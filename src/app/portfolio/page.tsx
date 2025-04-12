export default function PortfolioPage() {
  // Later, we'll add dynamic project data or fetch from an API
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-heading mb-8">Our Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Cards for each project */}
        {[1, 2, 3, 4, 5, 6].map((project) => (
          <div
            key={project}
            className="bg-darkBg border border-textSecondary p-4 rounded hover:border-primary transition-colors"
          >
            <h3 className="text-xl mb-2">AI Project #{project}</h3>
            <p className="text-textSecondary">
              A short description of this AI tool or experiment.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
} 