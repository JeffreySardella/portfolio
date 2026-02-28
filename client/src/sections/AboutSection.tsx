const skills = [
  { category: 'Languages', items: ['C# (6 yrs)', 'Python (4 yrs)', 'SQL (3+ yrs)', 'JavaScript (2+ yrs)', 'PHP', 'R', 'HTML/CSS'], gradient: 'from-violet-50 to-purple-50', border: 'border-violet-100' },
  { category: 'Frameworks', items: ['ASP.NET Core', '.NET MVC', 'React', 'Vue.js', 'Entity Framework', 'pandas', 'NumPy', 'Pygame', 'Tailwind', 'Bootstrap'], gradient: 'from-orange-50 to-amber-50', border: 'border-orange-100' },
  { category: 'Data & Cloud', items: ['SQL Server', 'Stored Procedures', 'Relational Modeling', 'Azure Fundamentals', 'REST APIs', 'Auth/RBAC'], gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-100' },
  { category: 'Tools', items: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Postman', 'Agile/Scrum'], gradient: 'from-rose-50 to-pink-50', border: 'border-rose-100' },
]

const experience = [
  {
    title: 'IT Assistant & Operations Support',
    company: 'Pool Time Pool and Spa',
    location: 'Rancho Cordova, CA',
    dates: 'Jan 2021 - Jun 2021',
    bullets: [
      'Configured software to streamline company job estimates and bidding accuracy',
      'Managed digital transformation by transitioning paper records to searchable PDF and Excel formats',
      'Provided technical support for Windows systems to maintain department productivity',
    ],
  },
  {
    title: 'Shift Manager',
    company: 'Burger and Cream',
    location: 'Auburn, CA',
    dates: 'Nov 2016 - Dec 2020',
    bullets: [
      'Supervised diverse teams and managed daily operations in a high-volume environment',
      'Troubleshot POS systems and technical equipment to minimize service disruptions',
    ],
  },
]

function AboutSection() {
  return (
    <section id="about" className="py-8 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* About text - spans 2 cols */}
        <div className="bento-card md:col-span-2 p-8">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-4">About me</p>
          <h2 className="text-2xl font-bold mb-4">
            I build things for the web<span className="text-primary">.</span>
          </h2>
          <div className="space-y-3 text-text-muted leading-relaxed">
            <p>
              Computer Science professional with over 6 years of technical experience in
              object-oriented programming and 4 years of data-driven development. I have a
              proven track record building multi-tier applications and secure REST APIs while
              maintaining rigorous data integrity.
            </p>
            <p>
              My project experience includes a multi-tier healthcare application (ASP.NET Core,
              SQL Server, Flutter) and a forum platform (PHP, Vue.js) — covering the full
              software development lifecycle from database design to deployment.
            </p>
            <p>
              Actively pursuing <span className="text-text font-medium">Microsoft Azure
              certifications</span> to support enterprise-level cloud modernization.
              Looking for full-stack or backend roles in
              <span className="text-text font-medium"> .NET</span> and
              <span className="text-text font-medium"> React</span> stacks.
            </p>
          </div>
        </div>

        {/* Quick stats card */}
        <div className="bento-card p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-4">At a glance</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-bold text-emerald-600">6+</div>
              <div className="text-sm text-text-muted">Years in C#</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">4+</div>
              <div className="text-sm text-text-muted">Years Python & SQL</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">4+</div>
              <div className="text-sm text-text-muted">Projects shipped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">2</div>
              <div className="text-sm text-text-muted">Azure certs in progress</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">2+</div>
              <div className="text-sm text-text-muted">Years REST APIs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">B.S.</div>
              <div className="text-sm text-text-muted">Computer Science</div>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        {skills.map((group) => (
          <div
            key={group.category}
            className={`bento-card p-6 bg-gradient-to-br ${group.gradient} ${group.border}`}
          >
            <p className="text-xs text-text-muted uppercase tracking-widest mb-3">{group.category}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white/80 rounded-lg text-sm font-medium text-text hover:bg-white transition-colors cursor-default border border-black/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Work experience - full width */}
        <div className="bento-card md:col-span-3 p-8">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-4">Professional experience</p>
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.title} className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-48 flex-shrink-0">
                  <p className="text-sm font-medium text-text">{job.dates}</p>
                  <p className="text-xs text-text-muted">{job.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-primary mb-2">{job.company}</p>
                  <ul className="space-y-1">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-text-muted flex items-start gap-2">
                        <span className="text-primary mt-1 flex-shrink-0">&#8226;</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
