import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' },
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="nav wrap" role="banner">
      <Link
        to="/"
        className="wordmark"
        onClick={closeMenu}
        aria-label="Duo Portfolio home"
      >
        DUO<span>®</span>
      </Link>

      <nav
        className={`nav-links ${menuOpen ? 'open' : ''}`}
        aria-label="Main navigation"
      >
        {navLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            {item.label}
          </NavLink>
        ))}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </nav>

      <button
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}
