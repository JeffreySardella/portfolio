# The Workbench — Portfolio Redesign Spec

## Overview

Redesign sardella.dev from a generic bento-grid portfolio into an interactive, scroll-driven "tinkerer's workbench" experience. The hero tells Jeffrey's career story through real, cinematic photos of physical objects on a workbench, panning horizontally as the user scrolls. Below the workbench, a clean dark portfolio presents projects, experience, and contact info optimized for recruiter scanning.

**Target audience:** State IT recruiters and hiring panels (ITA/ITS1 roles)
**Hosting:** Cloudflare Pages (static SPA)
**Stack:** React + TypeScript + Vite + Tailwind CSS + GSAP (ScrollTrigger + SplitText) + Lenis (smooth scroll)

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0a0a0a` | Page background |
| `--bg-surface` | `#141414` | Card/section backgrounds |
| `--bg-elevated` | `#1e1e1e` | Hover states, elevated surfaces |
| `--text` | `#f5f5f5` | Primary text |
| `--text-muted` | `#a0a0a0` | Secondary text, descriptions |
| `--accent-warm` | `#f59e0b` | Primary accent — amber (workshop light) |
| `--accent-warm-hover` | `#d97706` | Amber hover state |
| `--accent-cool` | `#3b82f6` | Secondary accent — blue (monitor light) |
| `--border` | `rgba(255,255,255,0.08)` | Subtle dividers |

No pastel gradients. No indigo. No rounded bento cards.

**Contrast notes:** `--text` on `--bg` = 19.4:1 (AAA). `--text-muted` on `--bg` = 9.9:1 (AAA). `--accent-warm` on `--bg` = 8.2:1 (AA large text, AAA for text ≥18px). Use `--accent-warm` only for headings, buttons, and links — not for small body text.

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headings | Space Grotesk | 700 | Section titles, name |
| Body | Inter | 400, 500 | Paragraphs, descriptions |
| Labels/Tags | JetBrains Mono | 400 | Tech tags, dates, code-related text |

All fonts use `font-display: swap` to prevent FOIT. Fallback stacks:
- Space Grotesk → system-ui, sans-serif
- Inter → system-ui, sans-serif
- JetBrains Mono → ui-monospace, 'Courier New', monospace

### Spacing & Layout

- Max content width: 1200px, centered
- Section padding: 80px vertical (48px on mobile)
- Dark background throughout — no white sections
- No bento grid anywhere. Clean vertical flow with deliberate whitespace.

---

## Section 1: Hero — The Workbench Scene

### Concept

Full-viewport horizontal scroll-pan across a workbench panorama. As the user scrolls down, GSAP ScrollTrigger pins the section and translates the scene horizontally. Four career "stations" tell the story left to right.

### Technical Implementation

- GSAP ScrollTrigger with horizontal pin
- The workbench is a fixed-width container: each station is 100vw wide, total width = 400vw. Capped at max 6400px total (1600px per station) on ultrawide monitors. On screens < 1200px, stations scale down proportionally via CSS clamp.
- Each station is a CSS `background-image: cover` container with its own photo asset. Stations do NOT share one stitched panorama — they are individual sections that scroll seamlessly.
- Each station has: background photo layer + foreground object photos + text overlay
- Parallax: foreground objects at 1x scroll speed, background at 0.6x
- Text labels animate in via GSAP SplitText: station titles reveal character-by-character with stagger (0.03s per char, `ease: "power2.out"`), captions reveal line-by-line. This is the dominant animation technique across 2025-2026 Awwwards portfolio winners.
- A thin progress bar at the bottom shows scroll position through the workbench. The scroll indicator (pulse arrow) from the entry animation fades out on first scroll; the progress bar fades in simultaneously.

### Stations

#### Station 1: "The Beginning" (2015-2020)

**Story:** "Built a C# app at a burger joint to stop doing math on napkins"

**Photo assets needed:**
- A POS system, cash register, or restaurant counter area
- A monitor/laptop showing C# code or a Windows Forms app
- Optional: name tag, apron, or anything restaurant-related

