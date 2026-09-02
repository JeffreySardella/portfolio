export default function Footer() {
  return (
    <footer aria-label="Site footer">
      <div className="max-w-[1200px] mx-auto px-6 py-8 border-t border-border">
        <p className="text-center text-text-muted text-sm">
          © 2026 Jeffrey Sardella · sardella.dev ·{' '}
          <a
            href="https://github.com/JeffreySardella"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text transition-colors"
          >
            GitHub
          </a>
          {' · '}
          <a
            href="https://www.linkedin.com/in/jeffrey-sardella-7889b3163/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text transition-colors"
          >
            LinkedIn
          </a>
        </p>
        <p className="text-center text-text-muted text-xs mt-3">
          Personal site. Opinions are my own, not the Department of Justice's.
        </p>
      </div>
    </footer>
  )
}
