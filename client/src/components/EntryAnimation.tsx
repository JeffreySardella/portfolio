import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/** Returns true if the entry animation should be skipped entirely */
function shouldSkipAnimation(): boolean {
  if (typeof window === 'undefined') return true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  if (window.location.hash !== '') return true
  if (window.scrollY > 0) return true
  return false
}

interface EntryAnimationProps {
  /** Called when the exit animation finishes so the parent can fully unmount the overlay */
  onComplete?: () => void
}

export default function EntryAnimation({ onComplete }: EntryAnimationProps) {
  // Evaluate skip condition once, at construction time
  const [skip] = useState(shouldSkipAnimation)
  const [visible, setVisible] = useState(!skip)

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const nameRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const chevronRef = useRef<HTMLDivElement | null>(null)
  const entryTlRef = useRef<gsap.core.Timeline | null>(null)
  const chevronPulseRef = useRef<gsap.core.Tween | null>(null)
  const exitFiredRef = useRef(false)

  useEffect(() => {
    if (skip || !visible) return

    const overlay = overlayRef.current
    const name = nameRef.current
    const subtitle = subtitleRef.current
    const chevron = chevronRef.current
    if (!overlay || !name || !subtitle || !chevron) return

    // --- Set initial hidden state for elements in this overlay ---
    gsap.set(name, { opacity: 0, y: 24 })
    gsap.set(subtitle, { opacity: 0, y: 12 })
    gsap.set(chevron, { opacity: 0, y: 0 })

    // --- Build the entry timeline ---
    const tl = gsap.timeline({ delay: 0.5 })
    entryTlRef.current = tl

    // 1. Name fades in + rises
    tl.to(name, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })

    // 2. Subtitle fades in ~300ms after name starts
    tl.to(
      subtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.5' // overlaps 0.5s into name's 0.8s → appears at t=0.3s after name starts
    )

    // 3. Chevron appears ~1.5s after name appeared, then pulses
    tl.to(
      chevron,
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          chevronPulseRef.current = gsap.to(chevron, {
            y: 10,
            duration: 0.9,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        },
      },
      '+=1.1' // 1.1s gap after subtitle ends ≈ 1.5s after name start
    )

    // --- One-time scroll listener to trigger exit ---
    const handleFirstScroll = () => {
      if (exitFiredRef.current) return
      exitFiredRef.current = true
      runExitAnimation()
    }

    window.addEventListener('scroll', handleFirstScroll, { passive: true, once: true })

    return () => {
      window.removeEventListener('scroll', handleFirstScroll)
      tl.kill()
      chevronPulseRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, visible])

  function runExitAnimation() {
    const overlay = overlayRef.current
    const name = nameRef.current
    if (!overlay || !name) return

    // Stop any in-progress entry / pulse tweens
    entryTlRef.current?.kill()
    chevronPulseRef.current?.kill()

    // Grab navbar elements — they were rendered with opacity:0 inline style
    // GSAP will animate their opacity; React inline style is overridden by GSAP.
    const navLogo = document.querySelector<HTMLElement>('[data-nav-logo]')
    const navLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-link]'))

    // Pre-set nav link starting transform (offset from right) before animating
    if (navLinks.length > 0) {
      gsap.set(navLinks, { x: 10 })
    }

    const exitTl = gsap.timeline({
      onComplete: () => {
        setVisible(false)
        onComplete?.()
      },
    })

    // -- Step 1: Overlay name fades up and out (0.4s)
    exitTl.to(name, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    })

    // -- Step 2: Overlay background fades out (0.6s), starts slightly before step 1 ends
    exitTl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.15'
    )

    // -- Step 3: Navbar logo cross-fades in simultaneously with overlay fade
    if (navLogo) {
      exitTl.to(
        navLogo,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<' // starts at same time as overlay fade
      )
    }

    // -- Step 4: Nav links stagger in from right, starting slightly after logo
    if (navLinks.length > 0) {
      exitTl.to(
        navLinks,
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: 'power2.out',
        },
        '<+0.1'
      )
    }
  }

  // Nothing to render if skip or animation has completed
  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      // z-40 sits below navbar (z-50) but above all page content
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg"
      // pointer-events-none so the underlying page can still scroll (wheel/touch)
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Name */}
      <h1
        ref={nameRef}
        className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-text text-center px-6"
        style={{ willChange: 'transform, opacity' }}
      >
        JEFFREY SARDELLA
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="mt-4 text-sm font-mono text-text-muted tracking-widest text-center px-6"
        style={{ willChange: 'transform, opacity' }}
      >
        Builder · Tinkerer · Engineer
      </p>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-12 flex flex-col items-center gap-1.5"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="text-[10px] font-mono text-text-muted tracking-[0.2em] uppercase">
          scroll
        </span>
        <ChevronDownIcon className="text-text-muted" />
      </div>
    </div>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
