export interface Project {
  title: string
  description: string
  techTags: string[]
  sdlcPhases: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    title: 'OWP Forum',
    description:
      'Designed, developed, and implemented a RESTful API in PHP Slim with full CRUD across a four-tier role-based access control system for a client serving 14,000+ professionals annually. Built WCAG 2.2-compliant Vue.js frontend components.',
    techTags: ['PHP Slim', 'Vue.js', 'T-SQL', 'REST API', 'GitHub Actions'],
    sdlcPhases: ['Requirements', 'Design', 'Development', 'Testing', 'Deployment', 'Documentation'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: true,
  },
  {
    title: 'Medical Web Application',
    description:
      'Led a 6-person Agile team developing a multi-tier healthcare application. Designed normalized SQL Server schema with stored procedures, built role-based authentication, and managed full software development lifecycle from requirements to deployment.',
    techTags: ['ASP.NET MVC', 'C#', 'SQL Server', 'REST API'],
    sdlcPhases: ['Requirements', 'Design', 'Development', 'Testing', 'Documentation'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: true,
  },
  {
    title: 'Drover Analytics Dashboard',
    description:
      'Built a production React/TypeScript analytics dashboard integrating GA4, Search Console, Google Ads, and Meta Ads through Supabase Edge Function API proxies. Includes Claude API-powered insights and CRM Kanban board.',
    techTags: ['React', 'TypeScript', 'Supabase', 'Claude API'],
    sdlcPhases: ['Requirements', 'Design', 'Development', 'Testing', 'Deployment'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: true,
  },
  {
    title: '3DAI',
    description:
      'Built a multi-level training pipeline for an AI 3D model generation system at Hornet Hacks 4.0. Level 1 agents iteratively generate and score OpenSCAD code, with regression and generalization testing at higher levels.',
    techTags: ['TypeScript', 'Node.js', 'OpenSCAD', 'Google AI API', 'Docker'],
    sdlcPhases: ['Design', 'Development', 'Testing'],
    githubUrl: 'https://github.com/JeffreySardella',
    featured: true,
  },
  {
    title: 'SmartTripPlanner',
    description:
      'Local AI trip planner with agent loop that researches destinations, checks calendar, validates travel times. 41 unit tests.',
    techTags: ['ASP.NET Core', 'Blazor', 'Ollama', 'SQLite'],
    githubUrl: 'https://github.com/JeffreySardella/SmartTripPlanner',
    sdlcPhases: [],
    featured: false,
  },
  {
    title: 'Discord Voice Word Tracker',
    description:
      'Captures per-user audio in Discord and transcribes speech on-device via Faster-Whisper. Privacy-first.',
    techTags: ['Python', 'Pycord', 'Faster-Whisper'],
    githubUrl: 'https://github.com/JeffreySardella/Discord-Word-Tracker',
    sdlcPhases: [],
    featured: false,
  },
  {
    title: 'X Country Filter',
    description:
      'Chrome extension filtering X posts by geographic origin via API interception and MutationObserver.',
    techTags: ['JavaScript', 'Chrome Extensions'],
    githubUrl: 'https://github.com/JeffreySardella/X-Country-Filter',
    sdlcPhases: [],
    featured: false,
  },
  {
    title: 'PogoFest Ticket Alerts Bot',
    description:
      'Discord bot that monitors ticket availability and sends alerts when drops are detected.',
    techTags: ['Python', 'discord.py', 'BeautifulSoup4', 'SQLite'],
    githubUrl: 'https://github.com/JeffreySardella/PogoFestTicketsDiscordBot',
    sdlcPhases: [],
    featured: false,
  },
  {
    title: 'Toontown Mini-Games',
    description:
      'Shipped Pizzatron 3000 multiplayer minigame in Unity with networking via Krypton library.',
    techTags: ['Unity3D', 'C#', 'Krypton'],
    liveUrl: 'https://toon.gg',
    sdlcPhases: [],
    featured: false,
  },
  {
    title: 'Drive Smart',
    description:
      'Defensive driving tips site built with custom WordPress theme, exported to Cloudflare Pages.',
    techTags: ['WordPress', 'PHP', 'HTML/CSS'],
    liveUrl: '/drive-smart/',
    sdlcPhases: [],
    featured: false,
  },
  {
    title: 'Restaurant App',
    description: 'Android restaurant ordering and management application.',
    techTags: ['Android Studio', 'Java'],
    githubUrl: 'https://github.com/JeffreySardella',
    sdlcPhases: [],
    featured: false,
  },
  {
    title: 'Web Load Tester',
    description: 'Performance testing tool using Java virtual threads for concurrent load generation.',
    techTags: ['Java', 'Virtual Threads'],
    githubUrl: 'https://github.com/JeffreySardella',
    sdlcPhases: [],
    featured: false,
  },
]
