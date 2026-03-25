import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectGridCard from '../components/ProjectGridCard'

const featuredProjects = projects.filter((p) => p.featured)
const moreProjects = projects.filter((p) => !p.featured)

export default function ProjectsSection() {
  return (
    <section id="projects" aria-label="Projects" className="py-20 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">Projects</h2>

        {/* Featured projects — full-width alternating layout */}
        <div className="mt-12">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* More projects — compact grid */}
        <h3 className="text-xl font-heading font-bold text-text-muted mt-16 mb-8">
          More Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moreProjects.map((project) => (
            <ProjectGridCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
