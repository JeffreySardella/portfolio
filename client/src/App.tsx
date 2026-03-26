import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'
import AboutSection from './sections/AboutSection'
import ExperienceSection from './sections/ExperienceSection'
import ContactSection from './sections/ContactSection'

function App() {
  useLenis()

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <HeroSection />

        <ProjectsSection />
        <AboutSection />
        <ExperienceSection />

        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
