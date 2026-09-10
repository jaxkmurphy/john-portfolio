import { useEffect, useRef, useSyncExternalStore } from 'react'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectPage } from './pages/ProjectPage'
import { projects } from './data/projects'

// Hash routes keep direct links and refreshes working on static GitHub Pages hosting.
function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}
function getRoute() {
  const hash = window.location.hash
  if (!hash || hash === '#home') return '/'
  if (hash === '#projects') return '/projects'
  if (hash === '#about') return '/about'
  return hash.slice(1).replace(/\/$/, '') || '/'
}

export default function App() {
  const route = useSyncExternalStore(subscribe, getRoute)
  const main = useRef<HTMLElement>(null)
  const project = projects.find(item => route === `/projects/${item.id}`)
  const title = project?.title ?? ({ '/': 'Home', '/about': 'About', '/projects': 'Projects' }[route] ?? 'Page not found')

  useEffect(() => {
    document.title = `${title} | John Murphy`
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [route, title])

  return <>
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); main.current?.focus(); main.current?.scrollIntoView() }}>Skip to content</a>
    <header className="site-header container">
      <a className="brand" href="#/" aria-label="John, home">john<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#/" aria-current={route === '/' ? 'page' : undefined}>Home</a>
        <a href="#/projects" aria-current={route.startsWith('/projects') ? 'page' : undefined}>Projects</a>
        <a href="#/about" aria-current={route === '/about' ? 'page' : undefined}>About</a>
      </nav>
    </header>
    <main id="main" className="container" ref={main} tabIndex={-1}>
      {route === '/' ? <HomePage /> : route === '/about' ? <AboutPage /> : route === '/projects' ? <ProjectsPage /> : project ? <ProjectPage project={project} /> : <section className="section"><h1 className="page-title">Page not found</h1><a className="text-link" href="#/">Return home</a></section>}
    </main>
    <footer className="container contact-footer">
      <div><strong>Let’s get in touch.</strong><p>John Murphy · Software, web & game development</p></div>
      <div className="footer-links">
        <a href="mailto:jaxkmurphy@gmail.com">Email John</a>
        <a href="https://github.com/jaxkmurphy">GitHub</a>
        <a href="https://www.linkedin.com/in/john-murphy-046508232/">LinkedIn</a>
        <a href={`${import.meta.env.BASE_URL}John_Murphy_CV_2026.pdf`} download>Download CV (PDF)</a>
      </div>
    </footer>
  </>
}
