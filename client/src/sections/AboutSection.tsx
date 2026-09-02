import PhotoStrip from '../components/PhotoStrip'
import GitHubHeatmap from '../components/GitHubHeatmap'

const QUICK_FACTS = [
  { label: 'DEGREE', value: 'B.S. Computer Science, Sac State (May 2026)' },
  { label: 'CERTS', value: 'AZ-900 · DP-900 · 6× Google (Cybersecurity, Data, AI, Python)' },
  { label: 'LOCATION', value: 'Rocklin, CA' },
  { label: 'CURRENT', value: 'IT Specialist I, California Department of Justice' },
  { label: 'LANGUAGES', value: 'C# (6yr) · Python (4yr) · SQL (3yr) · JS (2yr)' },
]

export default function AboutSection() {
  return (
    <section id="about" aria-label="About" className="scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">About</h2>

        {/* Photo + bio + facts */}
        <div className="md:grid md:grid-cols-[auto_1fr_1fr] gap-12 mt-10 items-start">
          {/* Headshot */}
          <div className="flex justify-center md:justify-start mb-8 md:mb-0">
            <img
              src="/headshot.jpg"
              alt="Jeffrey Sardella"
              width={150}
              height={150}
              className="rounded-full border-2 border-border"
            />
          </div>

          {/* Bio */}
          <div>
            <p className="text-text-muted leading-relaxed text-lg">
              I started coding at 13 messing around in Xcode, picked up Unity at 14, and by 15 I
              was digging through a massive Python codebase for a Toontown community project. When
              I got my first real job, I wrote a C# app to automate labor calculations because I was
              tired of doing it by hand. That led to a pool company gig where I helped them estimate
              job costs and track field operations.
            </p>
            <p className="text-text-muted leading-relaxed text-lg mt-4">
              Now I've got the CS degree from Sac State and a day job writing software for the
              California Department of Justice. Before that I was building AI automation tools under
              contract, and I've still got a civic data project going on the side. Eight certs
              across Microsoft and Google — and a garage full of half-finished projects. I just like
              making things work.
            </p>
          </div>

          {/* Quick facts */}
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
