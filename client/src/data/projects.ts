export interface Project {
  title: string
  description: string
  challenge?: string // "what was hard" — replaces SDLC tags
  screenshot?: string // path to screenshot image
  screenshotPosition?: string // CSS object-position value (default: 'top')
  screenshotFit?: 'cover' | 'contain' // CSS object-fit value (default: 'cover')
  screenshotBg?: string // CSS background color for contain mode
  techTags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'CalSight',
    description:
      'California crash data explorer that ingests CCRS datasets from data.ca.gov through an ETL pipeline into PostgreSQL. FastAPI serves filtered analytics to a React dashboard — all containerized with Docker Compose and deployed via GitHub Actions CI/CD.',
    challenge:
      'The raw CCRS data is messy — inconsistent county codes, missing coordinates, and mixed date formats across years. Building an ETL pipeline that cleaned and normalized everything without silently dropping records took more iteration than expected.',
    screenshot: '/photos/projects/calsight.mp4',
    techTags: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/JeffreySardella/CalSight',
    liveUrl: 'https://calsight.org',
    featured: true,
  },
  {
    title: 'OWP Forum',
    description:
      'Forum platform for an organization that trains 14,000+ water professionals annually. Four-tier RBAC system (Admin, Mod, User, Guest), OTP email auth, and WCAG 2.2-compliant frontend.',
    challenge:
      'Building the permission middleware was tricky — every route needed to check role + ownership + resource state, and the client kept changing the permission matrix mid-sprint.',
    screenshot: '/photos/projects/owp-forum.gif',
    techTags: ['PHP Slim', 'Vue.js', 'T-SQL', 'REST API', 'GitHub Actions'],
    githubUrl: 'https://github.com/MaxShkrabak/OWP-Forum',
    featured: true,
  },
  {
    title: 'Medical Web Application',
    description:
      'Healthcare app with patient records, appointment scheduling, prescription tracking, and secure messaging. Led a 6-person Agile team through the full lifecycle.',
    challenge:
      'First time leading a team. Had to learn to delegate instead of doing everything myself, and mentored a teammate on SQL injection prevention after catching vulnerabilities in their code.',
    screenshot: '/photos/projects/medical-app.gif',
    techTags: ['ASP.NET MVC', 'C#', 'SQL Server', 'REST API'],
    githubUrl: 'https://github.com/gbkabel/MedicalApp',
    featured: true,
  },
  {
    title: 'Drover Analytics Dashboard',
    description:
      'Production analytics dashboard pulling data from GA4, Search Console, Google Ads, and Meta Ads through Supabase Edge Function proxies. Claude API generates insights from the data.',
    challenge:
      'Each ad platform returns data in completely different formats and time zones. Normalizing everything into a unified view without losing precision was a rabbit hole.',
    screenshot: '/photos/projects/drover-dashboard.gif',
    techTags: ['React', 'TypeScript', 'Supabase', 'Claude API'],
    featured: true,
  },
  {
    title: 'GitPulse',
    description:
      'Full-stack GitHub analytics dashboard with commit heatmaps, language breakdowns, and repo stats. Background jobs sync data hourly via Hangfire with Polly retry logic. GitHub OAuth + JWT auth.',
    techTags: ['ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Hangfire', 'Chart.js'],
    githubUrl: 'https://github.com/JeffreySardella/GitPulse',
    featured: false,
  },
  {
    title: '3DAI',
    description:
      'AI 3D model generation system built at Hornet Hacks 4.0. Agents iteratively generate and score OpenSCAD code, with multi-level regression and generalization testing.',
    challenge:
      'Built the entire training pipeline in 48 hours at a hackathon. The scoring system had to evaluate 3D geometry quality from 4-angle renders — we had to invent the rubric from scratch.',
    screenshot: '/photos/projects/3dai.gif',
    screenshotPosition: 'center',
    techTags: ['TypeScript', 'Node.js', 'OpenSCAD', 'Google AI API', 'Docker'],
    githubUrl: 'https://github.com/zacbemis/3DAI',
    featured: true,
  },
  {
    title: 'CascadeGuard',
    description:
      'Detects prescribing cascades — when one drug is prescribed to treat side effects of another — using 65 validated patterns + 28M FDA adverse event pairs.',
    screenshot: '/photos/projects/cascadeguard.png',
    techTags: ['TypeScript', 'React', 'FDA OpenData'],
    githubUrl: 'https://github.com/JeffreySardella/CascadeGuard',
    featured: false,
  },
  {
    title: 'SmartTripPlanner',
    description:
      'Local AI trip planner that runs an agent loop with 9 tools — researches destinations, checks Google Calendar availability, validates travel times, and pushes finalized itineraries to your calendar. Includes a Chrome extension for saving locations from any webpage.',
    challenge:
      'Getting the agent loop to reliably converge was the real puzzle. The LLM would sometimes hallucinate tool calls or loop endlessly, so I had to build a 10-round cap with structured validation at each step to keep it on track.',
    screenshot: '/photos/projects/smarttripplanner.mp4',
    techTags: ['ASP.NET Core', 'Blazor', 'Ollama', 'Google Calendar API', 'SQLite', 'Chrome Extension'],
    githubUrl: 'https://github.com/JeffreySardella/SmartTripPlanner',
    featured: true,
  },
  {
    title: 'ItinerBot',
    description:
      'Discord bot that syncs with Google Calendar to send trip itineraries and ticket-sale alerts. SerpAPI integration for auto sale-time lookup.',
    techTags: ['Python', 'discord.py', 'Google Calendar API', 'SerpAPI'],
    githubUrl: 'https://github.com/JeffreySardella/ItinerBot',
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
