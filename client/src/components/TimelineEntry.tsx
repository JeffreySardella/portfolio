import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ExperienceEntry } from '../data/experience'

gsap.registerPlugin(ScrollTrigger)

interface TimelineEntryProps {
  entry: ExperienceEntry
}

export default function TimelineEntry({ entry }: TimelineEntryProps) {
  const entryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = entryRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={entryRef} className="flex flex-col md:flex-row gap-4 md:gap-8">
      {/* Left: dates + location */}
      <div className="md:w-48 flex-shrink-0">
        <p className="font-mono text-text-muted text-sm">{entry.dates}</p>
        <p className="font-mono text-text-muted text-sm mt-1">{entry.location}</p>
      </div>

      {/* Right: title, company, bullets */}
      <div className="flex-1 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading font-bold text-text">{entry.title}</h3>
          {entry.current && (
            <span className="bg-accent-warm/10 text-accent-warm text-xs font-mono px-2 py-0.5 rounded">
              CURRENT
            </span>
          )}
        </div>
        <p className="text-accent-warm text-sm mt-0.5">{entry.company}</p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {entry.bullets.map((bullet, i) => (
            // Index is stable — bullets array never reorders at runtime
            // eslint-disable-next-line react/no-array-index-key
            <li key={i} className="flex gap-2 text-text-muted text-sm">
              <span className="text-accent-warm flex-shrink-0" aria-hidden="true">
                ›
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
