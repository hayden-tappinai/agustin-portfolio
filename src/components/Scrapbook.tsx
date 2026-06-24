import { JerseyBadge } from './JerseyBadge'
import { CompassLegend } from './CompassLegend'
import { FlagChip } from './CountryFlag'
import { Reveal } from './Reveal'
import { FEATURED_COUNTRIES } from '../data/featured'
import type { SelectedCountry } from '../types/country'

/** Deterministic scatter so the flags read as hand-placed, never a rigid grid. */
const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4, -2, 3, -4, 2, -3, 5, -2, 4, -3]

interface ScrapbookProps {
  visitedCount: number
  onSelect: (country: SelectedCountry) => void
}

/**
 * The scrapbook collage — the jersey/player card, the compass + map legend, and
 * the passport "flag page": the real flags of all 17 countries Agustin has been
 * to, scattered straight onto the kraft. Click a flag to open its story. The
 * warm analog layer that trails the globe; everything reveals in on scroll.
 */
export function Scrapbook({ visitedCount, onSelect }: ScrapbookProps) {
  return (
    <section id="scrapbook" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <Reveal>
        <div>
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[8px] w-[8px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
            The Passport · {visitedCount} Stamped
          </p>
          <h2 className="mt-3 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
            Flags &amp; Studs
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

      {/* the flag page — the real flags of all 17, straight on the kraft */}
      <Reveal>
        <div className="relative mt-16">
          {/* a quiet route arc threading the page */}
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-40 z-0 h-[150px] w-full" aria-hidden style={{ opacity: 0.4 }}>
            <path d="M20 96 Q500 -28 980 64" stroke="#c0362c" strokeWidth="2" strokeDasharray="1 11" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="96" r="4" fill="#c0362c" />
            <circle cx="980" cy="64" r="4.5" fill="none" stroke="#c0362c" strokeWidth="2" />
          </svg>

          <div className="relative z-10 flex items-baseline justify-between">
            <h3 className="font-display text-[clamp(28px,4vw,40px)] uppercase leading-none tracking-[0.02em] text-ink">
              The Seventeen
            </h3>
            <span className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint/70 sm:block">
              Passport · Agustin
            </span>
          </div>
          <p className="relative z-10 mt-2 max-w-[52ch] font-sans text-[15px] leading-[1.6] text-ink-2">
            Every country he's been to — and yes, he drew all of their flags as a kid. Tap one to open the
            story.
          </p>

          <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-8 sm:justify-start">
            {FEATURED_COUNTRIES.map((country, i) => (
              <FlagChip
                key={country.key}
                iso2={country.iso2}
                name={country.name}
                rotate={ROTATIONS[i % ROTATIONS.length]}
                onClick={() => onSelect(country)}
              />
            ))}
            {/* the marker's one job (Permanent Marker, once per page) */}
            <span aria-hidden className="hidden font-marker text-[clamp(30px,4vw,48px)] text-stamp-red sm:block" style={{ transform: 'rotate(-8deg)', textShadow: '2px 3px 0 rgba(192,54,44,0.18)' }}>
              ¡GOL!
            </span>
          </div>

          <p className="relative z-10 mt-9 font-hand text-[24px] text-ink-faint" style={{ transform: 'rotate(-1.5deg)' }}>
            ...{visitedCount} down, every other flag already memorized ↗
          </p>
        </div>
      </Reveal>
    </section>
  )
}
