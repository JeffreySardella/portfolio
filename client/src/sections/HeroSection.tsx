import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHorizontalScroll } from '../hooks/useScrollTrigger'
import ScrollProgress from '../components/ScrollProgress'
import { stations } from '../data/stations'

gsap.registerPlugin(ScrollTrigger)

// ─── Helper: render label text as individual animated character spans ─────────

function AnimatedLabel({
  text,
  className,
  animRef,
}: {
  text: string
  className?: string
  animRef: React.RefObject<HTMLHeadingElement | null>
}) {
  return (
    <h2 ref={animRef} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={{ display: 'inline-block' }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00a0' : char}
        </span>
      ))}
    </h2>
  )
}

// ─── Mobile station (IntersectionObserver fade-in) ────────────────────────────

function MobileStation({ station }: { station: (typeof stations)[number] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`relative min-h-[60vh] flex items-end ${station.bgClass}`}>
      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="station-mobile relative z-10 px-6 pb-10 pt-16">
        <p className="font-mono text-accent-warm text-xs tracking-widest mb-2 uppercase">
          {station.date}
        </p>
        <h2 className="font-heading text-3xl font-bold text-text leading-tight mb-3">
          {station.label}
        </h2>
        <p className="text-text-muted text-base max-w-sm">{station.caption}</p>

        {station.id === 'station-4' && (
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="#projects"
              className="px-5 py-2.5 bg-accent-warm text-bg font-semibold text-sm rounded hover:bg-accent-warm-hover transition-colors"
            >
              See Projects ↓
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 border border-border text-text font-semibold text-sm rounded hover:border-text-muted transition-colors"
            >
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Desktop station panel ────────────────────────────────────────────────────

interface DesktopStationProps {
  station: (typeof stations)[number]
  index: number
  /** The GSAP tween driving horizontal scroll — used as containerAnimation */
  drivingTween: React.RefObject<gsap.core.Tween | null>
}

function DesktopStation({ station, index, drivingTween }: DesktopStationProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLHeadingElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Wait one tick so useHorizontalScroll has created its tween
    const timer = setTimeout(() => {
      const tween = drivingTween.current
      // If tween isn't available (reduced motion / mobile), skip animations
      if (!tween) return

      const ctx = gsap.context(() => {
        const triggerOpts: gsap.DOMTarget | ScrollTrigger.Vars = {
          trigger: contentRef.current!,
          start: 'left 85%',
          containerAnimation: tween,
          once: true,
        }

        // Date fade-in
        if (dateRef.current) {
          gsap.from(dateRef.current, {
            opacity: 0,
            y: 15,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: triggerOpts,
          })
        }

        // Label — animate individual character spans
        if (labelRef.current) {
          const chars = labelRef.current.querySelectorAll('span')
          if (chars.length > 0) {
            gsap.from(chars, {
              opacity: 0,
              y: 20,
              duration: 0.4,
              stagger: 0.03,
              ease: 'power2.out',
              delay: 0.1,
              scrollTrigger: triggerOpts,
            })
          }
        }

        // Caption fade-in
        if (captionRef.current) {
          gsap.from(captionRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: 0.25,
            ease: 'power2.out',
            scrollTrigger: triggerOpts,
          })
        }

        // Parallax on background layer at 0.6x speed
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            xPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: contentRef.current!,
              start: 'left right',
              end: 'right left',
              scrub: true,
              containerAnimation: tween,
            },
          })
        }
      })

      return () => ctx.revert()
    }, 50)

    return () => clearTimeout(timer)
  }, [index, drivingTween])

  return (
    <div
      id={station.id}
      className={`relative w-[70vw] h-full flex-shrink-0 flex items-end ${station.bgClass}`}
    >
      {/* Background parallax layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none" />

      {/* Decorative station number — top right */}
      <div
        className="absolute top-8 right-8 font-mono text-text/10 text-[6rem] font-bold leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        0{index + 1}
      </div>

      {/* Content — bottom left */}
      <div
        ref={contentRef}
        className="relative z-10 px-10 pb-16 md:px-16 md:pb-20"
      >
        <p
          ref={dateRef}
          className="font-mono text-accent-warm text-sm tracking-widest mb-3 uppercase"
        >
          {station.date}
        </p>

        <AnimatedLabel
          text={station.label}
          className="font-heading text-4xl md:text-5xl font-bold text-text leading-tight mb-4"
          animRef={labelRef}
        />

        <p ref={captionRef} className="text-text-muted text-lg max-w-md">
          {station.caption}
        </p>

        {station.id === 'station-4' && (
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#projects"
              className="px-6 py-3 bg-accent-warm text-bg font-semibold text-sm rounded hover:bg-accent-warm-hover transition-colors focus-visible:outline-2 focus-visible:outline-accent-warm"
            >
              See Projects ↓
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-border text-text font-semibold text-sm rounded hover:border-text-muted transition-colors focus-visible:outline-2 focus-visible:outline-accent-warm"
            >
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [heroPinned, setHeroPinned] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile once on mount (avoids SSR mismatch)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleProgress = useCallback((p: number) => {
    setProgress(p)
  }, [])

  // Horizontal scroll for desktop — returns ref to driving tween
  const drivingTween = useHorizontalScroll(containerRef, panelRef, handleProgress)

  // Track pin state so ScrollProgress knows when to be visible
  useEffect(() => {
    if (isMobile) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    if (!containerRef.current || !panelRef.current) return

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${(panelRef.current?.scrollWidth ?? 0) - window.innerWidth}`,
      invalidateOnRefresh: true,
      onEnter: () => setHeroPinned(true),
      onLeave: () => setHeroPinned(false),
      onEnterBack: () => setHeroPinned(true),
      onLeaveBack: () => setHeroPinned(false),
    })

    return () => st.kill()
  }, [isMobile])

  // Mobile — vertical stack
  if (isMobile) {
    return (
      <section id="hero" aria-label="Hero">
        {stations.map((station) => (
          <MobileStation key={station.id} station={station} />
        ))}
      </section>
    )
  }

  // Desktop — pinned horizontal scroll
  return (
    <>
      <section
        id="hero"
        aria-label="Hero"
        ref={containerRef}
        className="relative h-screen overflow-hidden"
      >
        <div
          ref={panelRef}
          className="flex h-full will-change-transform"
          style={{ width: `${stations.length * 70}vw` }}
        >
          {stations.map((station, i) => (
            <DesktopStation
              key={station.id}
              station={station}
              index={i}
              drivingTween={drivingTween}
            />
          ))}
        </div>
      </section>

      <ScrollProgress progress={progress} visible={heroPinned} />
    </>
  )
}
