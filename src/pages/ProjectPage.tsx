import { AscendDemo } from '../components/AscendDemo'
import { WhenThenDemo } from '../components/WhenThenDemo'
import type { Project } from '../data/projects'
import { caseStudies } from '../data/caseStudies'

export function ProjectPage({ project }: { project: Project }) {
  const study = caseStudies[project.id]
  return <article className="section case-study">
    <a className="text-link" href="#/projects">← All projects</a>
    <header className="case-header">
      <p className="eyebrow">{project.category}</p>
      <h1 className="page-title">{project.title}</h1>
      <p className="intro">{project.description}</p>
      <p>{study.context}</p>
      <ul className="tags" aria-label="Technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
      <p><strong>My work:</strong> {study.role}</p>
    </header>
    {project.id === 'ascend' && <AscendDemo />}
    {project.id === 'onespace' && <WhenThenDemo />}
    {study.sections.map(section => <section className="case-section" key={section.title}>
      <h2>{section.title}</h2><p>{section.text}</p>
    </section>)}
    <a className="text-link" href="#/projects">Explore more projects →</a>
  </article>
}
