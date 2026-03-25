interface ScrollProgressProps {
  progress: number // 0 to 1
  visible: boolean
}

export default function ScrollProgress({ progress, visible }: ScrollProgressProps) {
  return (
    <div
      className="fixed bottom-0 left-0 h-[3px] z-40 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent-warm transition-none"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
