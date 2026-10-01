import { Link } from 'react-router-dom';
import Skills from '../components/Skills';
import DecryptedText from '../components/ui/DecryptedText';
import { skills } from '../data/skills';

export default function SkillsPage() {
  return (
    <div className="page-view skills-page">
      {/* Editorial Header */}
      <div className="wrap page-header">
        <div className="eyebrow">
          <span>
            <DecryptedText text="GOOGLE SWE // CAPABILITIES" speed={30} />
          </span>
          <span className="eyebrow-dot" />
        </div>
        <h1 className="page-title">
          Standard compliance.<br />
          <em>Pixel precision.</em>
        </h1>
        <p className="page-lead">
          Building at Google scale: strict semantic DOM, 60fps WebGL rendering pipelines, and zero-runtime CSS systems.
        </p>
      </div>

      {/* React Bits Bento & Spotlight Card Showcase */}
      <Skills />

      {/* Systems Specification Matrix (Engineering Standard) */}
      <section className="skills-matrix section-pad wrap" aria-label="Systems Specification Matrix">
        <div className="section-head">
          <div className="eyebrow">
            <span>SPEC MATRIX // ARCHITECTURAL TIERS</span>
            <span className="eyebrow-dot" />
          </div>
          <p>Verified against W3C, Chromium rendering pipeline, and Core Web Vitals.</p>
        </div>

        {/* Technical Spec Matrix Table */}
        <div className="spec-matrix-container" role="table" aria-label="Technical skills specification">
          <div className="spec-matrix-header" role="row">
            <span className="spec-col-id" role="columnheader">ID</span>
            <span className="spec-col-module" role="columnheader">SYSTEM / MODULE</span>
            <span className="spec-col-spec" role="columnheader">CORE SPECIFICATION</span>
            <span className="spec-col-metric" role="columnheader">TELEMETRY</span>
            <span className="spec-col-status" role="columnheader">COMPLIANCE</span>
          </div>

          <div className="spec-matrix-body">
            {skills.map((s) => (
              <div key={s.id} className="spec-matrix-row" role="row">
                <span className="spec-col-id font-mono" role="cell">0{s.id}</span>
                <span className="spec-col-module font-bold" role="cell">{s.name}</span>
                <span className="spec-col-spec font-mono text-muted" role="cell">{s.spec}</span>
                <span className="spec-col-metric font-mono text-teal" role="cell">{s.metric}</span>
                <span className="spec-col-status" role="cell">
                  <span className="spec-status-pill">
                    <span className="signal-led" />
                    WCAG AAA
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="about-cta-bar">
          <span>HAVE A TECHNICAL CHALLENGE?</span>
          <Link to="/contact" className="about-cta-btn">
            LET’S TALK →
          </Link>
        </div>
      </section>
    </div>
  );
}
