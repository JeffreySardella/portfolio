import PhotoStrip from '../components/PhotoStrip'
import GitHubHeatmap from '../components/GitHubHeatmap'

const QUICK_FACTS = [
  { label: 'DEGREE', value: 'B.S. Computer Science, Sac State (2026)' },
  { label: 'CERTS', value: 'AZ-900 · DP-900 · GitHub Foundations' },
  { label: 'LOCATION', value: 'Rocklin, CA' },
  { label: 'STATUS', value: 'Open to work — state IT, full-stack, and freelance' },
  { label: 'LANGUAGES', value: 'C# (6yr) · Python (4yr) · SQL (3yr) · JS (2yr)' },
]

export default function AboutSection() {
  return (
    <section id="about" aria-label="About" className="scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">About</h2>

        {/* Two-column layout */}
        <div className="md:grid md:grid-cols-2 gap-12 mt-10">
          {/* Left: bio */}
          <div>
            <p className="text-text-muted leading-relaxed text-lg">
              I started writing C# at a burger joint because I was tired of calculating labor by
              hand. That turned into wiring networks at a pool company, shipping multiplayer
              minigames for a Toontown community, and now building AI training pipelines under
              contract.
            </p>
            <p className="text-text-muted leading-relaxed text-lg mt-4">
              I have a CS degree from Sac State, three Microsoft/GitHub certs, and a garage full of
              half-finished projects. I just like making things work.
            </p>
          </div>

          {/* Right: quick facts */}
          <div className="mt-8 md:mt-0">
            <dl className="flex flex-col gap-4">
              {QUICK_FACTS.map(({ label, value }) => (
                <div key={label} className="flex gap-4 items-start">
                  <dt className="font-mono text-accent-warm text-xs tracking-wider w-24 flex-shrink-0 pt-0.5">
                    {label}
                  </dt>
                  <dd className="text-text text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* GitHub activity heatmap */}
        <div className="mt-12">
          <GitHubHeatmap />
        </div>

        {/* Photo strip */}
        <PhotoStrip />
      </div>
    </section>
  )
}
