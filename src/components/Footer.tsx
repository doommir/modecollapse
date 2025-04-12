export default function Footer() {
  return (
    <footer className="p-4 bg-darkBg border-t border-textSecondary text-sm">
      <div className="max-w-7xl mx-auto flex justify-between">
        <p>© {new Date().getFullYear()} Modecollapse</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-primary">
            Twitter
          </a>
          <a href="#" className="hover:text-primary">
            LinkedIn
          </a>
          <a href="#" className="hover:text-primary">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
} 