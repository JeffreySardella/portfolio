import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 0

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.7,
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
    <div ref={cardRef} className="py-12 border-b border-border last:border-b-0">
      <div
        className={`md:grid md:grid-cols-2 gap-8 items-center ${
          isEven ? '' : 'md:[direction:rtl]'
        }`}
      >
        {/* Image placeholder */}
        <div
          className={`aspect-[16/10] bg-bg-surface rounded-lg shimmer mb-6 md:mb-0 ${
            isEven ? '' : 'md:[direction:ltr]'
          }`}
          aria-hidden="true"
        />

        {/* Text content */}
        <div className={isEven ? '' : 'md:[direction:ltr]'}>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-text">
            {project.title}
          </h3>

          <p className="mt-4 text-text-muted leading-relaxed">{project.description}</p>

          {/* SDLC phase tags */}
          {project.sdlcPhases.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.sdlcPhases.map((phase) => (
                <span
                  key={phase}
                  className="border border-accent-warm/30 text-accent-warm text-xs font-mono px-2 py-0.5 rounded"
                >
                  {phase}
                </span>
              ))}
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="bg-bg-elevated text-text-muted text-xs font-mono px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-warm hover:text-accent-warm-hover font-mono text-sm transition-colors"
              >
                GitHub →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
                rel={project.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-accent-warm hover:text-accent-warm-hover font-mono text-sm transition-colors"
              >
                Live →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
