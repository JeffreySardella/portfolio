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
        {PHOTOS.map(({ caption, src }) => (
          <div
            key={caption}
            className="w-[200px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden relative group"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={src}
              alt={caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Hover caption overlay */}
            <div className="absolute inset-0 bg-bg/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-text text-sm font-mono">{caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
