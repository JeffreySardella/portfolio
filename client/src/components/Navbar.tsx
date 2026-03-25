import { useEffect, useRef, useState, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Drive Smart', href: '/drive-smart/', external: true },
  { label: 'Contact', href: '#contact' },
] as const

const SECTION_IDS = NAV_LINKS.filter((l) => !('external' in l && l.external)).map((l) => l.href.slice(1))

interface NavbarProps {
  /**
   * When true, navbar logo and links start invisible (opacity-0).
   * The EntryAnimation component will animate them in as part of its exit sequence.
   * When false (or after animation completes), they're fully visible.
   */
  hideUntilAnimated?: boolean
}

export default function Navbar({ hideUntilAnimated = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Scroll listener — blur background after ~80% of viewport height
  useEffect(() => {
    const onScroll = () => {
      // Spec: blur in after ~100vh scroll. Use 0.9 as the threshold so
      // it activates just before a full viewport height is scrolled.
      setScrolled(window.scrollY > window.innerHeight * 0.9)
    }
    // Check on mount (deep-link / hard refresh may already be scrolled)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver to track which section is in view
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      {
        // Fires when element is in the middle 20% of the viewport
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    const observer = observerRef.current
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMenu = useCallback(() => setMobileOpen(false), [])

  const handleNavClick = useCallback(
    (href: string) => {
      closeMenu()
      setTimeout(() => {
        const el = document.getElementById(href.slice(1))
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    },
    [closeMenu]
  )

  const navBg = scrolled
    ? 'bg-bg/80 backdrop-blur-[12px] border-b border-border'
    : 'bg-transparent border-b border-transparent'

  // When hideUntilAnimated=true, logo & links start opacity-0.
  // The EntryAnimation GSAP exit tween targets [data-nav-logo] / [data-nav-link]
  // and sets autoAlpha to 1, so they become visible during the exit sequence.
  // We rely on GSAP's autoAlpha (which controls both opacity AND visibility)
  // rather than Tailwind classes so we don't need React re-renders.
  const hiddenStyle = hideUntilAnimated ? { opacity: 0 } : undefined

  return (
    <>
      {/* ───── Fixed top bar ───── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-300 ${navBg}`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          data-nav-logo
          href="#hero"
          style={hiddenStyle}
          className="font-mono text-text text-sm font-medium tracking-wide hover:text-accent-warm transition-colors duration-200 mr-auto"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          sardella.dev
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
          {NAV_LINKS.map((link) => {
            const isExternal = 'external' in link && link.external
            const id = isExternal ? '' : link.href.slice(1)
            const isActive = !isExternal && activeSection === id
            return (
              <li key={link.href}>
                <a
                  data-nav-link
                  href={link.href}
                  style={hiddenStyle}
                  {...(isExternal ? {} : { onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavClick(link.href) } })}
                  className={`
                    relative text-sm transition-colors duration-200 pb-0.5
                    ${isActive
                      ? 'text-accent-warm border-b-2 border-accent-warm'
                      : 'text-text-muted hover:text-text'
                    }
                  `}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          <li>
            <a
              data-nav-link
              href="/Jeffrey_Sardella_Resume.pdf"
              download
              style={hiddenStyle}
              className="text-sm text-text-muted hover:text-text transition-colors duration-200"
            >
              Resume ↓
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2 p-2 rounded focus-visible:outline-accent-warm"
          aria-label="Navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 ${
              mobileOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-text rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* ───── Mobile full-screen overlay menu ───── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`
          fixed inset-0 z-[60] md:hidden flex flex-col items-center justify-center
          bg-bg/95 backdrop-blur-[12px]
          transition-all duration-300
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu()
        }}
      >
        <ul className="flex flex-col items-center gap-2 list-none m-0 p-0 w-full max-w-xs">
          {NAV_LINKS.map((link) => {
            const isExternal = 'external' in link && link.external
            const id = isExternal ? '' : link.href.slice(1)
            const isActive = !isExternal && activeSection === id
            return (
              <li key={link.href} className="w-full">
                <a
                  href={link.href}
                  {...(isExternal ? {} : { onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavClick(link.href) } })}
                  className={`
                    flex items-center justify-center w-full min-h-[56px] px-6
                    text-2xl font-heading font-bold tracking-tight
                    transition-colors duration-200
                    ${isActive ? 'text-accent-warm' : 'text-text hover:text-accent-warm'}
                  `}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          <li className="w-full">
            <a
              href="/Jeffrey_Sardella_Resume.pdf"
              download
              onClick={closeMenu}
              className="flex items-center justify-center w-full min-h-[56px] px-6 text-2xl font-heading font-bold tracking-tight text-text hover:text-accent-warm transition-colors duration-200"
            >
              Resume ↓
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
