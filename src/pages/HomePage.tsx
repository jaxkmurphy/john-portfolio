import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'

export function HomePage() {
  return <>
        <section id="home" className="hero" aria-labelledby="intro-title">
          <p className="eyebrow">Software · Mobile · Games</p>
          <h1 id="intro-title">Hi, I’m John. A software developer.<br /><span>I build software<br />for real experiences.</span></h1>
          <p className="intro">From tools that support the classroom to worlds built for exploration. I work across mobile applications, education technology and game development.</p>
          <a className="button" href="#/projects">Explore my projects <span aria-hidden="true">↗</span></a>
        </section>
        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-heading"><h2 id="projects-title">Selected projects</h2><span>01 — 03</span></div>
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
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
