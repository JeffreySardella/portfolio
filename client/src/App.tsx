import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import EntryAnimation from './components/EntryAnimation'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'
import AboutSection from './sections/AboutSection'
import ExperienceSection from './sections/ExperienceSection'
import ContactSection from './sections/ContactSection'

// Determine at module level so it doesn't change on re-render
const SKIP_ANIMATION =
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.location.hash !== '' ||
    window.scrollY > 0)

function App() {
  useLenis()

  // When animation is active, navbar items start hidden (GSAP reveals them)
  const [animationDone, setAnimationDone] = useState(SKIP_ANIMATION)

  return (
    <div className="min-h-screen">
      <Navbar hideUntilAnimated={!animationDone} />

      {/* Entry animation overlay — renders nothing when done or skipped */}
      {!SKIP_ANIMATION && (
        <EntryAnimation onComplete={() => setAnimationDone(true)} />
      )}

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
