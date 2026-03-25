export interface Station {
  id: string
  date: string
  label: string
  caption: string
  photo: string
  bgClass: string
}

export const stations: Station[] = [
  {
    id: 'station-1',
    date: '2015',
    label: 'SHIFT MANAGER',
    caption: '5 years managing a team, solving problems before I knew it was engineering',
    photo: '/photos/journey/shift-manager.jpg',
    bgClass: 'bg-gradient-to-br from-amber-950/40 to-bg-surface',
  },
  {
    id: 'station-2',
    date: '2021',
    label: 'IT OPERATIONS',
    caption: 'Network infrastructure, fleet tracking, digital transformation',
    photo: '/photos/journey/it-operations.jpg',
    bgClass: 'bg-gradient-to-br from-blue-950/40 to-bg-surface',
  },
  {
    id: 'station-3',
    date: '2016 → 2026',
    label: 'EDUCATION PATH',
    caption: 'A.S. Sierra College (2016-2024) → B.S. Sac State (2024-2026)',
    photo: '/photos/journey/education.jpg',
    bgClass: 'bg-gradient-to-br from-emerald-950/40 to-bg-surface',
  },
  {
    id: 'station-4',
    date: 'NOW',
    label: 'THE WORKSHOP',
    caption: 'AI pipelines, game dev, homelabs, and everything in between',
    photo: '/photos/journey/workshop.jpg',
    bgClass: 'bg-gradient-to-br from-purple-950/40 to-bg-surface',
  },
]
