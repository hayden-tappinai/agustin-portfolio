import type { SelectedCountry } from '../types/country'
import { GlobeHero } from './GlobeHero'

interface GlobeZoneProps {
  selected: SelectedCountry | null
  onSelect: (country: SelectedCountry) => void
  visitedCount: number
}

/**
 * The globe zone (SPEC §3, globe-cohesion card) — a navy panel that is the calm
 * center. The interactive globe lives here untouched; the navy panel's green
 * graticule reuses the exact globe hue for cohesion. The panel is washi-taped to
 * the kraft page (the kraft↔navy seam), framed with an ocean tab, corner mono
 * meta, and a compact legend keyed to the globe.
 */
export function GlobeZone({ selected, onSelect, visitedCount }: GlobeZoneProps) {
  return (
    <section id="globe" className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
      {/* intro on kraft */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[8px] w-[8px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
            The Map · {visitedCount} stamps
          </p>
          <h2 className="mt-3 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
            Where I've Been
          </h2>
        </div>
        <p className="max-w-[340px] font-hand text-[24px] leading-[1.15] text-ink-2" style={{ transform: 'rotate(-1.5deg)' }}>
          drag to spin it, hover to lift a country, click for the whole story →
        </p>
      </div>

      {/* navy globe panel — washi-taped onto the kraft page */}
      <div className="relative">
        <span className="washi tape-gold" style={{ top: '-16px', left: '6%', transform: 'rotate(-5deg)', zIndex: 20 }} />
        <span className="washi tape-ocean" style={{ top: '-14px', right: '9%', transform: 'rotate(4deg)', zIndex: 20 }} />

        <div
          className="navy-panel relative overflow-hidden rounded-2xl"
          style={{
            minHeight: 'clamp(380px, 64vh, 820px)',
            boxShadow: '0 26px 50px -22px rgba(10,20,34,0.8), inset 0 0 0 1px rgba(110,227,160,0.12)',
          }}
        >
          {/* the interactive globe fills the panel */}
          <GlobeHero selected={selected} onSelect={onSelect} />

          {/* ocean tab, breaks the top edge */}
          <span className="pointer-events-none absolute left-1/2 top-[-12px] z-10 -translate-x-1/2 rounded-[3px] bg-ocean px-[9px] py-[5px] font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-paper">
            The Globe · Orthographic
          </span>

          {/* corner meta (desktop only — keeps the small mobile globe uncluttered) */}
          <span className="pointer-events-none absolute left-4 top-4 z-10 hidden font-mono text-[9px] font-bold uppercase tracking-[0.14em] sm:block" style={{ color: 'rgba(110,227,160,0.6)' }}>
            ◐ Interactive · Drag to rotate
          </span>
          <span className="pointer-events-none absolute bottom-4 right-4 z-10 hidden font-mono text-[9px] font-bold uppercase tracking-[0.12em] sm:block" style={{ color: 'rgba(242,232,207,0.4)' }}>
            EPSG:4326 · WGS-84
          </span>

          {/* compact legend keyed to the globe (desktop only) */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden flex-col gap-[7px] rounded-lg px-[14px] py-[11px] sm:flex" style={{ background: 'rgba(10,20,34,0.55)', border: '1px solid rgba(110,227,160,0.18)' }}>
            <LegendChip label="Visited">
              <span className="h-[11px] w-[11px] rounded-full" style={{ background: '#54cf8a', border: '1.5px solid #155c34' }} />
            </LegendChip>
            <LegendChip label="Not yet">
              <span className="h-[11px] w-[11px] rounded-full" style={{ border: '1.5px dashed rgba(242,232,207,0.55)' }} />
            </LegendChip>
            <LegendChip label="You are here">
              <span className="h-[11px] w-[11px] rounded-full bg-volt" style={{ animation: 'volt-pulse 2.4s ease-in-out infinite' }} />
            </LegendChip>
          </div>
        </div>
      </div>

      {/* mobile legend row, below the globe (so it never crowds the small sphere) */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:hidden">
        <MobileKey label="Visited" color="#34965d" />
        <MobileKey label="Brighter = been there" color="#54cf8a" />
        <MobileKey label="You are here" color="#cdff3d" />
      </div>
    </section>
  )
}

function LegendChip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[10px]">
      <span className="flex w-[12px] justify-center">{children}</span>
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(234,242,234,0.85)' }}>
        {label}
      </span>
    </span>
  )
}

function MobileKey({ label, color }: { label: string; color: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-[10px] w-[10px] rounded-full" style={{ background: color }} />
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink-2">{label}</span>
    </span>
  )
}