**Text overlay:**
- Date: `2015`
- Label: `SHIFT MANAGER'S COUNTER`
- Caption: "Built a C# desktop app to automate labor calculations"

#### Station 2: "Going Technical" (2021)

**Story:** "Wired a business network, configured fleet GPS, went full IT"

**Photo assets needed:**
- Router, ethernet cables, network switch
- A desk with multiple monitors showing spreadsheets/maps
- Optional: GPS device, fleet tracking interface on screen

**Text overlay:**
- Date: `2021`
- Label: `IT OPERATIONS`
- Caption: "Network infrastructure, fleet tracking, digital transformation"

#### Station 3: "The Education" (2021-2026)

**Story:** "Pursued CS formally — community college to university"

**Photo assets needed:**
- Textbooks (CS/programming related)
- Laptop with an IDE open
- Graduation cap, diploma, or campus-related item
- Optional: Sierra College and/or Sac State branded items

**Text overlay:**
- Date: `2021 → 2026`
- Label: `EDUCATION PATH`
- Caption: "A.S. Sierra College → B.S. Sacramento State"

#### Station 4: "The Workshop" (2024-Now)

**Story:** "ALWAYS tinkering."

**Photo assets needed:**
- Your actual desk/workspace — the whole setup
- Homelab (NAS, router, Pi-hole setup)
- Soldering station or electronics project
- 3D printer with a print
- Custom keyboard
- Monitor(s) showing code

**Text overlay:**
- Date: `NOW`
- Label: `THE WORKSHOP`
- Caption: "AI pipelines, game dev, homelabs, and everything in between"
- CTA buttons: `See Projects ↓` and `Get in Touch`

### Entry Animation

On page load, before scrolling begins:
1. Dark screen, 500ms pause
2. `JEFFREY SARDELLA` fades in — large, Space Grotesk, centered
3. Subtitle fades in below: `Builder · Tinkerer · Engineer`
4. After 1.5s, a subtle scroll indicator pulses at the bottom
5. On first scroll, the name cross-fades to `sardella.dev` (same position, shrinks from ~48px to 16px) while sliding to the top-left navbar position over 0.6s with `ease-out`. Navbar links fade in simultaneously from the right.

**Deep-link / refresh behavior:** The entry animation only plays on cold load at `scrollY === 0` with no URL hash. If the page loads with a hash anchor (e.g., `#projects`) or non-zero scroll position, skip the animation entirely — render the navbar in its scrolled state immediately and scroll to the target section.

### Mobile Behavior

**Breakpoint:** `< 768px` switches to mobile layout. Tablets in landscape (768px–1024px) get the desktop horizontal scroll but with reduced parallax.

Horizontal scroll is replaced with vertical scrolling. Each station becomes a full-width section:
- Photo as a background image (cover, darkened 60% overlay)
- Text content overlaid, left-aligned with padding
- Swipe-friendly, no scroll hijacking on mobile
- Station transitions use simple fade-in on scroll (IntersectionObserver, no GSAP on mobile)

---

## Section 2: Navigation

### Desktop

- Fixed top bar, initially transparent over the hero
- Gains `backdrop-filter: blur` + dark background after scrolling past hero
- Left: `sardella.dev` in JetBrains Mono
- Right: `Projects` · `About` · `Experience` · `Contact` · `Resume ↓`
- Resume link downloads `/Jeffrey_Sardella_Resume.pdf` from the `public/` directory via `download` attribute. File is manually updated when resume changes.
- Active section highlighted with amber underline

### Mobile

- Same fixed bar, `sardella.dev` left
- Hamburger icon right → slides open a full-screen dark overlay menu
- Menu items stacked, large touch targets

---

## Section 3: Projects

### Featured Projects (3-4)

Full-width rows, alternating layout (image left/right):

| Project | Screenshot Needed | Key Selling Point |
|---------|------------------|-------------------|
| OWP Forum | Vue.js frontend or API docs | "Real client project, 14,000+ users, 4-tier RBAC" |
| Medical App | ASP.NET dashboard or patient view | "Led 6-person team, full SDLC" |
| Drover Dashboard | React analytics dashboard | "Production tool integrating GA4, Ads, Claude API" |
| 3DAI | OpenSCAD renders or training pipeline | "Hackathon: AI 3D model generation pipeline" |

