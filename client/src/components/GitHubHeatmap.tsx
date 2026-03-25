import { useEffect, useState } from 'react'

interface DayData {
  date: string
  count: number
  level: number // 0-4 intensity
}

const GITHUB_USERNAME = 'JeffreySardella'
const WEEKS_TO_SHOW = 20 // ~5 months, compact enough for a widget

/**
 * Fetches contribution data from GitHub's public contribution graph.
 * Uses the github-contributions-api (skyline proxy) to avoid auth requirements.
 * Falls back to generated placeholder data if the fetch fails.
 */
async function fetchContributions(): Promise<DayData[]> {
  try {
    // GitHub's public contribution graph is available as HTML — parse it
    // Alternative: use a public proxy API
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
    )
    if (!res.ok) throw new Error('API failed')

    const data = await res.json()
    const contributions: { date: string; count: number; level: number }[] =
      data.contributions || []

    // Take the last N weeks
    const cutoff = WEEKS_TO_SHOW * 7
    return contributions.slice(-cutoff).map((c) => ({
      date: c.date,
      count: c.count,
      level: c.level,
    }))
  } catch {
    // Fallback: return empty — widget will show "unable to load"
    return []
  }
}

function getColor(level: number): string {
  switch (level) {
    case 0:
      return 'bg-bg-elevated'
    case 1:
      return 'bg-accent-warm/20'
    case 2:
      return 'bg-accent-warm/40'
    case 3:
      return 'bg-accent-warm/70'
    case 4:
      return 'bg-accent-warm'
    default:
      return 'bg-bg-elevated'
  }
}

export default function GitHubHeatmap() {
  const [days, setDays] = useState<DayData[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null)

  useEffect(() => {
    fetchContributions().then((data) => {
      setDays(data)
      setLoading(false)
    })
  }, [])

  // Build week columns (7 rows per column)
  const weeks: DayData[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  const totalContributions = days.reduce((sum, d) => sum + d.count, 0)

  if (loading) {
    return (
      <div className="bg-bg-surface rounded-lg p-5 border border-border">
        <div className="h-24 shimmer rounded" />
      </div>
    )
  }

  if (days.length === 0) {
    return null // Silently hide if API fails — don't show a broken widget
  }

  return (
    <div className="bg-bg-surface rounded-lg p-5 border border-border">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
          GitHub Activity
        </p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-accent-warm hover:text-accent-warm-hover transition-colors"
        >
          @{GITHUB_USERNAME}
        </a>
      </div>

      {/* Heatmap grid */}
      <div className="flex gap-[3px] overflow-x-auto hide-scrollbar">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={`${wi}-${di}`}
                className={`w-[11px] h-[11px] rounded-sm ${getColor(day.level)} transition-all duration-150 hover:ring-1 hover:ring-accent-warm/50 cursor-default`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-text-muted">
          {hoveredDay ? (
            <>
              <span className="text-text font-medium">{hoveredDay.count}</span>{' '}
              contribution{hoveredDay.count !== 1 ? 's' : ''} on{' '}
              <span className="font-mono">{hoveredDay.date}</span>
            </>
          ) : (
            <>
              <span className="text-text font-medium">{totalContributions}</span>{' '}
              contributions in the last {WEEKS_TO_SHOW} weeks
            </>
          )}
        </p>

        {/* Legend */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-text-muted mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-[11px] h-[11px] rounded-sm ${getColor(level)}`}
            />
          ))}
          <span className="text-[10px] text-text-muted ml-1">More</span>
        </div>
      </div>
    </div>
  )
}
