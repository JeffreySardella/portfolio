export interface Project {
  title: string
  description: string
  challenge?: string // "what was hard" — replaces SDLC tags
  screenshot?: string // path to screenshot image
  techTags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'OWP Forum',
    description:
      'Forum platform for an organization that trains 14,000+ water professionals annually. Four-tier RBAC system (Admin, Mod, User, Guest), OTP email auth, and WCAG 2.2-compliant frontend.',
    challenge:
      'Building the permission middleware was tricky — every route needed to check role + ownership + resource state, and the client kept changing the permission matrix mid-sprint.',
    screenshot: '/photos/projects/owp-forum.png',
    techTags: ['PHP Slim', 'Vue.js', 'T-SQL', 'REST API', 'GitHub Actions'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: true,
  },
  {
    title: 'Medical Web Application',
    description:
      'Healthcare app with patient records, appointment scheduling, prescription tracking, and secure messaging. Led a 6-person Agile team through the full lifecycle.',
    challenge:
      'First time leading a team. Had to learn to delegate instead of doing everything myself, and mentored a teammate on SQL injection prevention after catching vulnerabilities in their code.',
    screenshot: '/photos/projects/medical-app.png',
    techTags: ['ASP.NET MVC', 'C#', 'SQL Server', 'REST API'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: true,
  },
  {
    title: 'Drover Analytics Dashboard',
    description:
      'Production analytics dashboard pulling data from GA4, Search Console, Google Ads, and Meta Ads through Supabase Edge Function proxies. Claude API generates insights from the data.',
    challenge:
      'Each ad platform returns data in completely different formats and time zones. Normalizing everything into a unified view without losing precision was a rabbit hole.',
    screenshot: '/photos/projects/drover-dashboard.png',
    techTags: ['React', 'TypeScript', 'Supabase', 'Claude API'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: true,
  },
  {
    title: 'GitPulse',
    description:
      'Full-stack GitHub analytics dashboard with commit heatmaps, language breakdowns, and repo stats. Background jobs sync data hourly via Hangfire with Polly retry logic. GitHub OAuth + JWT auth.',
    challenge:
      'Hardest part was designing the snapshot system — pre-computing daily aggregates so the dashboard loads instantly instead of querying months of raw commit data on every page load.',
    screenshot: '/photos/projects/gitpulse.png',
    techTags: ['ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Hangfire', 'Chart.js'],
    githubUrl: 'https://github.com/JeffreySardella/GitPulse',
    featured: true,
  },
  {
    title: '3DAI',
    description:
      'AI 3D model generation system built at Hornet Hacks 4.0. Agents iteratively generate and score OpenSCAD code, with multi-level regression and generalization testing.',
    challenge:
      'Built the entire training pipeline in 48 hours at a hackathon. The scoring system had to evaluate 3D geometry quality from 4-angle renders — we had to invent the rubric from scratch.',
    screenshot: '/photos/projects/3dai.gif',
    techTags: ['TypeScript', 'Node.js', 'OpenSCAD', 'Google AI API', 'Docker'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: true,
  },
  {
    title: 'CascadeGuard',
    description:
      'Detects prescribing cascades — when one drug is prescribed to treat side effects of another — using 65 validated patterns + 28M FDA adverse event pairs.',
    screenshot: '/photos/projects/cascadeguard.png',
    techTags: ['TypeScript', 'React', 'FDA OpenData'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: false,
  },
  {
    title: 'SmartTripPlanner',
    description:
      'Local AI trip planner with agent loop that researches destinations, checks calendar, validates travel times. 41 unit tests.',
    techTags: ['ASP.NET Core', 'Blazor', 'Ollama', 'SQLite'],
    githubUrl: 'https://github.com/JeffreySardella/SmartTripPlanner',
    featured: false,
  },
  {
    title: 'Discord Voice Word Tracker',
    description:
      'Captures per-user audio in Discord and transcribes speech on-device via Faster-Whisper. Privacy-first.',
    techTags: ['Python', 'Pycord', 'Faster-Whisper'],
    githubUrl: 'https://github.com/JeffreySardella/Discord-Word-Tracker',
    featured: false,
  },
  {
    title: 'X Country Filter',
    description:
      'Chrome extension filtering X posts by geographic origin via API interception and MutationObserver.',
    techTags: ['JavaScript', 'Chrome Extensions'],
    githubUrl: 'https://github.com/JeffreySardella/X-Country-Filter',
    featured: false,
  },
  {
    title: 'PogoFest Ticket Alerts Bot',
    description:
      'Discord bot that monitors ticket availability and sends alerts when drops are detected.',
    techTags: ['Python', 'discord.py', 'BeautifulSoup4', 'SQLite'],
    githubUrl: 'https://github.com/JeffreySardella/PogoFestTicketsDiscordBot',
    featured: false,
  },
  {
    title: 'Toontown Mini-Games',
    description:
      'Shipped Pizzatron 3000 multiplayer minigame in Unity with networking via Krypton library.',
    techTags: ['Unity3D', 'C#', 'Krypton'],
    liveUrl: 'https://toon.gg',
    featured: false,
  },
  {
    title: 'Drive Smart',
    description:
      'Defensive driving tips site built with custom WordPress theme, exported to Cloudflare Pages.',
    techTags: ['WordPress', 'PHP', 'HTML/CSS'],
    liveUrl: '/drive-smart/',
    featured: false,
  },
]
