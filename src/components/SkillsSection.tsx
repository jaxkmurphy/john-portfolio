import { skillGroups } from '../data/skills'

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="section"
      aria-labelledby="skills-title"
    >
      <h2 id="skills-title">Skills & Technologies</h2>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>

            <ul className="tags">
              {group.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}