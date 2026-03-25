import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

// ─── Single station (vertical, scroll-triggered animations) ──────────────────

function Station({ station, index }: { station: (typeof stations)[number]; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLHeadingElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const trigger: ScrollTrigger.Vars = {
        trigger: sectionRef.current!,
        start: 'top 75%',
        once: true,
      }

      // Date fade-in
      if (dateRef.current) {
        gsap.from(dateRef.current, {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: trigger,
        })
      }

      // Label — character-by-character reveal
      if (labelRef.current) {
        const chars = labelRef.current.querySelectorAll('span')
        if (chars.length > 0) {
          gsap.from(chars, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            stagger: 0.03,
            ease: 'power2.out',
            delay: 0.15,
            scrollTrigger: trigger,
          })
        }
      }

      // Caption fade-in
      if (captionRef.current) {
        gsap.from(captionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: trigger,
        })
      }

      // CTA buttons fade-in (station 4 only)
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: trigger,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className={`relative min-h-[70vh] flex items-end ${station.bgClass}`}
    >
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none" />

      {/* Decorative station number — top right */}
      <div
        className="absolute top-8 right-8 font-mono text-text/5 text-[8rem] md:text-[10rem] font-bold leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        0{index + 1}
      </div>

      {/* Content — bottom left */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 pb-12 md:px-16 md:pb-20 pt-24">
        <p
          ref={dateRef}
          className="font-mono text-accent-warm text-sm tracking-widest mb-3 uppercase"
        >
          {station.date}
        </p>

        <AnimatedLabel
          text={station.label}
          className="font-heading text-3xl md:text-5xl font-bold text-text leading-tight mb-4"
          animRef={labelRef}
        />

        <p ref={captionRef} className="text-text-muted text-lg max-w-md">
          {station.caption}
        </p>

        {station.id === 'station-4' && (
          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-8">
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
  return (
    <section id="hero" aria-label="Hero">
      {stations.map((station, i) => (
        <Station key={station.id} station={station} index={i} />
      ))}
    </section>
  )
}
