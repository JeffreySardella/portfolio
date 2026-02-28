function HeroSection() {
  return (
    <section className="pt-28 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main intro card - spans 2 cols */}
        <div className="bento-card md:col-span-2 p-8 md:p-10 flex flex-col justify-between min-h-[320px] bg-gradient-to-br from-indigo-500 to-blue-600 text-white border-none">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-green-300 animate-pulse-dot" />
              <span className="text-sm text-indigo-100">Open to work</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
              Jeffrey Sardella<span className="text-indigo-200">.</span>
            </h1>
            <p className="text-lg text-indigo-100 max-w-lg leading-relaxed">
              6+ years in <span className="text-white font-semibold">C#</span> and
              object-oriented development. Building multi-tier apps and secure REST APIs with
              <span className="text-white font-semibold"> .NET</span>,
              <span className="text-white font-semibold"> React</span>, and
              <span className="text-white font-semibold"> SQL Server</span>.
              Pursuing Azure certifications for enterprise cloud work.
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-white text-indigo-600 text-sm font-medium rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className="px-5 py-2.5 bg-white/15 text-white text-sm font-medium rounded-xl hover:bg-white/25 transition-colors"
            >
              See my work
            </a>
          </div>
        </div>

        {/* Location + socials card */}
        <div className="bento-card p-6 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl mb-4">
              📍
            </div>
            <h3 className="font-semibold text-lg mb-1">Rocklin, CA</h3>
            <p className="text-sm text-text-muted mb-3">
              B.S. Computer Science — Sacramento State (Spring 2026)
            </p>
            <p className="text-sm text-text-muted">
              A.S. Computer Science — Sierra College (2023)
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <a
              href="https://github.com/JeffreySardella"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/jeffrey-sardella-7889b3163/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:sardellajeffrey123@gmail.com"
              className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
              aria-label="Email"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>
        </div>

        {/* Certifications card */}
        <div className="bento-card p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-3">Certifications</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-xl">☁️</span>
              <div>
                <p className="font-medium text-sm">Azure Fundamentals (AZ-900)</p>
                <p className="text-xs text-text-muted">In Progress — Target March 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">📊</span>
              <div>
                <p className="font-medium text-sm">Azure Data Fundamentals (DP-900)</p>
                <p className="text-xs text-text-muted">Planned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech marquee card - spans 2 cols */}
        <div className="bento-card md:col-span-2 p-5 overflow-hidden">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-3">Tech I work with</p>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...techStack, ...techStack].map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-4 py-2 mx-1.5 bg-bg rounded-lg text-sm font-medium text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const techStack = [
  'C# (6 yrs)', 'Python (4 yrs)', 'SQL (3+ yrs)', 'JavaScript (2+ yrs)',
  'ASP.NET Core', 'React', 'Vue.js', 'Entity Framework',
  'SQL Server', 'Azure', 'REST APIs', 'PHP', 'R',
  'pandas', 'NumPy', 'Git', 'Postman', 'Tailwind CSS', 'Bootstrap',
]

export default HeroSection
