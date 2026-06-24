import { JerseyBadge } from './JerseyBadge'
import { CompassLegend } from './CompassLegend'
import { PassportStamp } from './PassportStamp'
import { Reveal } from './Reveal'
import type { StoryStamp } from '../types/country'

interface StampPlacement {
  stamp: StoryStamp
  variant?: 'circle' | 'rect'
  tone?: 'red' | 'ocean' | 'gold'
  rotate: number
}

const PASSPORT_STAMPS: StampPlacement[] = [
  { stamp: { entry: 'ENTRY · MAD', city: 'MADRID', date: '06 MAY 2026' }, tone: 'red', rotate: -12 },
  { stamp: { entry: 'ADMITTED', city: 'LONDON', date: '01 NOV 2025' }, variant: 'rect', tone: 'ocean', rotate: 6 },
  { stamp: { entry: 'CAPITAL', city: 'TOKYO', date: '21 APR 2025' }, tone: 'gold', rotate: -5 },
  { stamp: { entry: 'ENTRY · GIG', city: 'RIO', date: '19 JAN 2026' }, tone: 'red', rotate: 9 },
  { stamp: { entry: 'ENTRY · EZE', city: 'BS. AIRES', date: '13 MAR 2026' }, tone: 'ocean', rotate: -8 },
]

interface ScrapbookProps {
  visitedCount: number
}

/**
 * The scrapbook collage (SPEC §5) — the jersey/player card, the compass + map
 * legend, and a passport page of ink stamps scattered straight onto the kraft
 * (no box). The warm analog layer that trails the globe; everything reveals in
 * on scroll so it reads as one continuous page.
 */
export function Scrapbook({ visitedCount }: ScrapbookProps) {
  return (
    <section id="scrapbook" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <Reveal>
        <div>
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[8px] w-[8px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
            The Kit Bag · No. 10
          </p>
          <h2 className="mt-3 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
            Stamps &amp; Studs
          </h2>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Reveal x={-22}>
          <JerseyBadge />
        </Reveal>
        <Reveal x={22} delay={0.08}>
          <CompassLegend visitedCount={visitedCount} />
        </Reveal>
      </div>

      {/* the passport page — stamps straight on the kraft, no box */}
      <Reveal>
        <div className="relative mt-16">
          {/* a quiet route arc threading the page */}
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-10 z-0 h-[140px] w-full" aria-hidden style={{ opacity: 0.5 }}>
            <path d="M20 96 Q500 -28 980 64" stroke="#c0362c" strokeWidth="2" strokeDasharray="1 11" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="96" r="4" fill="#c0362c" />
            <circle cx="980" cy="64" r="4.5" fill="none" stroke="#c0362c" strokeWidth="2" />
          </svg>

          <div className="relative z-10 flex items-baseline justify-between">
            <h3 className="font-display text-[clamp(28px,4vw,40px)] uppercase leading-none tracking-[0.02em] text-ink">
              The Stamp Page
            </h3>
            <span className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint/70 sm:block">
              Passport · Agustin
            </span>
          </div>
          <p className="relative z-10 mt-2 max-w-[44ch] font-sans text-[15px] leading-[1.6] text-ink-2">
            Every country he's been to leaves a mark. Red is a fresh entry, ocean is admitted, gold is a
            capital worth the trip.
          </p>

          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:justify-start">
            {PASSPORT_STAMPS.map((p, i) => (
              <PassportStamp key={i} stamp={p.stamp} variant={p.variant} tone={p.tone} rotate={p.rotate} size={p.variant === 'rect' ? 30 : 116} />
            ))}
            {/* the marker's one job (SPEC §2 — Permanent Marker, once per page) */}
            <span aria-hidden className="hidden font-marker text-[clamp(34px,5vw,56px)] text-stamp-red sm:block" style={{ transform: 'rotate(-8deg)', textShadow: '2px 3px 0 rgba(192,54,44,0.18)' }}>
              ¡GOL!
            </span>
          </div>

          <p className="relative z-10 mt-8 font-hand text-[24px] text-ink-faint" style={{ transform: 'rotate(-1.5deg)' }}>
            ...and the page is nearly full. {visitedCount} down, the rest of the map to go ↗
          </p>
        </div>
      </Reveal>
    </section>
  )
}
