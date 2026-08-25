// Sections are assembled in document order to form the single page.
import HeroSection from '@/components/HeroSection'
import SummarySection from '@/components/SummarySection'
import SkillsSection from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import EducationSection from '@/components/EducationSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SummarySection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </div>
  )
}
