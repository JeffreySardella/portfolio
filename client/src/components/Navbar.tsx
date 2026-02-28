import { useState, useEffect } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-xl shadow-sm' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="#" className="text-lg font-bold text-text">
            jeffrey<span className="text-primary">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 text-sm text-text-muted hover:text-text rounded-lg hover:bg-black/5 transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="/Jeffrey_resume.pdf"
              download
              className="ml-2 px-4 py-2 text-sm font-medium bg-text text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Resume
            </a>
          </div>

          <button
            className="md:hidden p-2 text-text-muted hover:text-text rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-black/5 px-4 py-3 space-y-1">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm text-text-muted hover:text-text rounded-lg hover:bg-black/5 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/Jeffrey_resume.pdf"
            download
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm font-medium text-primary"
          >
            Download Resume
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
