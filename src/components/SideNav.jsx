import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const SCRAMBLE_DURATION = 500

const NAV_ITEMS = [
  { id: 'hero', label: 'BERANDA', number: '01', path: '/' },
  { id: 'about', label: 'ANGGOTA', number: '02', path: '/about' },
  { id: 'skills', label: 'SKILLS', number: '03', path: '/skills' },
  { id: 'work', label: 'PROYEK', number: '04', path: '/projects' },
  { id: 'products', label: 'PRODUK', number: '05', path: '/products' },
  { id: 'contact', label: 'KONTAK', number: '06', path: '/contact' },
]

function NavLinkItem({ item, isActive, onClick }) {
  const [displayText, setDisplayText] = useState(item.label)
  const isAnimatingRef = useRef(false)
  const rafRef = useRef(null)

  const handleMouseEnter = () => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    const startTime = performance.now()
    const length = item.label.length

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1)
      const iteration = progress * length

      let output = ''
      for (let i = 0; i < length; i++) {
        const char = item.label[i]
        if (char === ' ') {
          output += ' '
        } else if (i <= iteration) {
          output += char
        } else {
          output += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        }
      }
      setDisplayText(output)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayText(item.label)
        isAnimatingRef.current = false
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <a
      href={`#${item.id}`}
      onClick={(e) => {
        e.preventDefault()
        onClick(item)
      }}
      onMouseEnter={handleMouseEnter}
      className={`group flex items-center gap-2 md:gap-3 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all py-1 ${
        isActive ? 'is-active' : ''
      }`}
      data-nav={item.id}
      aria-label={`Navigasi ${item.label}`}
      aria-current={isActive ? 'true' : undefined}
    >
      <span
        className={`hidden md:inline-block font-mono text-[10px] text-forest transition-all duration-300 ${
          isActive
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2'
        }`}
      >
        {item.number}
      </span>
      <span
        className={`nav-label font-mono hidden md:inline-block transition-transform duration-300 group-hover:-translate-x-1 ${
          isActive ? '-translate-x-1 text-forest' : ''
        }`}
        data-text={item.label}
      >
        {displayText}
      </span>
      <span
        className={`nav-dash h-0.5 rounded-full bg-current transition-all duration-300 ${
          isActive
            ? 'w-6 md:w-8 bg-forest'
            : 'w-3 group-hover:w-6 md:group-hover:w-8 group-hover:bg-forest'
        }`}
      />
    </a>
  )
}

export default function SideNav({ darkMode, setDarkMode }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [isOverDark, setIsOverDark] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [isHeroNavVisible, setIsHeroNavVisible] = useState(false)
  const isNavVisible = location.pathname !== '/' || isHeroNavVisible

  useEffect(() => {
    const handleShowNav = () => {
      setIsHeroNavVisible(true)
    }

    window.addEventListener('hero:show-nav', handleShowNav)
    return () => window.removeEventListener('hero:show-nav', handleShowNav)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const centerY = window.innerHeight / 2
      const aboutEl = document.getElementById('about')

      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect()
        setIsOverDark(rect.top <= centerY && rect.bottom >= centerY)
      } else {
        setIsOverDark(false)
      }

      if (location.pathname === '/') {
        let currentId = 'hero'
        for (const item of NAV_ITEMS) {
          const el = document.getElementById(item.id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
              currentId = item.id
            }
          }
        }
        setActiveSection(currentId)
      } else {
        const found = NAV_ITEMS.find((it) => it.path === location.pathname)
        if (found) setActiveSection(found.id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [location.pathname])

  const handleClick = (item) => {
    if (location.pathname === '/') {
      if (item.id === 'hero') {
        if (window.lenis) {
          window.lenis.scrollTo(0, { duration: 1.2 })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else {
        const el = document.getElementById(item.id)
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { duration: 1.2 })
          } else {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        } else {
          navigate(item.path)
        }
      }
    } else {
      navigate(item.path)
    }
  }

  const textColorClass = darkMode || isOverDark ? 'text-cream over-dark' : 'text-charcoal'

  return (
    <nav
      id="side-nav"
      className={`fixed right-3 sm:right-5 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3.5 sm:gap-4 md:gap-6 font-display select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isNavVisible
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : 'translate-x-[150%] opacity-0 pointer-events-none'
      } ${textColorClass}`}
      aria-label="Navigasi Halaman"
    >
      {/* Theme Toggler directly above BERANDA */}
      <div className="side-nav-theme-wrap">
        <AnimatedThemeToggler
          variant="circle"
          duration={500}
          theme={darkMode ? 'dark' : 'light'}
          onThemeChange={(newTheme) => setDarkMode && setDarkMode(newTheme === 'dark')}
          className="side-nav-theme-btn group"
        >
          {({ isDark, SunIcon, MoonIcon }) => (
            <>
              <span className="side-nav-theme-tag font-mono text-[10px] hidden md:inline-block opacity-75 group-hover:opacity-100 transition-opacity">
                {isDark ? 'LIGHT' : 'DARK'}
              </span>
              <span className="side-nav-theme-icon-box" aria-hidden="true">
                {isDark ? <SunIcon /> : <MoonIcon />}
              </span>
              <span className="nav-dash side-nav-theme-dash" aria-hidden="true" />
            </>
          )}
        </AnimatedThemeToggler>
        <div className="side-nav-theme-divider" aria-hidden="true" />
      </div>

      {NAV_ITEMS.map((item) => (
        <NavLinkItem
          key={item.id}
          item={item}
          isActive={activeSection === item.id}
          onClick={handleClick}
        />
      ))}
    </nav>
  )
}
