import { useState, useEffect, useRef } from 'react'
import PixelSwap from './PixelSwap'

const TASK_CARDS = [
  {
    id: 1,
    title: 'Tubes Java OOP',
    dl: 'DL - BESOK 08.00',
    icon: '<>',
    pos: { top: '14%', left: '12%' },
    tilt: '-7deg',
    animClass: 'float-anim-1',
    delay: 0.08,
  },
  {
    id: 2,
    title: 'Analisis Regresi',
    dl: 'DL - LUSA',
    icon: '📊',
    pos: { top: '51%', left: '9%' },
    tilt: '-4deg',
    animClass: 'float-anim-4',
    delay: 0.16,
  },
  {
    id: 3,
    title: 'Bot Telegram',
    dl: 'DL - 36 JAM',
    icon: '🤖',
    pos: { top: '84%', left: '13%' },
    tilt: '-6deg',
    animClass: 'float-anim-6',
    delay: 0.24,
  },
  {
    id: 4,
    title: 'Tugas Mingguan',
    dl: 'DL - 23.59',
    icon: '⏱',
    pos: { top: '12%', left: '52%', transform: 'translateX(-50%)' },
    tilt: '-6deg',
    animClass: 'float-anim-2',
    delay: 0.32,
  },
  {
    id: 5,
    title: 'Dashboard Next.js',
    dl: 'DL - 2 HARI',
    icon: '▤',
    pos: { top: '16%', right: '18%' },
    tilt: '-4deg',
    animClass: 'float-anim-3',
    delay: 0.40,
  },
  {
    id: 6,
    title: 'Laporan Magang',
    dl: 'DL - JUMAT',
    icon: '📋',
    pos: { top: '53%', right: '14%' },
    tilt: '-4deg',
    animClass: 'float-anim-5',
    delay: 0.48,
  },
  {
    id: 7,
    title: 'ERD + DFD',
    dl: 'DL - MALAM INI',
    icon: '🗄',
    pos: { top: '82%', right: '19%' },
    tilt: '-5deg',
    animClass: 'float-anim-7',
    delay: 0.56,
  },
]

export default function Hero() {
  const [animationStep, setAnimationStep] = useState('dropping') // 'dropping' | 'revealed'
  const [isPixelActive, setIsPixelActive] = useState(false)
  const isTransitioningRef = useRef(false)
  const isDoneRef = useRef(false)
  const touchStartY = useRef(0)

  // 1. Entrance orchestration: ball drops and bounces while sidebar is hidden.
  // When entrance effect finishes (~1050ms), reveal text, cards, and sidebar simultaneously.
  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setAnimationStep('revealed')
      window.dispatchEvent(new CustomEvent('hero:show-nav'))
    }, 1050)

    return () => clearTimeout(revealTimer)
  }, [])

  // 2. Section pin & PixelSwap scroll transition orchestration (no free scrolling at Hero)
  useEffect(() => {
    let lockAttempts = 0
    const lockInterval = setInterval(() => {
      if (window.lenis && !isDoneRef.current) {
        window.lenis.stop()
        clearInterval(lockInterval)
      } else if (++lockAttempts > 30) {
        clearInterval(lockInterval)
      }
    }, 100)

    const triggerPixelTransition = () => {
      if (!isDoneRef.current && !isTransitioningRef.current) {
        isTransitioningRef.current = true
        setIsPixelActive(true)
      }
    }

    const handleWheel = (e) => {
      if (window.scrollY <= 15 && e.deltaY > 0) {
        if (!isDoneRef.current) {
          e.preventDefault()
          e.stopPropagation()
          triggerPixelTransition()
        }
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (window.scrollY <= 15) {
        const delta = touchStartY.current - e.touches[0].clientY
        if (delta > 15 && !isDoneRef.current) {
          e.preventDefault()
          triggerPixelTransition()
        }
      }
    }

    const handleKeyDown = (e) => {
      if (window.scrollY <= 15 && !isDoneRef.current) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault()
          triggerPixelTransition()
        }
      }
    }

    const handleScrollReset = () => {
      if (window.scrollY <= 10 && isDoneRef.current) {
        if (!isTransitioningRef.current) {
          isTransitioningRef.current = true
          setIsPixelActive(false)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScrollReset, { passive: true })

    return () => {
      clearInterval(lockInterval)
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScrollReset)
    }
  }, [])

  const handlePixelComplete = (to) => {
    isTransitioningRef.current = false
    if (to) {
      isDoneRef.current = true
      const about = document.getElementById('about')
      if (about) {
        about.scrollIntoView({ behavior: 'instant' })
        window.dispatchEvent(new Event('scroll'))
      }
      if (window.lenis) window.lenis.start()
    } else {
      isDoneRef.current = false
      if (window.lenis) window.lenis.stop()
    }
  }

  const isRevealed = animationStep === 'revealed'

  const heroContent = (
    <div
      className="hero-reel-section"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--paper)',
      }}
    >
      {/* Background subtle technical grid (32px milimeter grid from screenshot) */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Kinetic Bouncing Ball — drops from top, squashes and bounces, then settles */}
      {!isRevealed && (
        <div className="hero-ball-stage" aria-hidden="true">
          <div className="hero-ball-wrapper">
            <div className="hero-ball" />
            <div className="hero-ball-shadow" />
          </div>
        </div>
      )}

      {/* 7 Floating Task Cards in 3D Space (Screenshot Layout) */}
      {TASK_CARDS.map((card) => (
        <div
          key={card.id}
          className={`hero-floating-card ${card.animClass}`}
          style={{
            ...card.pos,
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed
              ? `scale(1) rotate(${card.tilt})`
              : `scale(0.3) rotate(${card.tilt})`,
            transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${card.delay}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${card.delay}s`,
            pointerEvents: isRevealed ? 'auto' : 'none',
          }}
        >
          <div className="card-icon-box" aria-hidden="true">
            {card.icon}
          </div>
          <div className="card-info">
            <span className="card-title">{card.title}</span>
            <span className="card-dl">{card.dl}</span>
          </div>
        </div>
      ))}

      {/* Centerpiece: Clean Headline (We make [digital] feel human.) */}
      <div
        className="hero-center-box"
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h1 className="hero-reel-title">
          We make<br />
          <span className="hero-digital-badge">digital</span> feel <em>human.</em>
        </h1>
      </div>
    </div>
  )

  const aboutTargetContent = (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, #000000 70%)',
      }}
    />
  )

  return (
    <section
      id="hero"
      aria-label="Hero section"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundColor: 'var(--paper)',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <PixelSwap
        firstContent={heroContent}
        secondContent={aboutTargetContent}
        active={isPixelActive}
        pixelSize={64}
        gap={0}
        pixelRadius={0}
        pixelSpin={0}
        pixelScale={0.35}
        duration={1200}
        pixelDuration={400}
        pattern="random"
        randomness={0}
        fade
        trigger="none"
        onComplete={handlePixelComplete}
      />
    </section>
  )
}
