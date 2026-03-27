import { useRef, useEffect, useState } from 'react'

const PHOTOS = [
  { caption: 'Homelab', src: '/photos/beyond-code/homelab-server.jpg' },
  { caption: 'Network', src: '/photos/beyond-code/network-panel.jpg' },
  { caption: 'Ren24DC', src: '/photos/beyond-code/renard-ren24dc.jpg' },
  { caption: '3D Printing', src: '/photos/beyond-code/3d-prints.jpg' },
  { caption: 'PC Build', src: '/photos/beyond-code/pc-build-rgb.jpg' },
  { caption: 'Sunflower PC', src: '/photos/beyond-code/sunflower-pc.jpg' },
  { caption: 'PCB Teardown', src: '/photos/beyond-code/pcb-teardown.jpg' },
  { caption: 'Desk Setup', src: '/photos/beyond-code/desk-setup.jpg' },
  { caption: 'LED Perfboard', src: '/photos/beyond-code/led-perfboard.jpg' },
]

const CARD_WIDTH = 200
const CARD_GAP = 16
const STEP = CARD_WIDTH + CARD_GAP

export default function PhotoStrip() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  // Calculate max index so the last photo is flush with the right edge
  const getMaxIndex = () => {
    const containerWidth = containerRef.current?.clientWidth ?? 1200
    const visibleCount = Math.floor((containerWidth + CARD_GAP) / STEP)
    return Math.max(0, PHOTOS.length - visibleCount)
  }

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setCurrent((i) => {
        const max = getMaxIndex()
        return i >= max ? 0 : i + 1
      })
    }, 3000)
    return () => clearInterval(timerRef.current)
  }, [paused])

  const goTo = (index: number) => {
    const max = getMaxIndex()
    setCurrent(Math.min(index, max))
    setPaused(true)
    setTimeout(() => setPaused(false), 6000)
  }

  const prev = () => goTo(current <= 0 ? getMaxIndex() : current - 1)
  const next = () => goTo(current >= getMaxIndex() ? 0 : current + 1)

  return (
    <div className="mt-16">
      <p className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
        Beyond Code
      </p>

      {/* Slideshow container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * STEP}px)` }}
        >
          {PHOTOS.map(({ caption, src }) => (
            <div
              key={caption}
              className="w-[200px] h-[200px] flex-shrink-0 mr-4 last:mr-0 rounded-lg overflow-hidden relative group"
            >
              <img
                src={src}
                alt={caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-bg/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-text text-sm font-mono">{caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/80 text-text flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/80 text-text flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          aria-label="Next photo"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: getMaxIndex() + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-accent-warm w-6' : 'bg-text-muted/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
