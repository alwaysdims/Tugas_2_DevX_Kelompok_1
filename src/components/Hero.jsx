import { Link } from 'react-router-dom'

function Arrow({ diagonal = false }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? '↗' : '→'}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="hero wrap" id="home" aria-label="Hero section">
      <div className="hero-top">
        <span>INDEPENDENT CREATIVE DUO</span>
        <span>BASED IN INDONESIA · AVAILABLE WORLDWIDE</span>
      </div>

      <h1>
        We make<br />
        <span>digital</span> feel<br className="mobile-break" />{' '}
        <em>human.</em>
      </h1>

      <div className="hero-bottom">
        <p>
          Two developers shaping thoughtful<br className="desktop-break" /> digital experiences.
        </p>
        <Link to="/projects" className="round-link" aria-label="Explore selected work">
          <Arrow />
        </Link>
        <div className="hero-names">
          <span>LUTFI</span>
          <b>×</b>
          <span>DIMAS</span>
        </div>
      </div>

      <div className="hero-art" aria-label="Editorial portrait of creative duo">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85"
          alt="Creative duo collaborating around modern workspace"
          fetchPriority="high"
        />
        <div className="art-note">
          <span>
            GOOD IDEAS<br />TAKE TWO.
          </span>
          <span className="note-star">✳</span>
        </div>
        <span className="art-index">EST. 2024 · ID</span>
      </div>

      <a className="scroll-cue" href="#about">
        <span className="scroll-line" />
        SCROLL TO EXPLORE
      </a>
    </section>
  )
}
