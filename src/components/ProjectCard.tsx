import type { Project } from '../data/projects'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project" aria-labelledby={`${project.id}-title`}>
      <span className="project-number" aria-hidden="true">0{index + 1}</span>
      <div>
        <p className="eyebrow">{project.category}</p>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tags" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <a className="text-link" href={`#/projects/${project.id}`}>Explore {project.title} <span aria-hidden="true">→</span></a>
      </div>
    </article>
  )
}
