import { useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import type { SelectedCountry } from '../types/country'
import { GlobeHero } from './GlobeHero'

interface GlobeStageProps {
  selected: SelectedCountry | null
  onSelect: (country: SelectedCountry) => void
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
/** Linear-map v through [inMin,inMax] onto [outMin,outMax], clamped. */
function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return outMin + clamp01((v - inMin) / (inMax - inMin)) * (outMax - outMin)
}

/**
 * The hero as a pinned scroll moment. A tall driver section holds a sticky
 * viewport: as you scroll down from the ticket header the globe RISES from the
 * bottom into the centre and grows, then the section PINS — the globe holds
 * large and full-screen, still spinnable — and as you keep scrolling it RELEASES
 * and the page flows on. The quiet name/tagline/ticket lockup fades up as the
 * globe takes over. No box — the globe lives straight on the kraft.
 *
 * The globe's rise/scale is transform-driven (Framer `useTransform`). The opacity
 * fades are written straight to the DOM on scroll (`useMotionValueEvent`), which
 * sidesteps a Framer/StrictMode quirk where derived opacity MotionValues freeze.
 */
export function GlobeStage({ selected, onSelect }: GlobeStageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLSpanElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Globe rises from the bottom → centre, then HOLDS for the pinned beat. The
  // "release" is the sticky un-pinning at the section end (no fade-out gap).
  const globeY = useTransform(scrollYProgress, [0, 0.4], ['58%', '30%'])
  const globeScale = useTransform(scrollYProgress, [0, 0.4], [0.74, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Hint: surfaces during the pinned beat (0.42→0.52 in, hold, 0.9→1 out).
    if (hintRef.current) {
      const ho = v < 0.52 ? mapRange(v, 0.42, 0.52, 0, 1) : mapRange(v, 0.9, 1, 1, 0)
      hintRef.current.style.opacity = String(ho)
    }
  })

  return (
    <section ref={ref} id="globe" className="relative w-full" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the rising, pinning globe — straight on the kraft */}
        <motion.div className="absolute inset-0" style={{ y: globeY, scale: globeScale }}>
          <GlobeHero selected={selected} onSelect={onSelect} />
        </motion.div>

        {/* drag hint during the pinned beat */}
        <span
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-faint"
          style={{ opacity: 0 }}
        >
          drag to spin · click a country
        </span>
      </div>
    </section>
  )
}
