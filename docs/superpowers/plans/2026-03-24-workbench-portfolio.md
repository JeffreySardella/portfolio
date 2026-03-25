# The Workbench Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild sardella.dev as an interactive, scroll-driven "tinkerer's workbench" portfolio with GSAP animations, real cinematic photography, and WCAG 2.2 AA compliance.

**Architecture:** React SPA with GSAP ScrollTrigger driving a horizontal-scroll hero section. Lenis provides smooth scrolling. Tailwind CSS handles styling with custom design tokens. Photos are placeholder-first — the site works fully without real photos, which are an async dependency on Jeffrey taking and processing them.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS 4 + GSAP 3.12 (ScrollTrigger + SplitText) + Lenis + Cloudflare Pages

**Spec:** `docs/superpowers/specs/2026-03-24-workbench-portfolio-redesign.md`

**Important:** All work happens inside `client/` directory. The existing site lives there. We are replacing the current components, not building a new project from scratch.

---

## Chunk 1: Foundation — Design System, Dependencies, Base Layout

### Task 1: Install new dependencies

**Files:**
- Modify: `client/package.json`

- [ ] **Step 1: Install GSAP, Lenis, and image tools**

```bash
cd client && npm install gsap @gsap/react lenis
```

- [ ] **Step 2: Verify dependencies installed**

Run: `cd client && npm ls gsap lenis @gsap/react`
Expected: All three packages listed without errors

- [ ] **Step 3: Commit**

```bash
cd client && git add package.json package-lock.json
git commit -m "feat: add GSAP, Lenis, and image tools dependencies"
```

---

### Task 2: Replace design system — CSS custom properties and fonts

**Files:**
- Modify: `client/src/index.css` (full rewrite)
- Modify: `client/index.html` (add font preloads, meta tags, skip link)

- [ ] **Step 1: Download and self-host fonts**

Download woff2 files for Space Grotesk (700), Inter (400, 500), JetBrains Mono (400). Place in `client/public/fonts/`. Can use google-webfonts-helper or fontsource packages.

```bash
cd client && mkdir -p public/fonts
# Use fontsource npm packages as an alternative:
npm install @fontsource/space-grotesk @fontsource/inter @fontsource/jetbrains-mono
```

- [ ] **Step 2: Rewrite index.css with new design tokens**

Replace entire `client/src/index.css` with the new design system. The file should contain:
- Tailwind import
- `@theme` block with all CSS custom properties from spec (--bg, --bg-surface, --bg-elevated, --text, --text-muted, --accent-warm, --accent-warm-hover, --accent-cool, --border)
- Font-face declarations or fontsource imports for Space Grotesk, Inter, JetBrains Mono
- `font-display: swap` on all fonts
- Base body styles (bg: --bg, color: --text, font-family: Inter)
- `html { scroll-behavior: auto }` (Lenis handles smooth scroll, not CSS)
- `:focus-visible` global ring style using --accent-warm
- `prefers-reduced-motion` media query that sets `--animation-duration: 0s`
- Skip link styles (visually hidden, visible on focus)
- Shimmer placeholder animation for image loading
- Remove ALL old styles: .bento-card, .hero-gradient, .animate-marquee, .animate-blob, .animate-pulse-dot, .reveal

- [ ] **Step 3: Update index.html with meta tags and skip link**

Update `client/index.html`:
- Title: `Jeffrey Sardella — Full-Stack Developer & Builder`
- Meta description
- Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter card meta
- Canonical URL
- JSON-LD Person schema in a `<script type="application/ld+json">` block
- Skip link as first child of body: `<a href="#projects" class="skip-link">Skip to content</a>`
- Preconnect for any external resources

- [ ] **Step 4: Verify dev server starts with new styles**

