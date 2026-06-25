import { memo, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'

/**
 * The Match Ball Drawer (SPEC §7) — every World Cup ball Agustin grew up with,
 * 2010 → 2026, lined up on a timeline. Each is a stylised SVG homage (no fragile
 * image hotlinks): the sphere shell is shared, the signature print is unique.
 * On-brand: balls float on the kraft, years stamped in Anton, a route-dash line
 * threading the era like the rest of the page.
 */

interface BallDef {
  year: string
  name: string
  host: string
  base: string
  pattern: (id: string) => ReactNode
}

/* shared sphere — volume gradient, clip, rim shade + a single top-left highlight */
function Sphere({ id, base }: { id: string; base: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-vol`} cx="38%" cy="30%" r="78%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="52%" stopColor={base} />
        <stop offset="100%" stopColor="#bdbdb4" />
      </radialGradient>
      <radialGradient id={`${id}-rim`} cx="50%" cy="50%" r="50%">
        <stop offset="68%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(10,20,34,0.3)" />
      </radialGradient>
      <radialGradient id={`${id}-hi`} cx="33%" cy="27%" r="30%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <clipPath id={`${id}-clip`}>
        <circle cx="100" cy="100" r="86" />
      </clipPath>
      <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
  )
}

/* ── 2010 Jabulani — white ball, 11-colour pinwheel blades (Ipindelo) ── */
const jabulani = (id: string) => (
  <g clipPath={`url(#${id}-clip)`}>
    {['#e1342b', '#f4b223', '#2a8f4e', '#1f6fb2'].map((c, i) => (
      <path
        key={i}
        d="M100 100 C 118 70, 150 64, 168 78 C 150 92, 128 100, 100 100 Z"
        fill={c}
        opacity="0.92"
        transform={`rotate(${i * 90} 100 100)`}
      />
    ))}
    <circle cx="100" cy="100" r="9" fill="#14233a" />
    <g stroke="#c8c8c0" strokeWidth="1.6" fill="none" opacity="0.8">
      <path d="M30 60 Q 100 40 172 64" />
      <path d="M26 132 Q 100 158 176 130" />
    </g>
  </g>
)

/* ── 2014 Brazuca — 6 propeller panels, green/orange/blue seam ribbons ── */
const brazuca = (id: string) => (
  <g clipPath={`url(#${id}-clip)`}>
    {[
      { c: '#1f9d55', r: 0 },
      { c: '#ef7d22', r: 120 },
      { c: '#1f7fc4', r: 240 },
    ].map(({ c, r }, i) => (
      <path
        key={i}
        d="M100 100 C 70 78, 60 40, 86 22 C 112 40, 116 74, 100 100 Z"
        fill="none"
        stroke={c}
        strokeWidth="6"
        strokeLinejoin="round"
        opacity="0.9"
        transform={`rotate(${r} 100 100)`}
      />
    ))}
    {([
      ['#1f9d55', 100, 22],
      ['#ef7d22', 168, 138],
      ['#1f7fc4', 34, 138],
    ] as const).map(([c, x, y], i) => (
      <circle key={i} cx={x} cy={y} r="6.5" fill={c} />
    ))}
    <circle cx="100" cy="100" r="7" fill="#14233a" />
  </g>
)

/* ── 2018 Telstar 18 — charcoal pixel-print panels over white ── */
const telstar = (id: string) => (
  <g clipPath={`url(#${id}-clip)`}>
    <defs>
      <linearGradient id={`${id}-px`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3a3a3a" />
        <stop offset="100%" stopColor="#0d0d0d" />
      </linearGradient>
    </defs>
    <path d="M100 60 L132 84 L120 122 L80 122 L68 84 Z" fill={`url(#${id}-px)`} />
    <path d="M100 18 L132 30 L132 84 L100 60 L68 84 L68 30 Z" fill="#161616" opacity="0.92" />
    <path d="M132 84 L172 96 L162 138 L120 122 Z" fill="#161616" opacity="0.85" />
    <path d="M68 84 L28 96 L38 138 L80 122 Z" fill="#161616" opacity="0.85" />
    <path d="M80 122 L120 122 L116 170 L84 170 Z" fill={`url(#${id}-px)`} opacity="0.9" />
    {/* pixel grain dots */}
    <g fill="rgba(255,255,255,0.16)">
      {[[96, 78], [108, 92], [88, 100], [120, 104], [100, 150]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="3" height="3" />
      ))}
    </g>
  </g>
)

/* ── 2022 Al Rihla — pearlescent white, red/teal/gold speed facets ── */
const alrihla = (id: string) => (
  <g clipPath={`url(#${id}-clip)`}>
    {[
      { c: '#e23b4e', r: 12 },
      { c: '#1bb6c1', r: 90 },
      { c: '#f0a93b', r: 168 },
      { c: '#e23b4e', r: 246 },
      { c: '#1bb6c1', r: 300 },
    ].map(({ c, r }, i) => (
      <path
        key={i}
        d="M100 100 L150 40 L176 96 Z"
        fill={c}
        opacity="0.82"
        transform={`rotate(${r} 100 100)`}
      />
    ))}
    <g stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" fill="none">
      <path d="M100 100 L150 40 M100 100 L176 96 M100 100 L120 168 M100 100 L40 150 M100 100 L36 70" />
    </g>
    <circle cx="100" cy="100" r="6" fill="#14233a" />
  </g>
)

/* ── 2026 Trionda — three host colours in wavy wedges, gold stars ── */
const trionda = (id: string) => (
  <g clipPath={`url(#${id}-clip)`}>
    {[
      { c: '#d2333b', r: 0 }, // Canada red
      { c: '#1f7a44', r: 120 }, // Mexico green
      { c: '#1f5fa8', r: 240 }, // USA blue
    ].map(({ c, r }, i) => (
      <path
        key={i}
        d="M100 100 C 128 78, 150 30, 130 8 C 96 16, 78 56, 100 100 Z"
        fill={c}
        opacity="0.92"
        transform={`rotate(${r} 100 100)`}
      />
    ))}
    <g stroke="rgba(255,255,255,0.85)" strokeWidth="3.4" fill="none" strokeLinecap="round">
      <path d="M100 100 C 130 80, 150 34, 130 10" />
      <path d="M100 100 C 92 138, 122 168, 150 170" transform="rotate(120 100 100)" />
      <path d="M100 100 C 92 138, 122 168, 150 170" transform="rotate(240 100 100)" />
    </g>
    {[[100, 46], [142, 120], [58, 120]].map(([x, y], i) => (
      <path
        key={i}
        d="M0 -7 L1.8 -2 L7 -2 L2.6 1.2 L4.2 6.5 L0 3.2 L-4.2 6.5 L-2.6 1.2 L-7 -2 L-1.8 -2 Z"
        fill="#f1c94a"
        transform={`translate(${x} ${y})`}
      />
    ))}
    <circle cx="100" cy="100" r="6" fill="#fff" />
  </g>
)

const BALLS: BallDef[] = [
  { year: '2010', name: 'Jabulani', host: 'South Africa', base: '#f6f6f2', pattern: jabulani },
  { year: '2014', name: 'Brazuca', host: 'Brazil', base: '#f7f7f3', pattern: brazuca },
  { year: '2018', name: 'Telstar 18', host: 'Russia', base: '#f4f4ef', pattern: telstar },
  { year: '2022', name: 'Al Rihla', host: 'Qatar', base: '#f8f8f4', pattern: alrihla },
  { year: '2026', name: 'Trionda', host: 'USA · Can · Mex', base: '#f7f7f3', pattern: trionda },
]

function Ball({ def, index }: { def: BallDef; index: number }) {
  const id = `b${def.year}`
  const reduce = useReducedMotion()
  return (
    <Reveal y={30} delay={index * 0.07} className="flex shrink-0 flex-col items-center">
      <motion.svg
        viewBox="0 0 200 210"
        className="h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]"
        role="img"
        aria-label={`${def.name}, the ${def.year} World Cup match ball (${def.host}).`}
        animate={reduce ? undefined : { y: [0, -7, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={reduce ? undefined : { duration: 5 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
      >
        <Sphere id={id} base={def.base} />
        {/* contact shadow */}
        <ellipse cx="100" cy="196" rx="56" ry="8" fill="rgba(10,20,34,0.22)" filter={`url(#${id}-blur)`} />
        {/* sphere */}
        <circle cx="100" cy="100" r="86" fill={`url(#${id}-vol)`} />
        {def.pattern(id)}
        {/* rim volume + highlight, on top */}
        <circle cx="100" cy="100" r="86" fill={`url(#${id}-rim)`} />
        <ellipse cx="74" cy="68" rx="30" ry="22" fill={`url(#${id}-hi)`} />
      </motion.svg>

      <div className="mt-3 text-center">
        <div className="font-display text-[34px] leading-none tracking-[0.02em] text-ink">{def.year}</div>
        <div className="mt-1 font-marker text-[18px] leading-tight text-pitch">{def.name}</div>
        <div className="mt-[3px] font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">{def.host}</div>
      </div>
    </Reveal>
  )
}

// memo'd so the globe's country-select state in App doesn't re-render the balls.
export const WorldCupBalls = memo(function WorldCupBalls() {
  return (
    <section id="match-balls" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <Reveal>
        <div>
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[8px] w-[8px] rounded-full bg-gold" style={{ boxShadow: '0 0 0 3px rgba(200,153,47,0.18)' }} />
            The Match Balls · 2010 → 2026
          </p>
          <h2 className="mt-3 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
            Five Cups,
            <br className="hidden sm:block" /> Five Balls
          </h2>
          <p className="mt-4 max-w-[52ch] font-sans text-[15px] leading-[1.6] text-ink-2">
            It started with the Jabulani in 2010 — the World Cup that started everything. One ball for
            every tournament since, all the way to the Trionda I'll watch at home in '26.
          </p>
        </div>
      </Reveal>

      <Reveal y={36} delay={0.06}>
        <div className="relative mt-12">
          {/* the timeline thread behind the balls */}
          <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[58px] hidden h-[20px] w-full sm:block" aria-hidden>
            <line x1="20" y1="10" x2="980" y2="10" stroke="var(--gold)" strokeWidth="2" strokeDasharray="1 10" strokeLinecap="round" opacity="0.55" />
          </svg>
          <div className="relative flex flex-wrap items-start justify-center gap-x-8 gap-y-12 sm:gap-x-4 md:justify-between">
            {BALLS.map((b, i) => (
              <Ball key={b.year} def={b} index={i} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
})
