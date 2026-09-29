import { Link } from 'react-router-dom'

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer wrap" role="contentinfo">
      <Link to="/" className="wordmark" aria-label="Duo Portfolio home">
        DUO<span>®</span>
      </Link>
      <span>LUTFI (2604140069) × DIMAS (2605090004) · © 2026</span>
      <a href="#top" onClick={scrollToTop} className="footer-top-link">
        BACK TO TOP ↑
      </a>
    </footer>
  )
}
