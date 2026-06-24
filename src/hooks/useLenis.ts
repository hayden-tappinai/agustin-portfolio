import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../lib/smoothScroll'

/**
 * Buttery, weighted smooth scroll for the whole page (Lenis). Real scroll under
 * the hood, so Framer Motion's `useScroll` (the globe choreography) and every
 * `whileInView` reveal keep working. Touch stays native (`syncTouch: false`) so
 * it never fights the globe's drag-to-rotate or trap a phone scroll. Disabled
 * for users who prefer reduced motion.
 */
export function useLenis(): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
    })
    setLenis(lenis)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
