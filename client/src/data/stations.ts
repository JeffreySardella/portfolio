export interface Station {
  id: string
  date: string
  label: string
  caption: string
  bgClass: string // Tailwind gradient for placeholder (will be replaced by photos later)
}

export const stations: Station[] = [
  {
    id: 'station-1',
    date: '2015',
    label: "SHIFT MANAGER'S COUNTER",
    caption: 'Built a C# desktop app to automate labor calculations',
    bgClass: 'bg-gradient-to-br from-amber-950/40 to-bg-surface',
  },
  {
    id: 'station-2',
    date: '2021',
    label: 'IT OPERATIONS',
    caption: 'Network infrastructure, fleet tracking, digital transformation',
    bgClass: 'bg-gradient-to-br from-blue-950/40 to-bg-surface',
  },
  {
    id: 'station-3',
    date: '2021 → 2026',
    label: 'EDUCATION PATH',
    caption: 'A.S. Sierra College → B.S. Sacramento State',
    bgClass: 'bg-gradient-to-br from-emerald-950/40 to-bg-surface',
  },
  {
    id: 'station-4',
    date: 'NOW',
    label: 'THE WORKSHOP',
    caption: 'AI pipelines, game dev, homelabs, and everything in between',
    bgClass: 'bg-gradient-to-br from-purple-950/40 to-bg-surface',
  },
]
