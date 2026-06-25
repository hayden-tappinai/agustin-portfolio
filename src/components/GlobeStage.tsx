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

/** A hand-drawn scrapbook arrow (Caveat-era scrawl), rotated to point at the globe. */
function ScrawlArrow({ className, rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, overflow: 'visible' }}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 14 C 40 6, 92 18, 104 58" />
      <path d="M104 58 L 88 44" />
      <path d="M104 58 L 110 36" />
    </svg>
  )
}

/**
 * The hero as a pinned scroll moment. A tall driver section holds a sticky
 * viewport. At the top: the ticket header, a big scrapbook mountain range PINNED
 * to the bottom (weighted bottom-left) with Agustin centred, hands up. As you
 * scroll the hero fades + parallaxes down and the globe RISES from behind the
 * mountains into the centre, where it LOCKS — large, spinnable, clickable. Once
 * locked, handwritten callouts fade in around it to guide you (click a country,
 * spin it, keep scrolling).
 *
 * NB: the globe is only ever TRANSLATED, never CSS-`scale`d — a transform scale on
 * the WebGL canvas breaks react-globe.gl's pointer→raycaster picking. Size comes
 * from the camera altitude in GlobeHero.
 */
export function GlobeStage({ selected, onSelect }: GlobeStageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroManRef = useRef<HTMLDivElement>(null)
  const heroMtnRef = useRef<HTMLDivElement>(null)
  const calloutRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Globe rises from below → centre, then locks. TRANSLATE ONLY (see note above).
  const globeY = useTransform(scrollYProgress, [0, 0.4], ['64%', '0%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Hero (mountains + Agustin): present at the top, gone as the globe rises.
    if (heroRef.current) heroRef.current.style.opacity = String(mapRange(v, 0, 0.22, 1, 0))
    if (heroManRef.current) {
      heroManRef.current.style.transform = `translateX(-50%) translateY(${mapRange(v, 0, 0.4, 0, 90)}px)`
    }
    if (heroMtnRef.current) {
      heroMtnRef.current.style.transform = `translateY(${mapRange(v, 0, 0.4, 0, 130)}px)`
    }
    // Callouts: fade in once the globe locks (0.42→0.55), hold, fade out (0.9→1).
    if (calloutRef.current) {
      const o = v < 0.6 ? mapRange(v, 0.42, 0.55, 0, 1) : mapRange(v, 0.9, 1, 1, 0)
      calloutRef.current.style.opacity = String(o)
    }
  })

  return (
    <section ref={ref} id="globe" className="relative w-full" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the rising, locking globe — straight on the kraft (translate only) */}
        <motion.div className="absolute inset-0" style={{ y: globeY }}>
          <GlobeHero selected={selected} onSelect={onSelect} />
        </motion.div>

        {/* cardboard hero — big scrapbook mountains PINNED to the bottom (weighted
            bottom-left), Agustin centred with hands up. Gently rocks from load,
            then fades + parallaxes down as the globe rises from behind it. */}
        <div ref={heroRef} aria-hidden className="pointer-events-none absolute inset-0 z-[6]" style={{ opacity: 1 }}>
          <div ref={heroMtnRef} className="absolute inset-x-0 bottom-0" style={{ transform: 'translateY(0px)' }}>
            <motion.img
              src="/agustin/mountains.png"
              alt=""
              draggable={false}
              className="absolute bottom-0 left-[-6%] w-[min(1120px,80vw)] max-w-none select-none"
              style={{ transformOrigin: 'bottom center' }}
              animate={{ rotate: [-1.1, 1.1, -1.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src="/agustin/mountains.png"
              alt=""
              draggable={false}
              className="absolute bottom-0 right-[-5%] w-[min(720px,52vw)] max-w-none select-none"
              style={{ scaleX: -1, transformOrigin: 'bottom center' }}
              animate={{ rotate: [1.1, -1.1, 1.1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div ref={heroManRef} className="absolute bottom-[1%] left-1/2" style={{ transform: 'translateX(-50%)' }}>
            <motion.img
              src="/agustin/hero-agustin.png"
              alt="Agustin, arms raised, taking it all in"
              draggable={false}
              className="h-[min(60vh,660px)] w-auto max-w-none select-none drop-shadow-[0_18px_30px_rgba(28,23,18,0.28)]"
              style={{ transformOrigin: 'bottom center' }}
              animate={{ rotate: [-2.2, 2.2, -2.2] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* handwritten guidance — fades in once the globe is locked + centred */}
        <div
          ref={calloutRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 text-ink-2"
          style={{ opacity: 0 }}
        >
          {/* top-left */}
          <div className="absolute left-[3.5%] top-[11%] max-w-[230px] -rotate-3">
            <p className="font-hand text-[clamp(22px,2.6vw,34px)] font-bold leading-tight text-ink">
              Click into a country
            </p>
            <ScrawlArrow className="mt-1 h-9 w-14 text-stamp-red" rotate={12} />
          </div>

          {/* top-right — explore / spin, arrow pointing at the globe */}
          <div className="absolute right-[3.5%] top-[9%] max-w-[260px] rotate-2 text-right">
            <p className="font-hand text-[clamp(24px,3vw,40px)] font-bold leading-none text-ink">
              Explore around!
            </p>
            <p className="mt-1 font-hand text-[clamp(18px,2vw,26px)] leading-tight text-ink-2">
              drag to spin the globe if you want
            </p>
            <ScrawlArrow className="ml-auto mt-1 h-10 w-16 text-stamp-red" rotate={118} />
          </div>

          {/* just above the globe */}
          <div className="absolute left-1/2 top-[3%] -translate-x-1/2 text-center">
            <p className="font-hand text-[clamp(20px,2.3vw,30px)] leading-tight text-ink-2">
              the countries I've been to
            </p>
          </div>

          {/* bottom-left */}
          <div className="absolute bottom-[7%] left-[3.5%] max-w-[240px] -rotate-2">
            <p className="font-hand text-[clamp(20px,2.3vw,30px)] font-bold leading-tight text-ink">
              Keep scrolling to read my story
            </p>
            <ScrawlArrow className="mt-1 h-10 w-12 text-stamp-red" rotate={-42} />
          </div>
        </div>
      </div>
    </section>
  )
}
