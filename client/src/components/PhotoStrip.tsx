const PHOTOS = [
  { caption: 'Homelab' },
  { caption: 'Soldering' },
  { caption: '3D Print' },
  { caption: 'PC Build' },
  { caption: 'Keyboard' },
  { caption: 'Game Modding' },
]

export default function PhotoStrip() {
  return (
    <div className="mt-16">
      <p className="text-sm font-mono text-text-muted uppercase tracking-widest mb-4">
        Beyond Code
      </p>
      <div
        className="flex gap-4 overflow-x-auto hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {PHOTOS.map(({ caption }) => (
          <div
            key={caption}
            className="w-[200px] h-[200px] flex-shrink-0 bg-bg-surface rounded-lg shimmer relative group"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Hover caption overlay */}
            <div className="absolute inset-0 bg-bg/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
              <span className="text-text text-sm font-mono">{caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
