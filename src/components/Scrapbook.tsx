import { JerseyBadge } from './JerseyBadge'
import { CompassLegend } from './CompassLegend'
import { PassportStamp } from './PassportStamp'
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
 * The scrapbook collage section (SPEC §5) — the jersey/player card, the compass
 * + map legend, and a passport page of ink stamps. The warm analog layer that
 * wraps the calm globe.
 */
export function Scrapbook({ visitedCount }: ScrapbookProps) {
  return (
    <section id="scrapbook" className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10">
      <div className="mb-8">
        <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
          <span className="h-[8px] w-[8px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
          The Kit Bag · No. 10
        </p>
        <h2 className="mt-3 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
          Stamps &amp; Studs
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <JerseyBadge />
        <CompassLegend visitedCount={visitedCount} />
      </div>

      {/* passport page */}
      <div
        className="graticule-paper ruled-paper relative mt-10 overflow-hidden rounded bg-paper-2 px-6 py-8 sm:px-10"
        style={{ border: '1px solid var(--paper-edge)', boxShadow: '0 14px 30px var(--paper-shadow)' }}
      >
        <span className="absolute right-5 top-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint/70">
          Passport · Agustín
        </span>
        <h3 className="font-display text-[clamp(28px,4vw,40px)] uppercase leading-none tracking-[0.02em] text-ink">
          The Stamp Page
        </h3>
        <p className="mt-2 max-w-[44ch] font-sans text-[15px] leading-[1.6] text-ink-2">
          Every country he's been to leaves a mark. Red is a fresh entry, ocean is admitted, gold is a
          capital worth the trip.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:justify-start">
          {PASSPORT_STAMPS.map((p, i) => (
            <PassportStamp key={i} stamp={p.stamp} variant={p.variant} tone={p.tone} rotate={p.rotate} size={p.variant === 'rect' ? 30 : 116} />
          ))}
        </div>

        <p className="mt-6 font-hand text-[24px] text-ink-faint" style={{ transform: 'rotate(-1.5deg)' }}>
          ...and the page is nearly full. {visitedCount} down, the rest of the map to go ↗
        </p>
      </div>
    </section>
  )
}