Each row:
- Large screenshot/mockup (real screenshots, not placeholder)
- Title in Space Grotesk (reveals via SplitText character animation on scroll)
- 2-3 sentence description
- **SDLC phase tags** — small indicators showing which phases you owned: `Requirements` · `Design` · `Development` · `Testing` · `Deployment` · `Documentation`. State IT panels evaluate candidates on SDLC knowledge across all phases. Showing this per project mirrors their evaluation criteria.
- Tech tags in monospace pills (`bg-elevated` background)
- Links: `GitHub →` and/or `Live →` in amber

**Project description language:** Mirror CalHR Software Engineering domain terminology where natural. Instead of "wrote docs" → "Developed and maintained software documentation for each phase of the SDLC." Instead of "built the API" → "Designed, developed, and implemented RESTful API adhering to enterprise architecture standards." This is not for gaming the system — it's practicing the language you'll use in interviews and STD 678 entries.

Hover: screenshot shifts slightly + subtle warm glow

### Other Projects (compact grid)

2 columns desktop, 1 column mobile. Smaller cards:

- SmartTripPlanner
- Discord Voice Word Tracker
- X Country Filter
- PogoFest Ticket Bot
- Toontown Mini-Games
- Drive Smart
- Restaurant App
- Web Load Tester

Each card: title, one-liner, tech tags, GitHub link. No screenshots needed for these.

---

## Section 4: About

Two columns on desktop, stacked on mobile.

### Left Column: Bio

Written in first person, casual but professional. No corporate buzzwords.

> I started writing C# at a burger joint because I was tired of calculating labor by hand. That turned into wiring networks at a pool company, shipping multiplayer minigames for a Toontown community, and now building AI training pipelines under contract.
>
> I have a CS degree from Sac State, three Microsoft/GitHub certs, and a garage full of half-finished projects. I just like making things work.

### Right Column: Quick Facts

Compact list, monospace labels:

```
DEGREE      B.S. Computer Science, Sac State (2026)
CERTS       AZ-900 · DP-900 · GitHub Foundations
LOCATION    Rocklin, CA
STATUS      Open to work — ITA / ITS1 roles
LANGUAGES   C# (6yr) · Python (4yr) · SQL (3yr) · JS (2yr)
```

### Beyond Code: Photo Strip

Horizontal scrollable row of small photos (thumbnails, ~200px wide):
- Homelab setup
- Soldering/electronics project
- 3D printer + print
- PC build
- Custom keyboard
- Game modding screenshot

Each thumbnail has a short caption on hover. This reinforces the "tinkerer" identity with real visual proof.

**Note:** The Beyond Code photos should be **macro/detail shots** (keycap closeup, solder joint, 3D print texture) to differentiate from Station 4's **wide contextual shots** of the same subjects. Different angle, different story.

---

## Section 5: Experience

Vertical timeline, left-aligned.

### Layout

```
DATE RANGE        ROLE + COMPANY
left-aligned      right-aligned content
thin vertical     2-3 bullet points
rule connecting
entries
```

### Entries

1. **AI Solutions Engineer (Contract)** — Drover Insights LLC — Mar 2026 – Present
   - Amber "CURRENT" badge
   - React/TypeScript dashboard, AI training pipeline, Playwright RPA, code reviews

2. **Backend & Full-Stack Developer** — OWP Forum, Sac State — Oct 2025 – Present
   - Amber "CURRENT" badge
   - PHP Slim REST API, Vue.js frontend, CI/CD, real client

3. **Project Lead** — Medical Web App, Sac State — Jan – May 2024
   - ASP.NET MVC, SQL Server, led 6-person team

4. **Game Developer (Volunteer)** — Toontown in Unity — Oct 2021 – Nov 2023
   - Shipped multiplayer minigame, networking, C#

5. **IT Assistant** — Pool Time Pool and Spa — Jan – Jun 2021
   - Network setup, fleet GPS, digital transformation

6. **Shift Manager** — Burger and Cream — Nov 2015 – Dec 2020
   - POS systems, C# labor app, team management

---

