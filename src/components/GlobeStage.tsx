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
  // Cardboard hero cutout — Agustin arms-up in front of scrapbook mountains. It
  // greets you on load right below the ticket header and fades out as the globe
  // rises to take over. Mountains parallax independently from the figure.
  const heroRef = useRef<HTMLDivElement>(null)
  const heroManRef = useRef<HTMLImageElement>(null)
  const heroMtnRef = useRef<HTMLImageElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Globe rises from the bottom → centre, then HOLDS for the pinned beat. The
  // "release" is the sticky un-pinning at the section end (no fade-out gap).
  // IMPORTANT: only TRANSLATE the globe — never CSS-`scale` it. A CSS scale on the
  // WebGL canvas corrupts react-globe.gl's pointer→raycaster mapping (offsetX is
  // divided by the *unscaled* width), which made hover/click land in the wrong
  // place (you had to aim at the top-left to hit a country). Size the globe via
  // the camera altitude in GlobeHero instead, and lock the translate at 0 so the
  // interactive state has an identity transform.
  const globeY = useTransform(scrollYProgress, [0, 0.4], ['64%', '0%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Hint: surfaces during the pinned beat (0.42→0.52 in, hold, 0.9→1 out).
    if (hintRef.current) {
      const ho = v < 0.52 ? mapRange(v, 0.42, 0.52, 0, 1) : mapRange(v, 0.9, 1, 1, 0)
      hintRef.current.style.opacity = String(ho)
    }
    // Hero cutout: fully present at the top, gone by ~20% in as the globe rises.
    // (Opacity is written straight to the DOM — same StrictMode workaround as
    // the hint — while the figure/mountains parallax apart from each other.)
    if (heroRef.current) heroRef.current.style.opacity = String(mapRange(v, 0, 0.2, 1, 0))
    if (heroManRef.current) {
      heroManRef.current.style.transform = `translate(-50%, calc(-50% + ${mapRange(v, 0, 0.45, 0, -96)}px))`
    }
    if (heroMtnRef.current) {
      heroMtnRef.current.style.transform = `translate(-50%, calc(-50% + ${mapRange(v, 0, 0.45, 0, 44)}px))`
    }
  })

  return (
    <section ref={ref} id="globe" className="relative w-full" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the rising, pinning globe — straight on the kraft */}
        <motion.div className="absolute inset-0" style={{ y: globeY }}>
          <GlobeHero selected={selected} onSelect={onSelect} />
        </motion.div>

        {/* cardboard hero — scrapbook mountains SPLIT left+right under the ticket,
            Agustin centred with his hands up between them. Everything gently rocks
            (tilt left→centre→right) from page load, then the whole group parallaxes
            + fades out as the globe rises. Refs hold the parallax translate (written
            on scroll); the inner images carry the Framer rock so they don't fight. */}
        <div ref={heroRef} aria-hidden className="pointer-events-none absolute inset-0 z-[6]" style={{ opacity: 1 }}>
          <div
            ref={heroMtnRef}
            className="absolute left-1/2 top-[41%] w-[132vw] max-w-[1180px]"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <motion.img
              src="/agustin/mountains.png"
              alt=""
              draggable={false}
              className="absolute bottom-0 left-0 w-[47%] max-w-none select-none"
              style={{ transformOrigin: 'bottom center' }}
              animate={{ rotate: [-1.6, 1.6, -1.6] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="/agustin/mountains.png"
              alt=""
              draggable={false}
              className="absolute bottom-0 right-0 w-[47%] max-w-none select-none"
              style={{ scaleX: -1, transformOrigin: 'bottom center' }}
              animate={{ rotate: [1.6, -1.6, 1.6] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div
            ref={heroManRef}
            className="absolute left-1/2 top-[47%]"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <motion.img
              src="/agustin/hero-agustin.png"
              alt="Agustin, arms raised, taking it all in"
              draggable={false}
              className="h-[min(66vh,720px)] w-auto max-w-none select-none drop-shadow-[0_18px_30px_rgba(28,23,18,0.28)]"
              style={{ transformOrigin: 'bottom center' }}
              animate={{ rotate: [-2.4, 2.4, -2.4] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
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
