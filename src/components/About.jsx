import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { members } from '../data/members'
import About3D from './About3D'

const MOVIE_WORDS = ['ORANG', 'DI', 'BALIK', 'INI']

// ponytail: 3-slide cinematic presentation with word-by-word movie lock. upgrade when multi-chapter horizontal scroll needed.
export default function About({ darkMode, show3DByDefault = false }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [introCompleted, setIntroCompleted] = useState(false)
  const [visibleWordsCount, setVisibleWordsCount] = useState(0)
  const [show3DModal, setShow3DModal] = useState(show3DByDefault)
  const slideContainerRef = useRef(null)
  const isScrollingRef = useRef(false)

  // Word-by-word cinematic movie title sequence
  useEffect(() => {
    let wordTimer
    const animateNextWord = (index) => {
      if (index <= MOVIE_WORDS.length) {
        setVisibleWordsCount(index)
        if (index < MOVIE_WORDS.length) {
          wordTimer = setTimeout(() => {
            animateNextWord(index + 1)
          }, 550) // 550ms cinematic cadence
        } else {
          // All words shown, wait a moment then unlock scrolling
          wordTimer = setTimeout(() => {
            setIntroCompleted(true)
          }, 600)
        }
      }
    }

    const startDelay = setTimeout(() => {
      animateNextWord(1)
    }, 400)

    return () => {
      clearTimeout(startDelay)
      clearTimeout(wordTimer)
    }
  }, [])

  // Skip animation for accessibility or impatient users
  const handleSkipIntro = () => {
    setVisibleWordsCount(MOVIE_WORDS.length)
    setIntroCompleted(true)
  }

  // Slide navigation with lock check
  const goToSlide = (index) => {
    if (!introCompleted && index > 0) return
    if (index >= 0 && index <= 2) {
      setCurrentSlide(index)
    }
  }

  const nextSlide = () => {
    if (!introCompleted) return
    if (currentSlide < 2) {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  // Wheel handling inside slide viewport
  const handleWheel = (e) => {
    if (!introCompleted) return
    if (isScrollingRef.current) return

    if (e.deltaY > 30) {
      if (currentSlide < 2) {
        e.preventDefault()
        isScrollingRef.current = true
        setCurrentSlide((prev) => prev + 1)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 650)
      }
      // If at last slide (2), allow default wheel scroll to proceed to next section
    } else if (e.deltaY < -30) {
      if (currentSlide > 0) {
        e.preventDefault()
        isScrollingRef.current = true
        setCurrentSlide((prev) => prev - 1)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 650)
      }
    }
  }

  const dimas = members.find((m) => m.name.toLowerCase() === 'dimas') || members[0]
  const lutfi = members.find((m) => m.name.toLowerCase() === 'lutfi') || members[1]

  return (
    <section
      className="about-slider-section section-pad"
      id="about"
      ref={slideContainerRef}
      onWheel={handleWheel}
      aria-label="About section — People Behind Duo"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="about-slider-top">
          <div className="eyebrow">
            <span>01 / ABOUT THE CREATORS</span>
            <span className="eyebrow-dot" />
          </div>
          <div className="about-slide-pagination">
            <span className="slide-counter">
              0{currentSlide + 1} <i>/</i> 03
            </span>
            <div className="slide-pills" role="tablist" aria-label="About slides">
              <button
                type="button"
                className={`slide-pill ${currentSlide === 0 ? 'active' : ''}`}
                onClick={() => goToSlide(0)}
                aria-label="Slide 1: Intro"
                role="tab"
                aria-selected={currentSlide === 0}
              >
                01 INTRO
              </button>
              <button
                type="button"
                className={`slide-pill ${currentSlide === 1 ? 'active' : ''} ${!introCompleted ? 'locked' : ''}`}
                onClick={() => goToSlide(1)}
                disabled={!introCompleted}
                aria-label="Slide 2: Dimas"
                role="tab"
                aria-selected={currentSlide === 1}
                title={!introCompleted ? 'Complete intro animation to unlock' : 'About Dimas'}
              >
                02 DIMAS {!introCompleted && '🔒'}
              </button>
              <button
                type="button"
                className={`slide-pill ${currentSlide === 2 ? 'active' : ''} ${!introCompleted ? 'locked' : ''}`}
                onClick={() => goToSlide(2)}
                disabled={!introCompleted}
                aria-label="Slide 3: Lutfi"
                role="tab"
                aria-selected={currentSlide === 2}
                title={!introCompleted ? 'Complete intro animation to unlock' : 'About Lutfi'}
              >
                03 LUTFI {!introCompleted && '🔒'}
              </button>
            </div>
          </div>
        </div>

        {/* Slide Stage */}
        <div className="about-slide-stage">
          {/* SLIDE 0: CINEMATIC WORD-BY-WORD TITLE */}
          <div className={`about-slide slide-intro ${currentSlide === 0 ? 'slide-active' : 'slide-hidden'}`}>
            <div className="cinematic-box">
              <span className="cinematic-kicker">CINEMATIC INTRODUCTION</span>

              <h2 className="cinematic-title" aria-label="Orang di balik ini">
                {MOVIE_WORDS.map((word, idx) => {
                  const isVisible = idx < visibleWordsCount
                  return (
                    <span
                      key={word}
                      className={`movie-word ${isVisible ? 'word-show' : 'word-hide'}`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {word}
                      {idx < MOVIE_WORDS.length - 1 && <span className="word-space">&nbsp;</span>}
                    </span>
                  )
                })}
              </h2>

              <p className="cinematic-sub">
                Two minds shaping thoughtful digital experiences through architectural design and reactive code.
              </p>

              {/* Status and Action Cue */}
              <div className="cinematic-footer">
                {!introCompleted ? (
                  <div className="cinematic-locked-cue">
                    <span className="cue-dot-pulsing" aria-hidden="true" />
                    <span>PLAYING SEQUENCE... (SCROLL LOCKED)</span>
                    <button type="button" className="cue-skip-btn" onClick={handleSkipIntro}>
                      SKIP [ESC]
                    </button>
                  </div>
                ) : (
                  <div className="cinematic-unlocked-cue">
                    <button
                      type="button"
                      className="cinematic-proceed-btn"
                      onClick={() => goToSlide(1)}
                    >
                      <span>MEET THE CREATORS</span>
                      <span className="cue-arrow">↓</span>
                    </button>
                    <span className="unlocked-hint">SCROLL DOWN OR CLICK TO PROCEED</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SLIDE 1: ABOUT DIMAS */}
          <div className={`about-slide slide-member ${currentSlide === 1 ? 'slide-active' : 'slide-hidden'}`}>
            <div className="member-grid">
              <div className="member-meta-col">
                <span className="member-num">01 / CREATIVE DUO</span>
                <h3 className="member-name">{dimas.name}</h3>
                <span className="member-nim">NIM: {dimas.nim}</span>
                <p className="member-role">{dimas.role}</p>

                <p className="member-bio">{dimas.bio}</p>

                <div className="member-tags">
                  {dimas.responsibilities.map((item) => (
                    <span key={item} className="member-tag">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="member-actions">
                  <Link to="/skills" className="member-link-btn">
                    VIEW SKILLS ↗
                  </Link>
                  <button
                    type="button"
                    className="member-3d-btn"
                    onClick={() => setShow3DModal(true)}
                  >
                    INSPECT 3D SCULPTURE ✳
                  </button>
                </div>
              </div>

              <div className="member-visual-col">
                <div className="member-portrait-wrap">
                  <img
                    src={dimas.image}
                    alt="Dimas portrait"
                    loading="lazy"
                  />
                  <div className="member-portrait-badge">
                    <span>DIMAS · VISUAL & LAYOUT</span>
                    <small>STUDENT & DEVELOPER</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2: ABOUT LUTFI */}
          <div className={`about-slide slide-member ${currentSlide === 2 ? 'slide-active' : 'slide-hidden'}`}>
            <div className="member-grid">
              <div className="member-meta-col">
                <span className="member-num">02 / CREATIVE DUO</span>
                <h3 className="member-name">{lutfi.name}</h3>
                <span className="member-nim">NIM: {lutfi.nim}</span>
                <p className="member-role">{lutfi.role}</p>

                <p className="member-bio">{lutfi.bio}</p>

                <div className="member-tags">
                  {lutfi.responsibilities.map((item) => (
                    <span key={item} className="member-tag">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="member-actions">
                  <Link to="/projects" className="member-link-btn">
                    VIEW PROJECTS ↗
                  </Link>
                  <button
                    type="button"
                    className="member-3d-btn"
                    onClick={() => setShow3DModal(true)}
                  >
                    INSPECT 3D SCULPTURE ✳
                  </button>
                </div>
              </div>

              <div className="member-visual-col">
                <div className="member-portrait-wrap">
                  <img
                    src={lutfi.image}
                    alt="Lutfi portrait"
                    loading="lazy"
                  />
                  <div className="member-portrait-badge">
                    <span>LUTFI · INTERACTION & COMPONENTS</span>
                    <small>STUDENT & DEVELOPER</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls & Bottom Nav */}
        <div className="about-slider-controls">
          <div className="controls-nav-btns">
            <button
              type="button"
              className="slide-arrow-btn"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
            >
              ← PREV
            </button>
            <button
              type="button"
              className="slide-arrow-btn"
              onClick={nextSlide}
              disabled={currentSlide === 2 || (!introCompleted && currentSlide === 0)}
              aria-label="Next slide"
            >
              NEXT →
            </button>
          </div>

          <div className="controls-hint">
            <span>
              {currentSlide === 0 && !introCompleted && 'LOCK: WAITING FOR MOVIE INTRO...'}
              {currentSlide === 0 && introCompleted && 'UNLOCKED: SCROLL OR USE ARROWS'}
              {currentSlide === 1 && 'SLIDE 2 OF 3 · DIMAS (VISUAL)'}
              {currentSlide === 2 && 'SLIDE 3 OF 3 · LUTFI (INTERACTION)'}
            </span>
          </div>
        </div>

        {/* 3D Sculpture Section Embed or Modal */}
        {show3DModal && (
          <div className="about-3d-drawer" role="dialog" aria-modal="true" aria-label="3D Duo Core Sculpture">
            <div className="about-3d-drawer-content">
              <button
                type="button"
                className="about-3d-drawer-close"
                onClick={() => setShow3DModal(false)}
                aria-label="Close 3D sculpture viewer"
              >
                ✕
              </button>
              <About3D darkMode={darkMode} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
