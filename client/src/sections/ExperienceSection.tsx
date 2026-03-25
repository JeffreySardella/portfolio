import { experience } from '../data/experience'
import TimelineEntry from '../components/TimelineEntry'

export default function ExperienceSection() {
  return (
    <section id="experience" aria-label="Experience" className="scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">Experience</h2>

        {/* Timeline container with vertical line on left */}
        <div className="mt-12 pl-4 border-l border-border space-y-0">
          {experience.map((entry) => (
            <TimelineEntry key={`${entry.company}-${entry.dates}`} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
