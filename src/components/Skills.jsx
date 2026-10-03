import { useState, useMemo } from 'react';
import SpotlightCard from './ui/SpotlightCard';
import DecryptedText from './ui/DecryptedText';
import PulseWave from './ui/PulseWave';
import { skills } from '../data/skills';
import {
  ReactIcon,
  JsIcon,
  ThreeJsIcon,
  TailwindIcon,
  HtmlIcon,
  FigmaIcon,
  PerformanceIcon,
  ToolingIcon,
} from './SkillIcons';

const iconComponents = {
  1: <ReactIcon />,
  2: <JsIcon />,
  3: <ThreeJsIcon />,
  4: <TailwindIcon />,
  5: <HtmlIcon />,
  6: <FigmaIcon />,
  7: <PerformanceIcon />,
  8: <ToolingIcon />,
};

const CATEGORIES = ['ALL', 'CORE', 'FRAMEWORK', 'CREATIVE', 'SYSTEM', 'WORKFLOW'];

export default function Skills({ className = '' }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [hoveredSkillId, setHoveredSkillId] = useState(null);

  const filteredSkills = useMemo(() => {
    if (activeTab === 'ALL') return skills;
    return skills.filter(
      (s) => s.category.toUpperCase() === activeTab || (activeTab === 'CORE' && s.category === 'Core')
    );
  }, [activeTab]);

  return (
    <section
      className={`skills-bento-section section-pad ${className}`}
      id="skills"
      aria-label="Engineered Capabilities & Stack"
    >
      <div className="wrap">
        {/* Technical Eyebrow & Status Header */}
        <div className="skills-header-row">
          <div className="skills-eyebrow-group">
            <div className="eyebrow">
              <span>02 // ARCHITECTURE & STACK</span>
              <span className="eyebrow-dot" />
            </div>
            <h2 className="skills-bento-title">
              Engineered for speed.<br />
              <em>Zero runtime bloat.</em>
            </h2>
          </div>

          <div className="skills-telemetry-badge" role="status" aria-label="System status">
            <div className="telemetry-live-dot" />
            <div className="telemetry-specs">
              <span className="telemetry-label">
                <DecryptedText text="RUNTIME: CHROMIUM / V8" speed={28} />
              </span>
              <span className="telemetry-value">60 FPS • 100/100 CWV • WCAG AAA</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="skills-tabs-bar" role="tablist" aria-label="Filter skills by domain">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'ALL'
                ? skills.length
                : skills.filter((s) => s.category.toUpperCase() === cat).length;
            if (cat !== 'ALL' && count === 0) return null;

            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat)}
                className={`skill-tab-pill ${isActive ? 'is-active' : ''}`}
              >
                <span>{cat}</span>
                <span className="skill-tab-count">0{count}</span>
              </button>
            );
          })}
        </div>

        {/* React Bits Bento Grid with SpotlightCard */}
        <div className="skills-bento-grid">
          {filteredSkills.map((skill) => {
            const isFeatured = skill.featured;
            const isWaveCard = skill.id === 3; // Three.js card gets interactive math wave

            return (
              <SpotlightCard
                key={skill.id}
                spotlightColor="rgba(19, 78, 74, 0.22)"
                onMouseEnter={() => setHoveredSkillId(skill.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                className={`skill-bento-item ${isFeatured ? 'is-featured' : ''} ${
                  hoveredSkillId === skill.id ? 'is-focused' : ''
                }`}
              >
                {/* Optional interactive CSS layer for creative card */}
                {isWaveCard && <PulseWave />}

                <div className="skill-card-inner">
                  {/* Top Bar: Icon + Monospace Meta */}
                  <div className="skill-card-top">
                    <div
                      className="skill-card-icon"
                      style={{ color: skill.color || 'var(--teal)' }}
                      aria-hidden="true"
                    >
                      {iconComponents[skill.id] || <ReactIcon />}
                    </div>

                    <div className="skill-meta-tags">
                      <span className="skill-cat-pill">{skill.category}</span>
                      <span className="skill-metric-pill">{skill.metric}</span>
                    </div>
                  </div>

                  {/* Title & Technical Spec */}
                  <div className="skill-card-body">
                    <h3 className="skill-card-name">
                      <DecryptedText
                        text={skill.name}
                        speed={32}
                        animateOn="hover"
                        characters="!#$0123456789_<>{}[]"
                      />
                    </h3>
                    <p className="skill-card-spec">{skill.spec}</p>
                  </div>

                  {/* Architecture Tags Matrix (No AI slop paragraphs) */}
                  <div className="skill-tags-row" aria-label="Key competencies">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="skill-tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer telemetry index */}
                  <div className="skill-card-footer">
                    <span className="skill-idx font-mono">SYS.0{skill.id}</span>
                    <span className="skill-status-signal">
                      <span className="signal-led" />
                      STABLE
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Bottom Technical Spec Bar */}
        <div className="skills-bottom-bar">
          <div className="bottom-bar-item">
            <span className="bottom-bar-num">16.6ms</span>
            <span className="bottom-bar-label">FRAME BUDGET</span>
          </div>
          <div className="bottom-bar-separator" />
          <div className="bottom-bar-item">
            <span className="bottom-bar-num">100%</span>
            <span className="bottom-bar-label">CORE WEB VITALS</span>
          </div>
          <div className="bottom-bar-separator" />
          <div className="bottom-bar-item">
            <span className="bottom-bar-num">WCAG AAA</span>
            <span className="bottom-bar-label">A11Y CONFORMANCE</span>
          </div>
          <div className="bottom-bar-separator" />
          <div className="bottom-bar-item">
            <span className="bottom-bar-num">0 KB</span>
            <span className="bottom-bar-label">UNUSED RUNTIME</span>
          </div>
        </div>
      </div>
    </section>
  );
}
