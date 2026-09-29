import Skills from '../components/Skills'
import { skills } from '../data/skills'
import { Link } from 'react-router-dom'

export default function SkillsPage() {
  return (
    <div className="page-view skills-page">
      <div className="wrap page-header">
        <div className="eyebrow">
          <span>DUO® / CAPABILITIES</span>
          <span className="eyebrow-dot" />
        </div>
        <h1 className="page-title">
          Curiosity backed by<br />
          <em>deliberate craft.</em>
        </h1>
        <p className="page-lead">
          From semantic HTML to 3D WebGL canvases, our stack prioritizes clean fundamentals, accessible interactions, and fluid motion.
        </p>
      </div>

      <Skills />

      <section className="skills-matrix section-pad wrap">
        <div className="section-head">
          <div className="eyebrow">
            <span>DETAILED BREAKDOWN</span>
            <span className="eyebrow-dot" />
          </div>
          <p>Proficiency & Application.</p>
        </div>

        <div className="skills-grid-detailed">
          {skills.map((s) => (
            <div key={s.id} className="skill-detail-box">
              <div className="skill-box-header">
                <span className="skill-box-cat">{s.category}</span>
                <span className="skill-box-level">{s.level}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="about-cta-bar">
          <span>READY TO DISCUSS A PROJECT?</span>
          <Link to="/contact" className="about-cta-btn">
            LET’S TALK →
          </Link>
        </div>
      </section>
    </div>
  )
}
