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
      'React/TypeScript analytics dashboard integrating GA4, Search Console, Google Ads, and Meta Ads with Claude API-powered insights',
      'Drover Content — multi-tenant B2B SaaS on Next.js + Supabase with four-role RBAC and Stripe billing',
      'Playwright-based RPA tool for automated data collection workflows',
    ],
  },
  {
    title: 'Team Lead & Full-Stack Developer',
    company: 'OWP Forum — Sacramento State',
    location: 'Sacramento, CA',
    dates: 'Oct 2025 – May 2026',
    current: false,
    bullets: [
      'Led an 8-person Agile team building a PHP Slim REST API with four-tier RBAC for a client serving 14,000+ professionals',
      'Vue.js frontend components and CI/CD via GitHub Actions; delivered and handed off to the client in May 2026',
    ],
  },
  {
    title: 'Project Lead & Backend Developer',
    company: 'Medical Web Application — Sac State',
    location: 'Sacramento, CA',
    dates: 'Jan – May 2024',
    current: false,
    bullets: [
      'Led 6-person Agile team: ASP.NET MVC, SQL Server, role-based auth',
      'Full CRUD, requirements specs, ERDs, architecture diagrams',
    ],
  },
  {
    title: 'Game Developer (Volunteer)',
    company: 'Toontown in Unity',
    location: 'Remote — toon.gg',
    dates: 'Oct 2021 – Nov 2023',
    current: false,
    bullets: [
      'Shipped Pizzatron 3000 multiplayer minigame in C#',
      'Networking via Krypton library with real-time data sync',
    ],
  },
  {
    title: 'IT Assistant & Operations Support',
    company: 'Pool Time Pool and Spa',
    location: 'Rancho Cordova, CA',
    dates: 'Jan – Jun 2021',
    current: false,
    bullets: [
      'Network infrastructure, GPS fleet tracking for 5-10 vehicles',
      'Digital transformation: paper records to searchable digital formats',
    ],
  },
  {
    title: 'Shift Manager',
    company: 'Burger and Cream',
    location: 'Auburn, CA',
    dates: 'Nov 2015 – Dec 2020',
    current: false,
    bullets: [
      'Built C# desktop app to automate labor calculations',
      'POS system migration, ethernet cabling, security camera setup',
    ],
  },
]
