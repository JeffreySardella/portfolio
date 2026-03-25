import type { Project } from '../data/projects'

interface ProjectGridCardProps {
  project: Project
}

export default function ProjectGridCard({ project }: ProjectGridCardProps) {
  return (
    <div className="bg-bg-surface border border-border rounded-lg p-6 hover:bg-bg-elevated transition-colors">
      <h3 className="font-heading font-bold text-lg text-text">{project.title}</h3>

      <p className="text-text-muted text-sm mt-2 leading-relaxed">{project.description}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {project.techTags.map((tag) => (
          <span
            key={tag}
            className="bg-bg-elevated text-text-muted text-xs font-mono px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-4">
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
  )
}
