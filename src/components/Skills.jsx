import { skills } from '../data/skills'

export default function Skills() {
  return (
    <section className="skills section-pad" id="skills" aria-label="Skills section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">
            <span>02 / WHAT WE BRING</span>
            <span className="eyebrow-dot" />
          </div>
          <p>
            A small toolkit.<br />
            A lot of curiosity.
          </p>
        </div>

        <div className="skill-list" role="list">
          {skills.map((skill, i) => (
            <div className="skill-row" key={skill.id || skill.name} role="listitem">
              <span className="skill-num">0{i + 1}</span>
              <div className="skill-details">
                <h3>{skill.name}</h3>
                {skill.desc && <p className="skill-desc">{skill.desc}</p>}
              </div>
              <span className="skill-category">{skill.category || 'SKILL'}</span>
              <span className="skill-plus" aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
