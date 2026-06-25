import { memo } from 'react'
import { motion, useReducedMotion, type Transition } from 'framer-motion'
import { Reveal } from './Reveal'

/**
 * The Match Ball Drawer (SPEC §7) — every World Cup ball I grew up with,
 * 2010 → 2026, lined up on a timeline. Each is a REAL product photo of the
 * official match ball (sourced from Wikimedia Commons, background cut out and
 * fitted to a clean sphere) so they float on the kraft like the real thing.
 * On-brand: balls bob over a grounded contact shadow, years stamped in Anton,
 * a route-dash line threading the era like the rest of the page.
 */

interface BallDef {
  year: string
  name: string
  host: string
}

const BALLS: BallDef[] = [
  { year: '2010', name: 'Jabulani', host: 'South Africa' },
  { year: '2014', name: 'Brazuca', host: 'Brazil' },
  { year: '2018', name: 'Telstar 18', host: 'Russia' },
  { year: '2022', name: 'Al Rihla', host: 'Qatar' },
  { year: '2026', name: 'Trionda', host: 'USA · Can · Mex' },
]

function Ball({ def, index }: { def: BallDef; index: number }) {
  const reduce = useReducedMotion()
  const src = `${import.meta.env.BASE_URL}agustin/balls/${def.year}.webp`
  // one shared rhythm per ball so the ball and its shadow stay in sync
  const transition: Transition = {
    duration: 5 + index,
    repeat: Infinity,
    ease: 'easeInOut',
    delay: index * 0.3,
  }

  return (
    <Reveal y={30} delay={index * 0.07} className="group flex shrink-0 flex-col items-center">
      <div className="relative flex h-[132px] w-[120px] items-end justify-center sm:h-[154px] sm:w-[140px]">
        {/* grounded contact shadow — stays put while the ball bobs above it */}
        <motion.span
          aria-hidden
          className="absolute bottom-[4px] h-[15px] w-[80%] rounded-[50%]"
          style={{ background: 'radial-gradient(closest-side, rgba(58,42,18,0.42), rgba(58,42,18,0))', filter: 'blur(2.5px)' }}
          animate={reduce ? undefined : { scale: [1, 0.82, 1], opacity: [0.85, 0.55, 0.85] }}
          transition={reduce ? undefined : transition}
        />
        <motion.img
          src={src}
          width={140}
          height={140}
          loading="lazy"
          decoding="async"
          draggable={false}
          alt={`${def.name}, the ${def.year} World Cup match ball (${def.host}).`}
          className="relative h-[120px] w-[120px] object-contain transition-transform duration-300 ease-out group-hover:scale-[1.06] sm:h-[140px] sm:w-[140px]"
          style={{ filter: 'drop-shadow(0 9px 11px rgba(58,42,18,0.30))' }}
          animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-1.6, 1.6, -1.6] }}
          transition={reduce ? undefined : transition}
        />
      </div>

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
