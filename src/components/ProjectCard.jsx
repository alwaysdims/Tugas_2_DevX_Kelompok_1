function Arrow({ diagonal = false }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? '↗' : '→'}
    </span>
  )
}

export default function ProjectCard({ project, onSelect }) {
  return (
    <article
      className={`project-card project-${project.number}`}
      onClick={() => onSelect?.(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(project)
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      <div className="project-image">
        <img
          loading="lazy"
          src={project.image}
          alt={`${project.title} project showcase`}
        />
        <span className="project-open">
          <Arrow diagonal />
        </span>
        <span className="project-image-label">DUO® / SELECTED WORK</span>
      </div>

      <div className="project-info">
        <div>
          <span className="project-type">
            {project.type || project.category} · {project.year}
          </span>
          <h3>{project.title}</h3>
          {project.technologies && (
            <div className="project-card-tags">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="project-mini-tag">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="project-number">{project.number}</span>
      </div>
    </article>
  )
}
