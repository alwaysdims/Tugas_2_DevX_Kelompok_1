import { useEffect, useRef, useState } from 'react'

export default function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null)
  const [revealed, setRevealed] = useState(
    () => typeof IntersectionObserver === 'undefined'
  )

  useEffect(() => {
    const node = cardRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleSelect = () => onSelect?.(project)

  return (
    <article
      ref={cardRef}
      className={`featured-project${revealed ? ' is-revealed' : ''}`}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleSelect()
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      <div className="featured-info">
        <span className="featured-number">{project.number}</span>
        <div className="featured-info-body">
          <span className="featured-type">
            {project.type || project.category}
            {project.year ? ` · ${project.year}` : ''}
          </span>
          <h3 className="featured-title">{project.title}</h3>
          {project.technologies && (
            <ul className="featured-tags">
              {project.technologies.map((tech) => (
                <li key={tech} className="featured-tag">
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="featured-media">
        <img
          loading="lazy"
          src={project.image}
          alt={`${project.title} website screenshot`}
        />
      </div>

    </article>
  )
}
