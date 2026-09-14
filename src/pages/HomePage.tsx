import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'

export function HomePage() {
  return <>
        <section id="home" className="hero" aria-labelledby="intro-title">
          <p className="eyebrow">Software · Mobile · Games</p>
          <h1 id="intro-title">Hi, I’m John.<br /><span>Software developer.</span></h1>
          <p className="intro">I build mobile apps, classroom tools and games. Based in Ireland, I’m currently developing Orbitell, an education support platform for special-class settings.</p>
          <div className="hero-actions">
            <a className="button" href="#/projects">Explore my projects <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href={`${import.meta.env.BASE_URL}John_Murphy_CV_2026.pdf`} download>Download CV <span className="link-format">PDF</span></a>
            <a className="hero-contact" href="mailto:jaxkmurphy@gmail.com">Contact me <span aria-hidden="true">→</span></a>
          </div>
        </section>
        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-heading"><h2 id="projects-title">Selected projects</h2><span>01 — 03</span></div>
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} featured={project.id === 'orbitell'} />)}
        </section>

    <section className="section skills-summary" aria-labelledby="skills-summary-title">
      <h2 id="skills-summary-title">Skills & Technologies</h2>
      <ul className="tags">
        {skillGroups.flatMap(group => group.technologies.slice(0, 2)).map(technology => <li key={technology}>{technology}</li>)}
      </ul>
      <a className="text-link" href="#/about">More about my background →</a>
    </section>
  </>
}
