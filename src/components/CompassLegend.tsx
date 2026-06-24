interface CompassLegendProps {
  visitedCount: number
  nextCount?: number
  className?: string
}

/**
 * Compass rose + map legend (SPEC §4.11 / §5). The gold needle is fixed at
 * ~044° NE, pointing home to Madrid — never spins. The legend keys the globe:
 * ● visited · ◌ next · dashed = route. The one volt note is the pulsing
 * "you-are-here" dot.
 */
export function CompassLegend({ visitedCount, nextCount = 9, className }: CompassLegendProps) {
  return (
    <div className={['flex flex-col gap-5 sm:flex-row sm:items-center', className].filter(Boolean).join(' ')}>
      {/* Compass card */}
      <div
        className="graticule-paper relative shrink-0 rounded bg-paper-2 p-5"
        style={{ border: '1px solid var(--paper-edge)', boxShadow: '0 14px 30px var(--paper-shadow)' }}
      >
        <span className="washi tape-gold" style={{ top: '-12px', left: '30px', transform: 'rotate(-5deg)' }} />
        <div className="mb-1 flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">Bearing</span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-stamp-red">044° NE</span>
        </div>
        <svg viewBox="0 0 340 340" width="200" height="200" aria-label="Compass rose pointing home to Madrid">
          <defs>
            <linearGradient id="cl-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e3be5c" />
              <stop offset="50%" stopColor="#c8992f" />
              <stop offset="100%" stopColor="#9c7320" />
            </linearGradient>
          </defs>
          <circle cx="170" cy="170" r="158" stroke="#8a7e68" strokeWidth="1" opacity="0.4" fill="none" />
          <circle cx="170" cy="170" r="150" stroke="#8a7e68" strokeWidth="1" opacity="0.25" fill="none" />
          {/* cardinal ticks */}
          <g stroke="#4a4034" strokeWidth="1.4" opacity="0.6">
            <line x1="170" y1="12" x2="170" y2="26" />
            <line x1="170" y1="314" x2="170" y2="328" />
            <line x1="12" y1="170" x2="26" y2="170" />
            <line x1="314" y1="170" x2="328" y2="170" />
          </g>
          {/* degree labels */}
          <g fontFamily="var(--font-mono)" fontSize="9" fill="#8a7e68" textAnchor="middle">
            <text x="170" y="30">000</text>
            <text x="306" y="173">090</text>
            <text x="170" y="312">180</text>
            <text x="34" y="173">270</text>
          </g>
          {/* diagonal spokes */}
          <g fill="#4a4034" opacity="0.85">
            <polygon points="170,170 218,122 195,148" />
            <polygon points="170,170 218,218 195,192" />
            <polygon points="170,170 122,218 145,192" />
            <polygon points="170,170 122,122 145,148" />
          </g>
          {/* cardinal spokes (two-tone) */}
          <polygon points="170,170 158,182 170,28" fill="#1c1712" />
          <polygon points="170,170 182,182 170,28" fill="#4a4034" />
          <polygon points="170,170 158,158 170,312" fill="#4a4034" />
          <polygon points="170,170 182,158 312,170" fill="#2a2117" />
          <polygon points="170,170 158,158 28,170" fill="#4a4034" />
          {/* gold needle — home bearing, static */}
          <polygon points="170,170 162,178 226,114 178,162" fill="url(#cl-gold)" stroke="#8a6a1c" strokeWidth="1" />
          <circle cx="226" cy="114" r="4.5" fill="#c8992f" stroke="#8a6a1c" strokeWidth="1" />
          {/* center pip */}
          <circle cx="170" cy="170" r="9" fill="#fbf7ec" stroke="#1c1712" strokeWidth="2" />
          <circle cx="170" cy="170" r="3" fill="#1c1712" />
          {/* labels */}
          <text x="170" y="64" fontFamily="var(--font-display)" fontSize="30" fill="#1c1712" textAnchor="middle">N</text>
          <text x="170" y="300" fontFamily="var(--font-display)" fontSize="15" fill="#4a4034" textAnchor="middle">S</text>
          <text x="296" y="176" fontFamily="var(--font-display)" fontSize="15" fill="#4a4034" textAnchor="middle">E</text>
          <text x="44" y="176" fontFamily="var(--font-display)" fontSize="15" fill="#4a4034" textAnchor="middle">W</text>
        </svg>
        <p className="mt-1 text-center font-hand text-[20px] text-ink-2" style={{ transform: 'rotate(-2deg)' }}>
          home is always Madrid
        </p>
      </div>

      {/* Legend card */}
      <div className="overflow-hidden rounded bg-[#fbf7ec]" style={{ border: '1.5px solid var(--ink)', boxShadow: '0 12px 26px var(--paper-shadow)' }}>
        <div className="flex items-baseline justify-between bg-ink px-[18px] py-[10px]">
          <span className="font-display text-[20px] uppercase tracking-[0.01em] text-paper">Map Key</span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-paper-edge">EPSG:4326</span>
        </div>
        <ul className="px-[18px] py-1">
          <LegendRow name="Visited" count={`${visitedCount} stamped`}>
            <svg width="15" height="15" viewBox="0 0 15 15"><circle cx="7.5" cy="7.5" r="6" fill="#1e7a46" stroke="#155c34" strokeWidth="1.5" /></svg>
          </LegendRow>
          <LegendRow name="Next Trip" count={`${nextCount} planned`}>
            <svg width="15" height="15" viewBox="0 0 15 15"><circle cx="7.5" cy="7.5" r="6" fill="none" stroke="#1c1712" strokeWidth="1.6" strokeDasharray="2.6 2.2" /></svg>
          </LegendRow>
          <LegendRow name="Route" count="dotted">
            <svg width="26" height="13" viewBox="0 0 26 13"><path d="M1 11 Q13 -3 25 6" stroke="#c0362c" strokeWidth="1.8" fill="none" strokeDasharray="1 4" strokeLinecap="round" /></svg>
          </LegendRow>
          <LegendRow name="You Are Here" count="live" last>
            <span className="block h-[13px] w-[13px] rounded-full border-[1.5px] border-ink bg-volt" style={{ animation: 'volt-pulse 2.4s ease-in-out infinite' }} />
          </LegendRow>
        </ul>
      </div>
    </div>
  )
}

function LegendRow({ name, count, last, children }: { name: string; count: string; last?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-[14px] py-[11px]" style={{ borderBottom: last ? 'none' : '1px dashed var(--paper-edge)' }}>
      <span className="flex w-[26px] justify-center">{children}</span>
      <span className="font-mono text-[12.5px] font-bold uppercase tracking-[0.1em] text-ink">{name}</span>
      <span className="ml-auto font-mono text-[11px] tracking-[0.06em] text-ink-faint">{count}</span>
    </li>
  )
}
