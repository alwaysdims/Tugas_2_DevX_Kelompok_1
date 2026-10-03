import { useState, useEffect, useRef } from 'react'
import About3D from './About3D'
import LightRays from './LightRays'
import ResponsiveLanyard from './ResponsiveLanyard';

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3)
}

export default function About({ darkMode = true, show3DByDefault = false }) {
  const [show3DModal, setShow3DModal] = useState(show3DByDefault)

  const sectionRef = useRef(null)
  const stageIntroRef = useRef(null)
  const slideLutfiRef = useRef(null)
  const slideDimasRef = useRef(null)
  const morphText1Ref = useRef(null)
  const morphText2Ref = useRef(null)

  // ── 1. MagicUI Morphing Text Engine ──
  useEffect(() => {
    const texts = ['', 'ORANG', 'DI BALIK', 'INI', 'ORANG DI BALIK INI']
    const t1 = morphText1Ref.current
    const t2 = morphText2Ref.current
    const section = sectionRef.current
    if (!t1 || !t2 || !section) return

    let textIndex = 0
    const morphTime = 0.75
    const cooldownTime = 0.45
    let morph = 0
    let cooldown = 0
    let lastTime = performance.now()
    let isStarted = false
    let isFinished = false
    let hasTriggeredAutoScroll = false
    let delayTimer = null
    let autoScrollTimer = null
    let rafId = null

    // clean initial state
    t1.textContent = ''
    t2.textContent = ''
    t1.style.filter = 'none'
    t1.style.opacity = '0%'
    t2.style.filter = 'none'
    t2.style.opacity = '0%'

    function onMorphComplete() {
      if (hasTriggeredAutoScroll) return
      hasTriggeredAutoScroll = true

      autoScrollTimer = setTimeout(() => {
        const scrollable = section.offsetHeight - window.innerHeight
        if (scrollable <= 0) return
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const targetScroll = sectionTop + scrollable * 0.42

        if (window.scrollY < sectionTop + scrollable * 0.25) {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' })
        }
      }, 700)
    }

    function setMorphStyles(fraction) {
      fraction = Math.max(0.0001, Math.min(1, fraction))
      const inv = 1 - fraction
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
      t1.style.filter = `blur(${Math.min(8 / Math.max(0.0001, inv) - 8, 100)}px)`
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`
    }

    function doMorph() {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime
      if (fraction > 1) fraction = 1

      setMorphStyles(fraction)

      if (fraction === 1) {
        textIndex++
        morph = 0
        t1.textContent = texts[textIndex] || ''
        t1.style.filter = 'none'
        t1.style.opacity = '100%'
        t2.textContent = ''
        t2.style.filter = 'none'
        t2.style.opacity = '0%'

        if (textIndex >= texts.length - 1) {
          isFinished = true
          onMorphComplete()
        } else if (textIndex === 1) {
          cooldown = 0.6
        } else {
          cooldown = cooldownTime
        }
      }
    }

    function doCooldown() {
      morph = 0
      t1.textContent = texts[textIndex] || ''
      t1.style.filter = 'none'
      t1.style.opacity = '100%'
      t2.textContent = ''
      t2.style.filter = 'none'
      t2.style.opacity = '0%'
    }

    function animate(now) {
      if (isFinished || !isStarted) return
      rafId = requestAnimationFrame(animate)

      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now
      cooldown -= dt

      if (cooldown <= 0) {
        if (t2.textContent === '' && textIndex < texts.length - 1) {
          t2.textContent = texts[textIndex + 1]
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    function startSequence() {
      if (isStarted) return
      isStarted = true
      t1.textContent = ''
      t2.textContent = ''
      t1.style.opacity = '0%'
      t2.style.opacity = '0%'

      delayTimer = setTimeout(() => {
        textIndex = 0
        t1.textContent = ''
        t1.style.opacity = '0%'
        t2.textContent = texts[1]
        t2.style.opacity = '0%'
        lastTime = performance.now()
        cooldown = 0
        rafId = requestAnimationFrame(animate)
      }, 500)
    }

    function checkTrigger() {
      const rect = section.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
        if (!isStarted) startSequence()
      } else if (rect.top > window.innerHeight * 0.7 && isFinished) {
        clearTimeout(delayTimer)
        clearTimeout(autoScrollTimer)
        if (rafId) cancelAnimationFrame(rafId)
        isStarted = false
        isFinished = false
        hasTriggeredAutoScroll = false
        textIndex = 0
        morph = 0
        cooldown = 0.6
        t1.textContent = ''
        t2.textContent = ''
        t1.style.filter = 'none'
        t1.style.opacity = '0%'
        t2.style.filter = 'none'
        t2.style.opacity = '0%'
      }
    }

    window.addEventListener('scroll', checkTrigger, { passive: true })
    window.addEventListener('resize', checkTrigger)
    checkTrigger()

    return () => {
      window.removeEventListener('scroll', checkTrigger)
      window.removeEventListener('resize', checkTrigger)
      clearTimeout(delayTimer)
      clearTimeout(autoScrollTimer)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // ── 2. Scroll-driven Card Stacking ──
  useEffect(() => {
    const section = sectionRef.current
    const stageIntro = stageIntroRef.current
    const slideLutfi = slideLutfiRef.current
    const slideDimas = slideDimasRef.current
    if (!section || !slideLutfi || !slideDimas) return

    function updateSlides() {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1)

      // Stage Intro fade out
      if (stageIntro) {
        if (progress < 0.12) {
          stageIntro.style.transform = 'translate3d(0,0,0) scale(1)'
          stageIntro.style.opacity = '1'
          stageIntro.style.pointerEvents = 'auto'
        } else if (progress < 0.28) {
          const p = (progress - 0.12) / 0.16
          const e = easeInOutCubic(p)
          stageIntro.style.transform = `translate3d(0,${(-12 * e).toFixed(2)}%,0) scale(${(1 - 0.06 * e).toFixed(3)})`
          stageIntro.style.opacity = `${(1 - e).toFixed(3)}`
          stageIntro.style.pointerEvents = 'none'
        } else {
          stageIntro.style.opacity = '0'
          stageIntro.style.pointerEvents = 'none'
        }
      }

      // Slide Lutfi: enter -> pin -> recede
      if (progress < 0.16) {
        slideLutfi.style.transform = 'translate3d(0,100%,0) scale(0.96)'
        slideLutfi.style.opacity = '0'
        slideLutfi.style.filter = 'none'
        slideLutfi.style.pointerEvents = 'none'
      } else if (progress < 0.38) {
        const p = (progress - 0.16) / 0.22
        const e = easeOutCubic(p)
        slideLutfi.style.transform = `translate3d(0,${((1 - e) * 100).toFixed(2)}%,0) scale(${(0.96 + 0.04 * e).toFixed(3)})`
        slideLutfi.style.opacity = `${Math.min(1, 0.2 + 0.8 * e).toFixed(3)}`
        slideLutfi.style.filter = 'none'
        slideLutfi.style.pointerEvents = 'auto'
      } else if (progress < 0.58) {
        slideLutfi.style.transform = 'translate3d(0,0%,0) scale(1)'
        slideLutfi.style.opacity = '1'
        slideLutfi.style.filter = 'none'
        slideLutfi.style.pointerEvents = 'auto'
      } else if (progress < 0.8) {
        const p = (progress - 0.58) / 0.22
        const e = easeInOutCubic(p)
        slideLutfi.style.transform = `translate3d(0,${(-10 * e).toFixed(2)}%,0) scale(${(1 - 0.08 * e).toFixed(3)})`
        slideLutfi.style.opacity = `${(1 - 0.75 * e).toFixed(3)}`
        slideLutfi.style.filter = `brightness(${(1 - 0.6 * e).toFixed(2)})`
        slideLutfi.style.pointerEvents = 'none'
      } else {
        slideLutfi.style.transform = 'translate3d(0,-10%,0) scale(0.92)'
        slideLutfi.style.opacity = '0.25'
        slideLutfi.style.filter = 'brightness(0.4)'
        slideLutfi.style.pointerEvents = 'none'
      }

      // Slide Dimas: enter -> pin
      if (progress < 0.58) {
        slideDimas.style.transform = 'translate3d(0,100%,0) scale(0.96)'
        slideDimas.style.opacity = '0'
        slideDimas.style.pointerEvents = 'none'
      } else if (progress < 0.8) {
        const p = (progress - 0.58) / 0.22
        const e = easeOutCubic(p)
        slideDimas.style.transform = `translate3d(0,${((1 - e) * 100).toFixed(2)}%,0) scale(${(0.96 + 0.04 * e).toFixed(3)})`
        slideDimas.style.opacity = `${Math.min(1, 0.2 + 0.8 * e).toFixed(3)}`
        slideDimas.style.pointerEvents = 'auto'
      } else {
        slideDimas.style.transform = 'translate3d(0,0%,0) scale(1)'
        slideDimas.style.opacity = '1'
        slideDimas.style.pointerEvents = 'auto'
      }
    }

    window.addEventListener('scroll', updateSlides, { passive: true })
    window.addEventListener('resize', updateSlides)
    updateSlides()

    return () => {
      window.removeEventListener('scroll', updateSlides)
      window.removeEventListener('resize', updateSlides)
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ height: '320vh', position: 'relative', backgroundColor: '#000000', color: '#fcf9ea' }}
      aria-label="About — Tim Kami"
    >
      {/* SVG filter for morphing text blend */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="threshold">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>

      {/* Sticky viewport */}
      <div className="about-sticky-stage" style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#000000' }}>

        {/* LightRays Background (khusus About) */}
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        {/* STAGE 1: Morphing Text */}
        <div
          id="stage-intro"
          ref={stageIntroRef}
        >
          <div className="morph-text-container" style={{ filter: 'url(#threshold) blur(0.6px)' }}>
            <span id="morph-text1" ref={morphText1Ref} style={{ position: 'absolute', inset: '0 0 auto', margin: 'auto', display: 'inline-block', width: '100%' }} />
            <span id="morph-text2" ref={morphText2Ref} style={{ position: 'absolute', inset: '0 0 auto', margin: 'auto', display: 'inline-block', width: '100%' }} />
          </div>
        </div>

        {/* STAGE 2: Slide Lutfi */}
        <div
          id="slide-lutfi"
          ref={slideLutfiRef}
          style={{ zIndex: 20, transform: 'translate3d(0,100%,0) scale(0.96)', opacity: 0 }}
        >
          <div className="about-rail-top">
            <span className="about-rail-title">Tim Kami</span>
          </div>

          <div className="about-editorial-layout">
            <div className="about-lanyard-stage">
              <ResponsiveLanyard
                position={[0, 0, 13]}
                gravity={[0, -40, 0]}
                frontImage="/lutfi.jpeg"
                backImage="/lutfi.jpeg"
                imageFit="cover"
              />
            </div>

            <div className="about-details-col">
              <div className="about-details-header">
                <div className="about-telemetry-meta font-mono">
                  <div className="about-role-pill">
                    <span className="role-dot" />
                    <span>FRONTEND LEAD</span>
                  </div>
                  <span className="about-id-tag">NIM 2604140069</span>
                  <span className="about-week-tag">TUGAS WEEK 2</span>
                </div>

                <h3 className="about-person-name">LUTFI</h3>
                <p className="about-person-sub">Fondasi Teknis, Semantik HTML5, & Tailwind CLI</p>
              </div>

              <p className="about-person-desc">
                Menginisialisasi seluruh arsitektur Tailwind CLI mandiri, merancang kerangka
                HTML5 yang semantik dan ramah aksesibilitas, serta membangun navigasi
                responsif dan komponen interaktif.
              </p>

              <div className="about-spec-grid">
                <div className="about-spec-card">
                  <div className="about-spec-kicker font-mono">01 // FOKUS MODUL</div>
                  <div className="about-spec-val">Projects, Products & Modal</div>
                </div>
                <div className="about-spec-card">
                  <div className="about-spec-kicker font-mono">02 // STANDAR TEKNIS</div>
                  <div className="about-spec-val">Zero-Bloat, Purged Production</div>
                </div>
              </div>

              <div className="about-pills-wrap">
                <span className="about-skill-pill font-mono">[01] HTML5 Semantik</span>
                <span className="about-skill-pill font-mono">[02] React 19</span>
                <span className="about-skill-pill font-mono">[03] Tailwind CLI</span>
                <span className="about-skill-pill font-mono">[04] Git Workflow</span>
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 3: Slide Dimas */}
        <div
          id="slide-dimas"
          ref={slideDimasRef}
          style={{ zIndex: 30, transform: 'translate3d(0,100%,0) scale(0.96)', opacity: 0 }}
        >
          <div className="about-rail-top">
            <span className="about-rail-title">Tim Kami</span>
          </div>

          <div className="about-editorial-layout">
            <div className="about-lanyard-stage">
              <ResponsiveLanyard
                position={[0, 0, 13]}
                gravity={[0, -40, 0]}
                frontImage="/dimas.jpeg"
                backImage="/dimas.jpeg"
                imageFit="cover"
              />
            </div>

            <div className="about-details-col">
              <div className="about-details-header">
                <div className="about-telemetry-meta font-mono">
                  <div className="about-role-pill">
                    <span className="role-dot" />
                    <span>CONTENT & UI SPECIALIST</span>
                  </div>
                  <span className="about-id-tag">NIM 2605090004</span>
                  <span className="about-week-tag">TUGAS WEEK 2</span>
                </div>

                <h3 className="about-person-name">DIMAS</h3>
                <p className="about-person-sub">Konten Orisinal, Layanan, & Aksesibilitas WCAG</p>
              </div>

              <p className="about-person-desc">
                Merumuskan naskah orisinal yang padat dan bebas template AI,
                mengonseptualisasikan kartu keahlian yang informatif, menata struktur visual
                lengkap dengan kanal jejaring, serta menjamin kontras lolos standar WCAG.
              </p>

              <div className="about-spec-grid">
                <div className="about-spec-card">
                  <div className="about-spec-kicker font-mono">01 // FOKUS MODUL</div>
                  <div className="about-spec-val">Visual, 3D Core & Layout</div>
                </div>
                <div className="about-spec-card">
                  <div className="about-spec-kicker font-mono">02 // STANDAR DESAIN</div>
                  <div className="about-spec-val">WCAG AAA, Editorial Feel</div>
                </div>
              </div>

              <div className="about-pills-wrap">
                <span className="about-skill-pill font-mono">[01] Visual Architecture</span>
                <span className="about-skill-pill font-mono">[02] Three.js WebGL</span>
                <span className="about-skill-pill font-mono">[03] Aksesibilitas (WCAG)</span>
                <span className="about-skill-pill font-mono">[04] Design Tokens</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Modal */}
      {show3DModal && (
        <div className="about-3d-drawer" role="dialog" aria-modal="true" aria-label="3D Duo Core Sculpture">
          <div className="about-3d-drawer-content">
            <button type="button" className="about-3d-drawer-close" onClick={() => setShow3DModal(false)} aria-label="Close 3D sculpture viewer">✕</button>
            <About3D darkMode={darkMode ?? true} />
          </div>
        </div>
      )}
    </section>
  )
}