## Section 6: Contact & Footer

### Contact

Dark section with subtle warm gradient at top edge.

- Heading: `Let's build something.`
- Two columns:
  - **Left:** Social links as a list (GitHub, LinkedIn, Email, Handshake) — text links with icons, not circles
  - **Right:** Formspree contact form. Name, email, message. Monospace labels, thin border inputs on dark bg, amber submit button.

**Contact form behavior:**
- All three fields required. Email validated client-side (basic format check).
- Submit button shows "Sending..." with a small spinner while loading (disabled to prevent double-submit).
- On success: fields clear, inline green message "Message sent — I'll get back to you soon." fades in below the button.
- On error: inline amber message "Something went wrong. Try emailing me directly." with mailto link.
- Formspree handles spam filtering (built-in). No reCAPTCHA needed for this volume.

### Footer

Single line:
`© 2026 Jeffrey Sardella · sardella.dev · GitHub · LinkedIn`

---

## Photo Shot List

You need to photograph the following. Shoot in good lighting (desk lamp = great). Use portrait mode on your phone for shallow depth of field when possible.

### Workbench Hero Stations

Photos marked **REQUIRED** are needed for MVP. **NICE-TO-HAVE** can use a fallback (dark gradient + text-only station).

| # | Priority | Subject | Tips |
|---|----------|---------|------|
| 1 | REQUIRED | Your monitor showing a C# Windows Forms app or Visual Studio with code | Fake the burger joint context: put a notepad with scribbled calculations next to the keyboard, maybe a name tag if you have one |
| 2 | REQUIRED | Router + ethernet cables + network switch on a desk | Arrange cables intentionally, not messy. Include a monitor in the background if possible |
| 3 | NICE-TO-HAVE | Monitor with spreadsheets/maps (fleet tracking vibe) | Can be the same desk as #2, different angle. If skipped, combine into Station 2 |
| 4 | REQUIRED | CS textbooks + laptop with IDE open | Stack 2-3 textbooks, laptop behind them showing code |
| 5 | NICE-TO-HAVE | Any Sac State or Sierra College branded items | Sticker, hoodie, diploma — anything recognizable. Can composite into photo #4 |
| 6 | REQUIRED | Your full desk/workspace — wide shot | This is the hero of Station 4. Clean it up a bit but keep it real. Shoot LANDSCAPE. |
| 7 | REQUIRED | Homelab closeup (NAS, router, Pi-hole) | Moody lighting, LEDs glowing |
| 8 | NICE-TO-HAVE | Soldering station or electronics project | Iron, board, components |
| 9 | NICE-TO-HAVE | 3D printer with a finished print | Focus on the print, printer in background |
| 10 | NICE-TO-HAVE | Custom keyboard | Clean shot, maybe angled |
| 11 | REQUIRED | Monitor(s) showing code | Your actual IDE with real code |

**Minimum viable set:** Photos 1, 2, 4, 6, 7, 11 (6 photos) — enough for all 4 stations.

### Beyond Code Thumbnails

