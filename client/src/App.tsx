import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import EntryAnimation from './components/EntryAnimation'
import HeroSection from './sections/HeroSection'

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

        <section id="projects" aria-label="Projects" className="py-20 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-bold font-heading text-text">Projects</h2>
            <p className="mt-4 text-text-muted">Coming soon...</p>
          </div>
        </section>

        <section id="about" aria-label="About" className="py-20 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-bold font-heading text-text">About</h2>
            <p className="mt-4 text-text-muted">Coming soon...</p>
          </div>
        </section>

        <section id="experience" aria-label="Experience" className="py-20 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-bold font-heading text-text">Experience</h2>
            <p className="mt-4 text-text-muted">Coming soon...</p>
          </div>
        </section>

        <section id="contact" aria-label="Contact" className="py-20 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-bold font-heading text-text">Contact</h2>
            <p className="mt-4 text-text-muted">Coming soon...</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
