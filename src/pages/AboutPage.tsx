import { ExperienceSection } from '../components/ExperienceSection'
import { SkillsSection } from '../components/SkillsSection'

export function AboutPage() {
  return <>
        <section id="about" className="section about" aria-labelledby="about-title">
          <h1 id="about-title">About me</h1>
          <div>
            <p>
              I’m John Murphy, a developer based in Carrick-on-Suir,
              Ireland, with a First Class Honours degree in Creative
              Computing from South East Technological University.
            </p>
            <p>
              My work spans web, mobile and game development. I enjoy
              combining technical problem-solving with thoughtful
              interface design to build useful, engaging experiences.
            </p>
            <p>
              I’m currently developing OneSpace, an education support
              platform for special-class settings, bringing together
              classroom tools and separate experiences for staff
              and children.
            </p>
          </div>
        </section>

    <a className="button" href={`${import.meta.env.BASE_URL}John_Murphy_CV_2026.pdf`} download>Download CV (PDF)</a>
    <ExperienceSection />
    <SkillsSection />
  </>
}