| # | Subject |
|---|---------|
| 12 | Homelab rack/shelf (can reuse #7 at different angle) |
| 13 | Soldering closeup (can reuse #8) |
| 14 | 3D print detail shot |
| 15 | PC build — open case or full tower |
| 16 | Custom keyboard detail (keycaps) |
| 17 | Game modding screenshot (Toontown or other) |

### Project Screenshots

Take real screenshots of your running applications:

| # | Project | What to capture |
|---|---------|----------------|
| 18 | OWP Forum | The Vue.js frontend — a page with real content |
| 19 | Medical App | Dashboard or patient records view |
| 20 | Drover Dashboard | The React analytics dashboard with data |
| 21 | 3DAI | OpenSCAD renders or the training pipeline output |

---

## Gemini Photo Enhancement Prompt

Use this prompt template for EVERY photo to ensure visual consistency. Upload your raw photo and paste this:

### Base Prompt (use for all photos):

```
Enhance this photo for use on a dark-themed portfolio website. Apply the following treatment consistently:

LIGHTING:
- Warm workshop-style lighting with a color temperature around 3200K
- Enhance existing light sources to create a moody, directional glow
- Add subtle warm ambient light from the left side as if from a desk lamp
- Deepen shadows on the right and bottom for depth
- Keep highlights soft, not blown out

COLOR GRADING:
- Warm shadows (slight orange/amber tint in dark areas)
- Cool highlights on any screens/monitors (slight blue shift on display light)
- Overall muted saturation — not vivid, not desaturated. Natural but cinematic.
- Blacks should be rich and deep, not grey

CLEANUP:
- Remove any distracting clutter or mess that doesn't serve the composition
- Keep the subject and key objects sharp
- Slightly soften/blur the background edges for depth of field effect
- Remove any text/labels that might be distracting

DO NOT:
- Make it look illustrated, painted, or cartoonish
- Add any filters that make it look like Instagram
- Change the composition or add objects that aren't there
- Over-sharpen or add HDR effects
- Make it look AI-generated — it should look like a well-shot photograph

The final result should look like professional product/workspace photography — the kind you'd see in a high-end tech YouTube studio tour or a Casey Neistat workshop shot. Real, premium, moody.
```

### Variant for Screen/Monitor Shots:

Add this to the base prompt when the photo includes a monitor:

```
SCREEN TREATMENT:
- Keep the screen content readable but reduce glare
- The screen should emit a subtle cool blue glow onto surrounding surfaces
- Screen brightness should be balanced with ambient lighting — not blindingly bright
```

### Variant for Workbench Wide Shots:

Add this when processing the wide workbench/desk shots:

```
COMPOSITION:
- This will be used as a panoramic background in a horizontal scrolling section
- Ensure the edges fade naturally to near-black so it blends with the dark site background
- The horizontal aspect ratio is important — don't crop to square
```

---

## Accessibility

Targeting **WCAG 2.2 AA** (California's current requirement per AB 434 and webstandards.ca.gov). State agencies must certify WCAG 2.2 AA compliance every 2 years. Demonstrating this on your own portfolio is a direct signal that you understand the standards state IT teams are required to follow.

- **`prefers-reduced-motion`:** When enabled, disable all GSAP animations (horizontal scroll-pan, parallax, typewriter effects). The hero section renders as a simple vertical stack of stations (same as mobile layout). Scroll indicator and progress bar are static.
- **Keyboard navigation:** The workbench section must be navigable with Tab/Arrow keys. Each station is a focusable landmark. Pressing Enter on a station's CTA activates it.
- **ARIA landmarks:** `<main>`, `<nav>`, `<section>` with `aria-label` for each major section (Hero, Projects, About, Experience, Contact).
- **Skip link:** Hidden "Skip to content" link at top of page, visible on focus, jumps past the hero to Projects section.
- **Alt text:** Every photo has descriptive alt text. Hero station photos: describe the scene and its career context (e.g., "Desk with router and ethernet cables representing IT operations work at Pool Time Pool and Spa"). Project screenshots: describe what the app shows.
- **Focus-visible:** Custom `:focus-visible` ring using `--accent-warm` with 2px offset on all interactive elements.
- **Color:** All text meets AA contrast minimums (verified in Design System section). No information conveyed by color alone.
- **Focus Not Obscured (WCAG 2.2):** When elements receive keyboard focus, they must not be fully hidden behind the fixed navbar. Add `scroll-margin-top` equal to navbar height on all focusable section targets.
- **Target Size (WCAG 2.2):** Minimum 24x24px for all click/tap targets. Our spec already requires 44px on mobile, which exceeds this.
- **Dragging Movements (WCAG 2.2):** No drag-only interactions in this design. The horizontal scroll is driven by vertical scrolling, which is keyboard-accessible.

---

## SEO & Meta

- **Title:** `Jeffrey Sardella — Full-Stack Developer & Builder`
- **Meta description:** `Portfolio of Jeffrey Sardella — full-stack developer from Sacramento, CA. C#, .NET, React, Python. Building multi-tier apps, REST APIs, and AI-powered tools.`
- **Open Graph (for LinkedIn sharing):**
  - `og:title`: same as title
  - `og:description`: same as meta description
  - `og:image`: a 1200x630 rendered screenshot of the workbench hero or Station 4 (manually created, stored in `public/og-image.jpg`)
  - `og:url`: `https://sardella.dev`
  - `og:type`: `website`
- **Twitter card:** `summary_large_image` with same image
- **Canonical URL:** `https://sardella.dev`
- **JSON-LD:** Person schema with name, jobTitle, url, sameAs (GitHub, LinkedIn)
- **Sitemap:** Not needed for a single-page app. Cloudflare Pages handles the SPA fallback — all routes serve `index.html`.

---

## Image Strategy

### Formats & Sizes

All photos served as WebP with JPEG fallback via `<picture>` element:
```html
<picture>
  <source srcset="photo-800w.webp 800w, photo-1200w.webp 1200w, photo-1600w.webp 1600w" type="image/webp">
  <img src="photo-1200w.jpg" alt="..." loading="lazy" width="1200" height="800">
</picture>
```

### Optimization Pipeline

Use `vite-imagetools` plugin to generate WebP + JPEG at 800w, 1200w, 1600w from source images at build time. Source images stored in `src/assets/photos/` (full resolution). Build output goes to optimized formats in `dist/`.

### Loading States

- All images have explicit `width` and `height` attributes to reserve space and prevent CLS.
- Hero station backgrounds: loaded eagerly (first 2) and lazily (last 2). Show a solid `--bg-surface` color until loaded.
- Project screenshots and thumbnails: lazy-loaded. Show a dark `--bg-surface` placeholder with a subtle shimmer animation until loaded.
- If an image fails to load: show the `--bg-surface` placeholder permanently. No broken image icon.

### Aspect Ratios

- Hero station backgrounds: 16:9 landscape
- Project screenshots: 16:10 (standard app window)
- Beyond Code thumbnails: 1:1 square crops
- OG image: 1200x630 (1.91:1)

---

## Technical Architecture

### Dependencies

```json
{
  "gsap": "^3.12",
  "@gsap/react": "^2",
  "lenis": "^1.1",
  "react": "^19",
  "react-dom": "^19",
  "tailwindcss": "^4"
}
```

**GSAP:** 3.12+ includes ScrollTrigger and SplitText in the free tier. The free license covers sites that do not charge users. A personal portfolio (even one advertising contract work) qualifies — GSAP's FAQ explicitly permits portfolios. If the license terms change post-Webflow acquisition, the site could fall back to CSS scroll-driven animations (`animation-timeline: scroll()`) for modern browsers, with a static fallback for older ones.

**Lenis:** Smooth scrolling library used by every 2025-2026 Awwwards portfolio winner alongside GSAP. Provides the "buttery" scroll feel expected at the award-winning tier. Integrates with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. Lightweight (~3KB gzipped).

### Component Structure

```
src/
  components/
    Navbar.tsx           — fixed nav with scroll-aware styling
    ScrollProgress.tsx   — thin progress bar for workbench section
    ProjectCard.tsx      — featured project row component
    ProjectGridCard.tsx  — compact project card
    TimelineEntry.tsx    — experience timeline item
    PhotoStrip.tsx       — horizontal scrollable thumbnail row
    ContactForm.tsx      — Formspree form
    Footer.tsx           — single-line footer
  sections/
    HeroSection.tsx      — workbench scroll-pan scene (GSAP)
    ProjectsSection.tsx  — featured + grid projects
    AboutSection.tsx     — bio + quick facts + photo strip
    ExperienceSection.tsx — vertical timeline
    ContactSection.tsx   — CTA + form
  hooks/
    useScrollTrigger.ts  — GSAP ScrollTrigger setup hook
    useLenis.ts          — Lenis smooth scroll init + GSAP sync
  assets/
    photos/              — enhanced photos (after Gemini processing)
  App.tsx
  main.tsx
  index.css              — Tailwind config + custom properties + GSAP animations
```

### Performance

- Photos: WebP + JPEG fallback via `<picture>`, lazy-loaded, responsive srcset (800w, 1200w, 1600w). See Image Strategy section.
- GSAP: Tree-shaken — only import ScrollTrigger, not full suite
- Fonts: Self-hosted subset woff2, `font-display: swap`. See Typography section.
- Target: < 3s initial load on 4G, < 1s on broadband
- Browser support: last 2 versions of Chrome, Firefox, Safari, Edge. No IE11.

### Mobile Strategy

- Breakpoint: `< 768px` (see Hero section for details)
- Horizontal scroll-pan → vertical card stack (no scroll hijacking on mobile)
- GSAP animations simplified: fade-in only via IntersectionObserver, no parallax
- Touch-friendly: all interactive elements min 44px tap targets
- Photo strip: horizontal swipe with CSS scroll-snap

### Routing & 404

Single-page app — all routes serve `index.html` via Cloudflare Pages SPA fallback. No client-side router needed (anchor-based navigation). A simple 404 component is out of scope for v1; unmatched routes will land on the main page.

### Animation Strategy

All animations use GSAP with Lenis smooth scrolling. The principle: **one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.**

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero name | Fade in, then cross-fade to navbar | Page load → first scroll |
| Station titles | SplitText character-by-character reveal | ScrollTrigger enter viewport |
| Station captions | SplitText line-by-line reveal | ScrollTrigger enter viewport, staggered after title |
| Section headings | SplitText word-by-word reveal | ScrollTrigger enter viewport |
| Project screenshots | Subtle parallax shift + warm glow | Hover |
| Project cards (compact) | Fade in + translateY(20px) | ScrollTrigger enter viewport, staggered |
| Timeline entries | Fade in from left, staggered | ScrollTrigger enter viewport |
| Beyond Code thumbnails | Scale from 0.95 + fade | ScrollTrigger enter viewport, staggered |
| Contact section | Heading SplitText reveal | ScrollTrigger enter viewport |

All animations respect `prefers-reduced-motion` — when enabled, all elements render immediately with no animation.

### Design Decisions

- **Dark mode only.** No light theme or theme toggle. The workbench aesthetic requires a dark canvas.
- **No analytics for v1.** Can add Cloudflare Web Analytics later (single script tag, no cookie banner needed).
- **No print stylesheet for v1.** Recruiters who want to print will use the downloadable PDF resume.

---

## What's Removed from Current Site

- Bento grid layout (everywhere)
- Indigo/purple color scheme
- Animated gradient hero
- Tech stack marquee
- Pulsing green "open to work" dot
- Emoji icons on everything
- Pastel gradient cards
- "I build things for the web" tagline
- Stats grid with big numbers
- Corporate bio copy

## What's New

- Horizontal scroll workbench hero with career narrative
- Real cinematic photography (AI-enhanced for consistency via Gemini)
- Dark workshop-themed design system (amber + blue accents)
- Lenis smooth scrolling + GSAP ScrollTrigger animations
- GSAP SplitText character/line reveals on headings (Awwwards-standard technique)
- Personal narrative voice in bio and project descriptions
- SDLC phase tags on featured projects (mirrors CalHR evaluation criteria)
- CalHR Software Engineering domain language in project descriptions
- Featured project showcase with real screenshots
- "Beyond code" macro photo strip
- WCAG 2.2 AA compliance (California state requirement)
- SEO + Open Graph meta for LinkedIn sharing
- Monospace typographic accents (Space Grotesk + JetBrains Mono)

## Research-Informed Design Rationale

This design is informed by two parallel research efforts:

**Portfolio Uniqueness Research:** Analysis of Awwwards SOTD/DEV winners (Stas Bondar, Eduard Bodak, Joffrey Spitzer, Cyd Stumpel), 2026 "Tactile Rebellion" design trend documentation, recruiter survey data (80% spend < 3 min on portfolios, 85% prioritize problem-solving evidence), and the documented "AI slop" anti-patterns (indigo-500 epidemic, bento grid overuse, Inter font default).

**California State IT Hiring Research:** CalHR structured interview examination process, ITA/ITS1 Software Engineering domain KSAs from the IT Allocation Guide, STD 678 screening methodology, and the finding that state panels do not formally evaluate portfolios — but that WCAG compliance, SDLC demonstration, and CalHR-aligned language serve as indirect signals of competence for any state IT professional who encounters the site.
