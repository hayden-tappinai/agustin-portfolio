import { useRef } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import type { SelectedCountry } from '../types/country'
import { GlobeHero } from './GlobeHero'
import { TicketStub } from './TicketStub'
import { scrollToTarget } from '../lib/smoothScroll'

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
  const lockupRef = useRef<HTMLDivElement>(null)
  const lockupInnerRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLSpanElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Globe rises from the bottom → centre, then HOLDS for the pinned beat. The
  // "release" is the sticky un-pinning at the section end (no fade-out gap).
  const globeY = useTransform(scrollYProgress, [0, 0.4], ['58%', '30%'])
  const globeScale = useTransform(scrollYProgress, [0, 0.4], [0.74, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Lockup: fades up as the globe rises into the pin.
    if (lockupRef.current) {
      lockupRef.current.style.opacity = String(mapRange(v, 0.04, 0.24, 1, 0))
      lockupRef.current.style.transform = `translateY(${mapRange(v, 0.04, 0.24, 0, -10)}%)`
    }
    if (lockupInnerRef.current) {
      lockupInnerRef.current.style.pointerEvents = v < 0.2 ? 'auto' : 'none'
    }
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

        {/* quiet lockup, off to one side (fades as the globe takes over) */}
        <div
          ref={lockupRef}
          className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1180px] items-center px-6 sm:px-10"
        >
          <div ref={lockupInnerRef} className="max-w-[26rem]">
            <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
              <span className="h-[7px] w-[7px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
              40.4168° N, 3.7038° W
            </p>

            <h1 className="mt-3 font-display uppercase leading-[1.04] tracking-[0.02em] text-ink" style={{ fontSize: 'clamp(40px,6vw,72px)' }}>
              Agustin
            </h1>

            <p className="mt-1 font-hand text-[clamp(24px,3.2vw,34px)] leading-tight text-pitch" style={{ transform: 'rotate(-2deg)' }}>
              footy &amp; far-flung places
            </p>

            <p className="mt-5 max-w-[22rem] font-sans text-[15px] leading-[1.6] text-ink-2">
              Spin the world, lift a country, and click anywhere I've left a stamp.
            </p>

            <div className="mt-6">
              <TicketStub
                title="Boarding Pass"
                glyph="✈"
                fields={[
                  { k: 'From', v: 'MADRID' },
                  { k: 'To', v: 'THE WORLD', tone: 'gold' },
                  { k: 'Seat', v: '10A' },
                ]}
                stubAdmit="Admit One"
                stubBig="Tear"
                stubSub="to begin"
                variant="pitch"
                width="min(380px, 84vw)"
                onTorn={() => scrollToTarget('scoreboard')}
                resetAfter={1100}
              />
              <span className="mt-3 block font-hand text-[20px] text-ink-faint" style={{ transform: 'rotate(-1.5deg)' }}>
                ↑ tear it — or just keep scrolling
              </span>
            </div>
          </div>
        </div>

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
