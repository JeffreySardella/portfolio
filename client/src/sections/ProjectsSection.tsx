const projects = [
  {
    title: 'Medical Application',
    description:
      'Multi-tier healthcare app with patient management, appointment scheduling, and medical records. Senior capstone project built with a team using Agile.',
    tech: ['ASP.NET Core', 'C#', 'SQL Server', 'Flutter', 'REST API'],
    color: 'bg-blue-50',
    emoji: '🏥',
  },
  {
    title: 'Toontown Mini-Games',
    description:
      'Implemented gameplay logic and event systems for two interactive mini-games in a Unity3D recreation of Toontown. Optimized mechanics and performance while collaborating with a multi-developer team.',
    tech: ['Unity3D', 'C#', 'Game Dev'],
    live: 'https://toon.gg',
    color: 'bg-yellow-50',
    emoji: '🎮',
  },
  {
    title: 'OWP Forum Website',
    description:
      'RESTful API and community forum for the Office of Water Programs at Sacramento State. Building backend CRUD operations, relational database architecture, and Vue.js frontend integration.',
    tech: ['PHP', 'Vue.js', 'REST API', 'SQL', 'Auth/Middleware'],
    color: 'bg-green-50',
    emoji: '💧',
  },
  {
    title: 'Web Load Tester',
    description:
      'Concurrent load testing tool using Java virtual threads to simulate high-volume traffic against web endpoints. Measures response times, throughput, and failure rates under stress.',
    tech: ['Java', 'Virtual Threads', 'Concurrency', 'Performance Testing'],
    color: 'bg-red-50',
    emoji: '⚡',
  },
  {
    title: 'Restaurant App',
    description:
      'Android mobile app for browsing menus, placing orders, and managing restaurant information. Built as a personal project to explore native Android development.',
    tech: ['Android Studio', 'Java', 'Mobile Dev'],
    color: 'bg-cyan-50',
    emoji: '🍽️',
  },
  {
    title: 'Portfolio Website',
    description:
      'This site! A bento-grid portfolio built with React and TypeScript. Features a Formspree-powered contact form and Cloudflare Pages hosting.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/JeffreySardella/portfolio',
    color: 'bg-purple-50',
    emoji: '✨',
  },
]

function ProjectsSection() {
  return (
    <section id="projects" className="py-8 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Section header - full width */}
        <div className="md:col-span-2 lg:col-span-3 px-2 mb-2">
          <p className="text-xs text-text-muted uppercase tracking-widest mb-1">What I've built</p>
          <h2 className="text-2xl font-bold">
            Projects<span className="text-primary">.</span>
          </h2>
        </div>

        {/* Featured project - large card */}
        <div className="bento-card md:row-span-2 p-0 overflow-hidden">
          <div className={`${projects[0].color} p-8 min-h-[200px] flex items-center justify-center`}>
            <span className="text-7xl">{projects[0].emoji}</span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{projects[0].title}</h3>
            <p className="text-sm text-text-muted mb-4 leading-relaxed">{projects[0].description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {projects[0].tech.map((t) => (
                <span key={t} className="px-2.5 py-1 bg-bg rounded-md text-xs font-medium text-text-muted">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {projects[0].github && (
                <a
                  href={projects[0].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-primary transition-colors"
                >
                  GitHub
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
              {projects[0].live && (
                <a
                  href={projects[0].live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-primary transition-colors"
                >
                  Live Site
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Other project cards */}
        {projects.slice(1).map((project) => (
          <div key={project.title} className="bento-card p-6">
            <div className="flex items-start gap-4 mb-3">
              <div className={`w-12 h-12 rounded-xl ${project.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {project.emoji}
              </div>
              <div>
                <h3 className="font-bold mb-1">{project.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{project.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 bg-bg rounded-md text-xs font-medium text-text-muted">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-primary transition-colors"
                >
                  GitHub
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-primary transition-colors"
                >
                  Live Site
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
