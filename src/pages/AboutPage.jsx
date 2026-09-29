import { useOutletContext, Link } from 'react-router-dom'
import About from '../components/About'
import About3D from '../components/About3D'
import { members } from '../data/members'

export default function AboutPage() {
  const { darkMode } = useOutletContext()

  return (
    <div className="page-view about-page">
      <div className="wrap page-header">
        <div className="eyebrow">
          <span>DUO® / STUDIO ARCHITECTURE</span>
          <span className="eyebrow-dot" />
        </div>
        <h1 className="page-title">
          Two minds.<br />
          <em>One digital space.</em>
        </h1>
        <p className="page-lead">
          We’re Lutfi and Dimas — developers shaping thoughtful web experiences through visual tension, editorial typography, and reactive interaction.
        </p>
      </div>

      {/* Cinematic Slide Component */}
      <About darkMode={darkMode} />

      {/* Dedicated 3D Core Sculpture Showcase */}
      <section className="about-3d-feature section-pad wrap">
        <div className="section-head">
          <div className="eyebrow">
            <span>3D SPATIAL ARTIFACT</span>
            <span className="eyebrow-dot" />
          </div>
          <p>
            Interactive Duo Core.<br />
            Three geometric states.
          </p>
        </div>
        <About3D darkMode={darkMode} />
      </section>

      {/* Member Details Comparison Table */}
      <section className="team-breakdown section-pad wrap">
        <div className="section-head">
          <div className="eyebrow">
            <span>DIVISION OF RESPONSIBILITY</span>
            <span className="eyebrow-dot" />
          </div>
          <p>Balanced execution. No passenger roles.</p>
        </div>

        <div className="members-detail-grid">
          {members.map((member) => (
            <article key={member.id} className="member-detail-card">
              <div className="member-card-header">
                <span className="member-card-num">0{member.id}</span>
                <span className="member-card-nim">{member.nim}</span>
              </div>
              <h3>{member.name}</h3>
              <span className="member-card-role">{member.role}</span>
              <p className="member-card-bio">{member.bio}</p>
              <div className="member-responsibilities">
                <h4>CORE FOCUS</h4>
                <ul>
                  {member.responsibilities.map((resp) => (
                    <li key={resp}>{resp}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="about-cta-bar">
          <span>WANT TO SEE WHAT WE BUILT TOGETHER?</span>
          <Link to="/projects" className="about-cta-btn">
            EXPLORE SELECTED WORK →
          </Link>
        </div>
      </section>
    </div>
  )
}
