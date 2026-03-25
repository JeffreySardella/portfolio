import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stations } from '../data/stations'

gsap.registerPlugin(ScrollTrigger)

// ─── Journey card (compact timeline item) ────────────────────────────────────

function JourneyCard({
  station,
  index,
}: {
  station: (typeof stations)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        opacity: 0,
        y: 25,
        duration: 0.6,
        delay: index * 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current!,
          start: 'top 85%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={ref}
      className={`relative rounded-lg overflow-hidden ${station.bgClass} group`}
    >
      {/* Photo placeholder — will be replaced with real photos */}
      <div className="aspect-[4/3] w-full shimmer" />

      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <p className="font-mono text-accent-warm text-xs tracking-widest mb-1 uppercase">
          {station.date}
        </p>
        <h3 className="font-heading text-lg md:text-xl font-bold text-text leading-tight mb-1">
          {station.label}
        </h3>
        <p className="text-text-muted text-sm leading-snug">
          {station.caption}
        </p>
      </div>
    </div>
  )
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────

export default function HeroSection() {
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !ctaRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(ctaRef.current!, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current!,
          start: 'top 85%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" aria-label="Hero">
      {/* ── Full-screen name ── */}
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-text text-center px-6">
          JEFFREY SARDELLA
        </h1>
        <p className="mt-4 text-sm font-mono text-text-muted tracking-widest text-center px-6">
          Builder · Problem Solver · Engineer
        </p>
      </div>

      {/* ── Compact journey strip ── */}
      <div className="max-w-[1200px] mx-auto px-6 pb-16">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">
          The Journey
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stations.map((station, i) => (
            <JourneyCard key={station.id} station={station} index={i} />
          ))}
        </div>

        {/* CTAs below the journey strip */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10">
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
      </div>
    </section>
  )
}
