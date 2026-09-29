import { useEffect, useState } from 'react'

// ponytail: basic counter with staggered shutter exit. upgrade when complex timeline orchestrator needed.
export default function IntroLoader({ onComplete, onExitStart }) {
  const [progress, setProgress] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const phrases = [
    'TWO MINDS',
    'ONE DIGITAL SPACE',
    'CRAFTING INTENTIONAL EXPERIENCES',
    'WE MAKE DIGITAL FEEL HUMAN',
  ]

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onExitStart?.()
      onComplete?.()
      return
    }

    let current = 0
    const interval = setInterval(() => {
      // Natural Awwwards-style easing: slows slightly towards the end
      const remaining = 100 - current
      const step = Math.max(1, Math.floor(remaining * 0.14) + Math.floor(Math.random() * 3))
      current = Math.min(100, current + step)
      setProgress(current)

      if (current < 30) setCurrentWordIndex(0)
      else if (current < 65) setCurrentWordIndex(1)
      else if (current < 90) setCurrentWordIndex(2)
      else setCurrentWordIndex(3)

      if (current >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsExiting(true)
          onExitStart?.()
          setTimeout(() => {
            onComplete?.()
          }, 850)
        }, 250)
      }
    }, 45)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearInterval(interval)
        setIsExiting(true)
        onExitStart?.()
        setTimeout(() => onComplete?.(), 300)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onComplete, onExitStart])

  const skip = () => {
    setIsExiting(true)
    onExitStart?.()
    setTimeout(() => onComplete?.(), 300)
  }

  return (
    <aside className={`intro-loader ${isExiting ? 'exit' : ''}`} aria-label="Loading animation">
      {/* 4 Staggered vertical shutter blinds */}
      <div className="loader-shutters" aria-hidden="true">
        <div className="shutter shutter-1" />
        <div className="shutter shutter-2" />
        <div className="shutter shutter-3" />
        <div className="shutter shutter-4" />
      </div>

      <div className="loader-content">
        <header className="loader-header">
          <span className="loader-brand">DUO<span>®</span> / STUDIO</span>
          <span className="loader-meta">EST. 2024 · INDONESIA</span>
        </header>

        <div className="loader-center">
          <div className="loader-phrase-box" aria-live="polite">
            <span key={currentWordIndex} className="loader-phrase">
              {phrases[currentWordIndex]}
            </span>
          </div>

          <div className="loader-counter">
            <span className="loader-num">{String(progress).padStart(2, '0')}</span>
            <span className="loader-percent">%</span>
          </div>

          <div className="loader-bar-wrap">
            <div
              className="loader-bar"
              style={{ transform: `scaleX(${progress / 100})` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        <footer className="loader-footer">
          <span>INITIALIZING DIGITAL CANVAS</span>
          <button type="button" className="loader-skip" onClick={skip}>
            SKIP [ESC]
          </button>
        </footer>
      </div>
    </aside>
  )
}