Run: `cd client && npm run dev`
Expected: Dev server starts, page loads with dark background (#0a0a0a), no old styles visible

- [ ] **Step 5: Commit**

```bash
git add client/src/index.css client/index.html client/public/fonts/
git commit -m "feat: replace design system with dark workshop theme

New color palette (amber + blue accents on #0a0a0a), self-hosted
Space Grotesk + Inter + JetBrains Mono, WCAG 2.2 AA focus rings,
SEO meta tags, JSON-LD Person schema, skip link."
```

---

### Task 3: Set up Lenis smooth scrolling

**Files:**
- Create: `client/src/hooks/useLenis.ts`
- Modify: `client/src/App.tsx`

- [ ] **Step 1: Create useLenis hook**

```typescript
// client/src/hooks/useLenis.ts
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
```

- [ ] **Step 2: Integrate into App.tsx**

Strip `App.tsx` down to a shell that initializes Lenis and renders section placeholders:

```typescript
// client/src/App.tsx
import { useLenis } from './hooks/useLenis'

function App() {
  useLenis()

  return (
    <div className="min-h-screen">
      <main>
        <section id="hero" className="h-screen flex items-center justify-center">
          <h1 className="text-5xl font-bold font-heading text-text">
            JEFFREY SARDELLA
          </h1>
        </section>
        <section id="projects" className="py-20 scroll-mt-20">
          <p className="text-text-muted text-center">Projects</p>
        </section>
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 3: Verify smooth scrolling works**

Run: `cd client && npm run dev`
Expected: Page scrolls with buttery smooth inertia. Scrolling feels different from native — slightly floaty with momentum.

- [ ] **Step 4: Commit**

```bash
git add client/src/hooks/useLenis.ts client/src/App.tsx
git commit -m "feat: add Lenis smooth scrolling with GSAP ScrollTrigger sync"
```

---

### Task 4: Remove old components

**Files:**
- Delete: `client/src/sections/HeroSection.tsx`
- Delete: `client/src/sections/AboutSection.tsx`
- Delete: `client/src/sections/ProjectsSection.tsx`
- Delete: `client/src/sections/ContactSection.tsx`
- Delete: `client/src/components/Navbar.tsx`
- Delete: `client/src/components/Footer.tsx`

- [ ] **Step 1: Delete all old section and component files**

```bash
cd client && rm -f src/sections/HeroSection.tsx src/sections/AboutSection.tsx src/sections/ProjectsSection.tsx src/sections/ContactSection.tsx src/components/Navbar.tsx src/components/Footer.tsx
```

- [ ] **Step 2: Verify build still works**

Run: `cd client && npm run build`
Expected: Build succeeds (App.tsx no longer imports old components)

- [ ] **Step 3: Commit**

```bash
git add -A client/src/
git commit -m "chore: remove old bento-grid components and sections"
```

---

## Chunk 2: Navigation + Entry Animation

### Task 5: Build the Navbar component

**Files:**
- Create: `client/src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar with scroll-aware styling**

Build the navbar per spec:
- Fixed position, transparent initially
- Gains `backdrop-filter: blur(12px)` + `bg-bg/80` after scrolling past hero
- Left: `sardella.dev` in JetBrains Mono
- Right: Projects · About · Experience · Contact · Resume ↓
- Resume uses `<a href="/Jeffrey_Sardella_Resume.pdf" download>`
- Active section highlighted with amber underline (track via IntersectionObserver)
- `scroll-margin-top: 80px` on all section targets (WCAG 2.2 Focus Not Obscured)

Use `useEffect` with `scroll` event listener (throttled) for transparency toggle. Use IntersectionObserver for active section tracking.

- [ ] **Step 2: Build mobile hamburger menu**

Add responsive behavior:
- `< 768px`: show hamburger icon, hide nav links
- Hamburger toggles full-screen dark overlay menu
- Menu items stacked vertically, min 44px tap targets
- Close on link click or overlay tap
- Trap focus inside menu when open (a11y)

- [ ] **Step 3: Add to App.tsx**

Import and render Navbar in App.tsx above `<main>`.

- [ ] **Step 4: Verify navbar works**

Run: `cd client && npm run dev`
Expected: Navbar visible, transparent over hero, gains blur on scroll, mobile menu works, resume downloads PDF.

- [ ] **Step 5: Commit**

```bash
git add client/src/components/Navbar.tsx client/src/App.tsx
git commit -m "feat: add fixed navbar with scroll blur, active tracking, mobile menu"
```

---

### Task 6: Build entry animation

**Files:**
- Modify: `client/src/App.tsx` (or create a dedicated `client/src/components/EntryAnimation.tsx`)

- [ ] **Step 1: Create the entry animation component**

On cold load at `scrollY === 0` with no hash:
1. Dark screen, 500ms pause
2. "JEFFREY SARDELLA" fades in (Space Grotesk, ~48px, centered)
3. "Builder · Tinkerer · Engineer" fades in below (300ms delay)
4. After 1.5s, scroll indicator pulses at bottom (down chevron, `animate-bounce`)
5. On first scroll: name cross-fades to `sardella.dev` (shrinks to 16px) while sliding to top-left navbar position over 0.6s `ease-out`. Navbar links fade in from right.

Use GSAP timeline for orchestration. Use `gsap.to()` for the name-to-navbar transition.

Deep-link behavior: if `window.location.hash` exists or `window.scrollY > 0`, skip animation entirely — set navbar to scrolled state immediately.

- [ ] **Step 2: Handle prefers-reduced-motion**

If `prefers-reduced-motion: reduce`, skip all animation. Render navbar in scrolled state immediately. Show hero content statically.

- [ ] **Step 3: Verify animation plays correctly**

Run: `cd client && npm run dev`
Expected: Dark screen → name fades in → subtitle → scroll indicator → on scroll, name slides to navbar. Refreshing with #projects hash skips animation.

- [ ] **Step 4: Commit**

```bash
git add client/src/
git commit -m "feat: add orchestrated entry animation with GSAP timeline

Name fade-in → subtitle → scroll indicator → cross-fade to navbar.
Respects prefers-reduced-motion and deep-link behavior."
```

---

## Chunk 3: Hero — The Workbench Scroll-Pan

### Task 7: Build the horizontal scroll hero structure

**Files:**
- Create: `client/src/sections/HeroSection.tsx`
- Create: `client/src/components/ScrollProgress.tsx`
- Create: `client/src/hooks/useScrollTrigger.ts`

- [ ] **Step 1: Create useScrollTrigger hook**

```typescript
// client/src/hooks/useScrollTrigger.ts
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHorizontalScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  panelRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !containerRef.current || !panelRef.current) return

    // Only enable horizontal scroll on desktop
    if (window.innerWidth < 768) return

    const panels = panelRef.current
    const totalScroll = panels.scrollWidth - window.innerWidth

    const trigger = gsap.to(panels, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      trigger.scrollTrigger?.kill()
      trigger.kill()
    }
  }, [containerRef, panelRef])
}
```

- [ ] **Step 2: Create HeroSection with 4 stations**

Build the hero per spec:
- Outer container: `h-screen overflow-hidden`
- Inner panel: `flex` container, 4 children each `w-screen h-screen` (capped at 1600px width)
- Each station: dark `bg-bg-surface` background (placeholder for photos), text overlay with date, label, caption
- Station 4 has CTA buttons: "See Projects ↓" and "Get in Touch"
- Text uses SplitText animation triggered by ScrollTrigger (register GSAP SplitText plugin)
- Parallax: foreground text at 1x, background at 0.6x speed

For SplitText, import from `gsap/SplitText` and create ScrollTrigger-driven character/line reveals on station titles and captions.

- [ ] **Step 3: Create ScrollProgress bar**

Thin bar at bottom of viewport during hero section:
- Width tied to horizontal scroll progress (0% → 100%)
- Uses `--accent-warm` color
- `position: fixed; bottom: 0; left: 0; height: 3px`
- Fades in when hero scroll starts, fades out when hero section ends
- Connect to ScrollTrigger's `onUpdate` callback for progress value

- [ ] **Step 4: Add mobile fallback**

On `< 768px`, render stations as vertical stack:
- Each station: full-width, `min-h-[60vh]`
- Background image with 60% dark overlay
- Text overlaid, left-aligned
- Fade-in on scroll via IntersectionObserver (not GSAP)
- No horizontal scroll, no pinning

- [ ] **Step 5: Wire into App.tsx**

Replace the placeholder hero section with `<HeroSection />` and add `<ScrollProgress />`.

- [ ] **Step 6: Verify horizontal scroll works**

Run: `cd client && npm run dev`
Expected: Scrolling down pans the workbench horizontally. 4 stations scroll left to right. Progress bar tracks position. Text animates in. Mobile shows vertical stack.

- [ ] **Step 7: Commit**

```bash
git add client/src/sections/HeroSection.tsx client/src/components/ScrollProgress.tsx client/src/hooks/useScrollTrigger.ts client/src/App.tsx
git commit -m "feat: add horizontal scroll workbench hero with 4 stations

GSAP ScrollTrigger horizontal pin, SplitText character reveals,
parallax layers, scroll progress bar. Mobile falls back to
vertical stack with IntersectionObserver fade-in."
```

---

## Chunk 4: Projects Section

### Task 8: Build featured project cards

**Files:**
- Create: `client/src/components/ProjectCard.tsx`
- Create: `client/src/sections/ProjectsSection.tsx`
- Create: `client/src/data/projects.ts`

- [ ] **Step 1: Create project data file**

```typescript
// client/src/data/projects.ts
export interface Project {
  title: string
  description: string
  screenshot?: string // path to screenshot, optional for now
  techTags: string[]
  sdlcPhases: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'OWP Forum',
    description: 'Designed, developed, and implemented a RESTful API in PHP Slim with full CRUD across a four-tier role-based access control system for a client serving 14,000+ professionals annually. Built WCAG 2.2-compliant Vue.js frontend components.',
    techTags: ['PHP Slim', 'Vue.js', 'T-SQL', 'REST API', 'GitHub Actions'],
    sdlcPhases: ['Requirements', 'Design', 'Development', 'Testing', 'Deployment', 'Documentation'],
    featured: true,
  },
  {
    title: 'Medical Web Application',
    description: 'Led a 6-person Agile team developing a multi-tier healthcare application. Designed normalized SQL Server schema with stored procedures, built role-based authentication, and managed full software development lifecycle from requirements to deployment.',
    techTags: ['ASP.NET MVC', 'C#', 'SQL Server', 'REST API'],
    sdlcPhases: ['Requirements', 'Design', 'Development', 'Testing', 'Documentation'],
    featured: true,
  },
  {
    title: 'Drover Analytics Dashboard',
    description: 'Built a production React/TypeScript analytics dashboard integrating GA4, Search Console, Google Ads, and Meta Ads through Supabase Edge Function API proxies. Includes Claude API-powered insights and CRM Kanban board.',
    techTags: ['React', 'TypeScript', 'Supabase', 'Claude API'],
    sdlcPhases: ['Requirements', 'Design', 'Development', 'Testing', 'Deployment'],
    featured: true,
  },
  {
    title: '3DAI',
    description: 'Built a multi-level training pipeline for an AI 3D model generation system at Hornet Hacks 4.0. Level 1 agents iteratively generate and score OpenSCAD code, with regression and generalization testing at higher levels.',
    techTags: ['TypeScript', 'Node.js', 'OpenSCAD', 'Google AI API', 'Docker'],
    sdlcPhases: ['Design', 'Development', 'Testing'],
    featured: true,
  },
  // ... remaining 8 non-featured projects with featured: false
  // SmartTripPlanner, Discord Voice Word Tracker, X Country Filter,
  // PogoFest Ticket Bot, Toontown Mini-Games, Drive Smart,
  // Restaurant App, Web Load Tester
]
```

Fill in all 12 projects. Non-featured ones need: title, one-liner description, techTags, githubUrl. No sdlcPhases or screenshots needed.

- [ ] **Step 2: Create ProjectCard component (featured)**

Full-width row, alternating image/text layout:
- Even indices: image left, text right
- Odd indices: image right, text left
- Image area: 16:10 aspect ratio container, `bg-bg-surface` placeholder with shimmer (real screenshots come later)
- Title: Space Grotesk, animated via SplitText on scroll
- Description: 2-3 sentences in body text
- SDLC phase tags: small amber-outlined pills showing which phases were owned
- Tech tags: monospace pills with `bg-bg-elevated`
- Links: "GitHub →" and/or "Live →" in amber
- Hover: image shifts slightly + warm glow via CSS transition

- [ ] **Step 3: Create ProjectGridCard component (compact)**

Smaller card for non-featured projects:
- `bg-bg-surface` background, subtle border
- Title, one-liner, tech tags, GitHub link
- Fade in + translateY on scroll (ScrollTrigger, staggered)
- 2 columns on desktop, 1 on mobile

- [ ] **Step 4: Create ProjectsSection**

Renders a section heading "Projects" (SplitText reveal), then featured cards, then compact grid. Add `id="projects"` and `scroll-mt-20` for nav targeting.

- [ ] **Step 5: Wire into App.tsx**

Replace the projects placeholder with `<ProjectsSection />`.

- [ ] **Step 6: Verify projects render**

Run: `cd client && npm run dev`
Expected: Featured projects show as full-width alternating rows with placeholder images. Compact grid shows below. SDLC tags visible on featured cards. Scroll animations fire.

- [ ] **Step 7: Commit**

```bash
git add client/src/data/projects.ts client/src/components/ProjectCard.tsx client/src/components/ProjectGridCard.tsx client/src/sections/ProjectsSection.tsx client/src/App.tsx
git commit -m "feat: add projects section with featured showcase and compact grid

SDLC phase tags on featured projects, CalHR-aligned descriptions,
SplitText title reveals, alternating layout. Placeholder images
until real screenshots are added."
```

---

## Chunk 5: About + Experience Sections

### Task 9: Build About section

**Files:**
- Create: `client/src/sections/AboutSection.tsx`
- Create: `client/src/components/PhotoStrip.tsx`

- [ ] **Step 1: Create AboutSection**

Two columns on desktop (`md:grid-cols-2`), stacked on mobile:
- **Left column:** Bio text in first person (use exact copy from spec). Casual but professional.
- **Right column:** Quick facts in monospace. Use JetBrains Mono for labels, Inter for values. Compact key-value layout.
- Section heading "About" with SplitText word reveal.
- `id="about"` and `scroll-mt-20`

- [ ] **Step 2: Create PhotoStrip component**

Horizontal scrollable row below the bio:
- `overflow-x: auto` with `scroll-snap-type: x mandatory`
- Each thumbnail: 200px wide, 1:1 square, `bg-bg-surface` placeholder
- `scroll-snap-align: start` on each item
- Caption on hover: overlay with text, fade in
- Scale from 0.95 + fade on scroll (ScrollTrigger, staggered)
- Hide scrollbar with `scrollbar-width: none` / `::-webkit-scrollbar { display: none }`

- [ ] **Step 3: Wire into App.tsx**

Add `<AboutSection />` after ProjectsSection.

- [ ] **Step 4: Verify about section renders**

Run: `cd client && npm run dev`
Expected: Bio text, quick facts, placeholder photo strip. Responsive on mobile.

- [ ] **Step 5: Commit**

```bash
git add client/src/sections/AboutSection.tsx client/src/components/PhotoStrip.tsx client/src/App.tsx
git commit -m "feat: add about section with bio, quick facts, and photo strip"
```

---

### Task 10: Build Experience timeline

**Files:**
- Create: `client/src/sections/ExperienceSection.tsx`
- Create: `client/src/components/TimelineEntry.tsx`
- Create: `client/src/data/experience.ts`

- [ ] **Step 1: Create experience data file**

```typescript
// client/src/data/experience.ts
export interface ExperienceEntry {
  title: string
  company: string
  location: string
  dates: string
  current: boolean
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: 'AI Solutions Engineer (Contract)',
    company: 'Drover Insights LLC',
    location: 'Remote — California',
    dates: 'Mar 2026 – Present',
    current: true,
    bullets: [
      'React/TypeScript analytics dashboard integrating GA4, Search Console, Google Ads, and Meta Ads',
      'Python-based AI agent training and evaluation pipeline',
      'Playwright-based RPA tool for automated data collection workflows',
    ],
  },
  // ... remaining 5 entries from spec
]
```

- [ ] **Step 2: Create TimelineEntry component**

Single timeline item:
- Left side: date range + location (JetBrains Mono, text-muted)
- Right side: title (Space Grotesk, bold), company (accent-warm), bullets (text-muted)
- If `current: true`, amber "CURRENT" badge next to title
- Thin vertical line connecting entries (border-left on container)
- Fade in from left, staggered (ScrollTrigger)
- Responsive: stack vertically on mobile

- [ ] **Step 3: Create ExperienceSection**

Renders heading "Experience" (SplitText reveal) + list of TimelineEntry components.
`id="experience"` and `scroll-mt-20`.

- [ ] **Step 4: Wire into App.tsx**

Add `<ExperienceSection />` after AboutSection.

- [ ] **Step 5: Verify timeline renders**

Run: `cd client && npm run dev`
Expected: Vertical timeline with 6 entries, "CURRENT" badges on first two, stagger animation on scroll.

- [ ] **Step 6: Commit**

```bash
git add client/src/data/experience.ts client/src/components/TimelineEntry.tsx client/src/sections/ExperienceSection.tsx client/src/App.tsx
git commit -m "feat: add experience timeline with staggered scroll animations"
```

---

## Chunk 6: Contact, Footer, Final Assembly

### Task 11: Build Contact section and Footer

**Files:**
- Create: `client/src/sections/ContactSection.tsx`
- Create: `client/src/components/ContactForm.tsx`
- Create: `client/src/components/Footer.tsx`

- [ ] **Step 1: Create ContactForm component**

Formspree form with:
- Three fields: name (text), email (email), message (textarea). All required.
- Monospace labels (JetBrains Mono)
- Dark inputs: `bg-bg-surface`, thin `border-border`, `text-text`
- Amber submit button, disabled while loading
- State management: idle → loading ("Sending...") → success (green message) → error (amber message with mailto fallback)
- Client-side email format validation
- `action` pointed at Formspree endpoint (use env var `VITE_FORMSPREE_ID`)

- [ ] **Step 2: Create ContactSection**

- Heading: "Let's build something." (SplitText reveal)
- Two columns: left = social links list (GitHub, LinkedIn, Email, Handshake as text links with small icons), right = ContactForm
- `id="contact"` and `scroll-mt-20`
- Subtle warm gradient at top edge (`bg-gradient-to-b from-accent-warm/5 to-transparent`, small height)

- [ ] **Step 3: Create Footer**

Single line: `© 2026 Jeffrey Sardella · sardella.dev · GitHub · LinkedIn`
- Centered, small text, `text-text-muted`
- Links to GitHub and LinkedIn
- `py-8` padding

- [ ] **Step 4: Wire into App.tsx**

Add `<ContactSection />` and `<Footer />`. The full App.tsx should now render:
1. `<Navbar />`
2. `<main>`: HeroSection → ProjectsSection → AboutSection → ExperienceSection → ContactSection
3. `<Footer />`

- [ ] **Step 5: Verify contact form works**

Run: `cd client && npm run dev`
Expected: Form renders, validation works, submit shows loading state. (Full Formspree submission requires the env var to be set.)

- [ ] **Step 6: Commit**

```bash
git add client/src/components/ContactForm.tsx client/src/sections/ContactSection.tsx client/src/components/Footer.tsx client/src/App.tsx
git commit -m "feat: add contact section with Formspree form and footer"
```

---

### Task 12: Accessibility audit pass

**Files:**
- Modify: multiple files for a11y fixes

- [ ] **Step 1: Add ARIA landmarks to all sections**

Verify each section has:
- `<section aria-label="Hero">`, `<section aria-label="Projects">`, etc.
- `<main>` wrapping all sections
- `<nav aria-label="Main navigation">` on Navbar
- `<footer>` tag on Footer

- [ ] **Step 2: Verify skip link works**

Tab from page load — skip link should appear, clicking it should jump to #projects and the focused element must not be obscured by the fixed navbar.

- [ ] **Step 3: Verify prefers-reduced-motion**

In Chrome DevTools → Rendering → Emulate CSS media → `prefers-reduced-motion: reduce`
Expected: No animations. Hero shows as vertical stack. All content immediately visible.

- [ ] **Step 4: Verify keyboard navigation**

Tab through entire site. Verify:
- All interactive elements are reachable
- Focus ring visible on all focusable elements
- No focus traps (except intentional mobile menu trap)
- Enter activates all links and buttons

- [ ] **Step 5: Run Lighthouse accessibility audit**

Run Lighthouse in Chrome DevTools → Accessibility tab
Target: 90+ score. Fix any flagged issues.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A client/src/
git commit -m "fix: accessibility audit — ARIA landmarks, focus management, reduced motion"
```

---

### Task 13: Build verification and deploy test

**Files:**
- Modify: none (verification only)

- [ ] **Step 1: Run production build**

```bash
cd client && npm run build
```
Expected: Build succeeds with no TypeScript errors, no warnings.

- [ ] **Step 2: Preview production build locally**

```bash
cd client && npm run preview
```
Expected: Site loads, all sections render, animations work, form renders.

- [ ] **Step 3: Check build size**

```bash
cd client && ls -la dist/assets/
```
Expected: JS bundle < 200KB gzipped (GSAP is ~30KB, Lenis ~3KB, React ~40KB). Verify no unexpected large files.

- [ ] **Step 4: Verify mobile responsive**

Open Chrome DevTools responsive mode. Check 375px (iPhone SE), 768px (iPad), 1440px (desktop). All sections should render correctly at each breakpoint.

- [ ] **Step 5: Commit final state**

```bash
git add -A
git commit -m "feat: complete workbench portfolio v1 — ready for photos

All sections implemented with placeholder images. Photo dependencies:
- Hero stations: 6 required photos (see spec shot list)
- Project screenshots: 4 featured projects
- Beyond Code thumbnails: 6 detail shots
Run Gemini enhancement prompts from spec before adding."
```

---

## Chunk 7: Photo Integration (async — requires Jeffrey to take photos)

### Task 14: Add placeholder photo infrastructure

**Files:**
- Create: `client/src/assets/photos/.gitkeep`

- [ ] **Step 1: Create photo directory structure**

```bash
cd client && mkdir -p src/assets/photos/hero src/assets/photos/projects src/assets/photos/beyond-code
touch src/assets/photos/.gitkeep
```

- [ ] **Step 2: Document photo naming convention**

Photos should be named:
- Hero: `hero/station-1-burger.webp`, `hero/station-2-it.webp`, `hero/station-3-education.webp`, `hero/station-4-workshop.webp`
- Projects: `projects/owp-forum.webp`, `projects/medical-app.webp`, `projects/drover-dashboard.webp`, `projects/3dai.webp`
- Beyond Code: `beyond-code/homelab.webp`, `beyond-code/soldering.webp`, etc.

- [ ] **Step 3: Commit**

```bash
git add client/src/assets/photos/
git commit -m "chore: add photo directory structure and naming conventions"
```

---

### Task 15: Integrate real photos (when available)

**Files:**
- Add: photos to `client/src/assets/photos/`
- Modify: HeroSection.tsx, ProjectCard.tsx, PhotoStrip.tsx to reference real images

- [ ] **Step 1: Process photos through Gemini**

Use the Gemini enhancement prompts from the spec (base prompt + variants) on each photo. Save enhanced versions as WebP.

- [ ] **Step 2: Add photos to project**

Place processed photos in the correct directories per naming convention.

- [ ] **Step 3: Update components to use real images**

Replace placeholder `bg-bg-surface` backgrounds with actual `<picture>` elements using the photos. Ensure `width`, `height`, `alt`, and `loading` attributes are set per spec.

- [ ] **Step 4: Create OG image**

Take a screenshot of the finished hero section. Crop to 1200x630. Save as `client/public/og-image.jpg`.

- [ ] **Step 5: Verify all images load**

Run: `cd client && npm run dev`
Expected: All photos display correctly, lazy loading works, no CLS, placeholders show during load.

- [ ] **Step 6: Run Lighthouse performance**

Target: 90+ Performance score. Check LCP, CLS, TBT.

- [ ] **Step 7: Commit and deploy**

```bash
git add -A client/src/assets/photos/ client/public/og-image.jpg
git commit -m "feat: add processed photos for all sections"
git push
```

The GitHub Actions workflow will auto-deploy to Cloudflare Pages.

---

## Summary

| Chunk | Tasks | What it builds |
|-------|-------|---------------|
| 1 | 1-4 | Dependencies, design system, Lenis, cleanup |
| 2 | 5-6 | Navbar + entry animation |
| 3 | 7 | Hero workbench horizontal scroll |
| 4 | 8 | Projects section (featured + grid) |
| 5 | 9-10 | About + Experience sections |
| 6 | 11-13 | Contact, footer, a11y audit, build verification |
| 7 | 14-15 | Photo integration (async, blocked on Jeffrey taking photos) |

**Chunks 1-6 can be built entirely with placeholder images.** Chunk 7 is async and happens when photos are ready.

**Total tasks:** 15
**Estimated commits:** ~15
