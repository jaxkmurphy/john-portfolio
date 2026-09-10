import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { SkillsSection } from '../components/SkillsSection'
import { ExperienceSection } from '../components/ExperienceSection'

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header container">
        <a className="brand" href="#home" aria-label="John, home">john<span>.</span></a>
        <nav aria-label="Main navigation"><a href="#projects">Projects</a><a href="#about">About</a></nav>
      </header>
      <main id="main" className="container">
        <section id="home" className="hero" aria-labelledby="intro-title">
          <p className="eyebrow">Software · Mobile · Games</p>
          <h1 id="intro-title">Hi, I’m John. A software developer.<br /><span>I build software<br />for real experiences.</span></h1>
          <p className="intro">From tools that support the classroom to worlds built for exploration. I work across mobile applications, education technology and game development.</p>
          <a className="button" href="#projects">Explore my projects <span aria-hidden="true">↗</span></a>
        </section>
        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-heading"><h2 id="projects-title">Selected projects</h2><span>01 — 03</span></div>
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </section>
        <SkillsSection />
        <ExperienceSection />
        <section id="about" className="section about" aria-labelledby="about-title">
          <h2 id="about-title">Across platforms.<br />Focused on people.</h2>
          <p>My projects span education support, mobile book management and game development. I’m interested in how thoughtful interfaces and the systems behind them come together to create useful, engaging experiences.</p>
        </section>
      </main>
      <footer className="container">John · Developer portfolio</footer>
    </>
  )
}
