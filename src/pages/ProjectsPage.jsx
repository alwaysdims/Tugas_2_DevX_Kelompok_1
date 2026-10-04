import { useOutletContext, Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function ProjectsPage() {
  const { setSelectedItem } = useOutletContext()

  return (
    <div className="page-view projects-page">
      <div className="wrap page-header">
        <div className="eyebrow">
          <span>DUO® / PROJECT ARCHIVE</span>
          <span className="eyebrow-dot" />
        </div>
        <h1 className="page-title">
          Featured<br />
          <em>Projects.</em>
        </h1>
        <p className="page-lead">
          A short archive of digital platforms and web experiences — built with
          React and modern design systems, shown screen by screen.
        </p>
      </div>

      <section className="work-archive section-pad wrap">
        <div className="featured-projects">
          {projects.map((project) => (
            <ProjectCard
              key={project.id || project.number}
              project={project}
              onSelect={(p) => setSelectedItem(p)}
            />
          ))}
        </div>

        <div className="about-cta-bar" style={{ marginTop: '90px' }}>
          <span>HAVE A UNIQUE BRIEF IN MIND?</span>
          <Link to="/contact" className="about-cta-btn">
            START A CONVERSATION →
          </Link>
        </div>
      </section>
    </div>
  )
}
