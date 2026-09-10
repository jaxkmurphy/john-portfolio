import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'

export function ProjectsPage() {
  return <section className="section" aria-labelledby="projects-heading">
    <p className="eyebrow">Software · Mobile · Games</p>
    <h1 id="projects-heading" className="page-title">Projects</h1>
    <p className="intro">Explore the problems, features and technologies behind my work.</p>
    {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
  </section>
}
