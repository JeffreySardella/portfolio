import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Returns a ref that holds the driving tween (usable as containerAnimation). */
export function useHorizontalScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  panelRef: React.RefObject<HTMLElement | null>,
  onProgress?: (progress: number) => void
): React.RefObject<gsap.core.Tween | null> {
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    if (!containerRef.current || !panelRef.current) return
    if (window.innerWidth < 768) return

    const panels = panelRef.current
    const totalScroll = panels.scrollWidth - window.innerWidth

    const tween = gsap.to(panels, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        id: 'hero-scroll',
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          onProgress?.(self.progress)
        },
      },
    })

    tweenRef.current = tween

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      tweenRef.current = null
    }
  }, [containerRef, panelRef, onProgress])

  return tweenRef
}
