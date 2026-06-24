import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { FIXTURE, STATS, type Stat } from '../data/stats'

/** B/W iconic soccer-ball mark (static — drawn motion lives in Higgsfield). */
function BallMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#eaf2ea" stroke="#0a1422" strokeWidth="2" />
      <polygon points="32,18 41,25 37,36 27,36 23,25" fill="#0a1422" />
      <path d="M32 18 L32 6 M41 25 L52 20 M37 36 L44 47 M27 36 L20 47 M23 25 L12 20" stroke="#0a1422" strokeWidth="2" fill="none" />
    </svg>
  )
}

function CountUp({ value, thousands }: { value: number; thousands?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => {
    const n = Math.round(v)
    return thousands ? n.toLocaleString('en-US') : String(n)
  })
  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 0.9, ease: [0.65, 0, 0.35, 1] })
    return () => controls.stop()
  }, [inView, value, mv])
  return <motion.span ref={ref}>{text}</motion.span>
}

function StatWell({ stat }: { stat: Stat }) {
  return (
    <div
      className="relative rounded-xl px-[18px] pb-[18px] pt-5"
      style={{
        background: 'rgba(0,0,0,0.28)',
        boxShadow: stat.live
          ? 'inset 0 2px 6px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(205,255,61,0.3)'
          : 'inset 0 2px 6px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {stat.live && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded bg-stamp-red px-[7px] py-[3px] font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-paper">
          <span className="h-[5px] w-[5px] rounded-full bg-paper" style={{ animation: 'blip 1.1s steps(1) infinite' }} />
          Live
        </span>
      )}
      <div
        className="font-display uppercase tracking-[0.03em]"
        style={{ fontSize: '14px', color: 'rgba(190,205,200,0.62)' }}
      >
        {stat.label}
      </div>
      <div
        className="mt-3 font-mono font-bold leading-none"
        style={{
          fontSize: 'clamp(34px, 5vw, 46px)',
          letterSpacing: '0.01em',
          fontVariantNumeric: 'tabular-nums',
          color: stat.live ? '#cdff3d' : '#dde8de',
          textShadow: stat.live
            ? '0 0 10px rgba(205,255,61,0.55), 0 0 26px rgba(205,255,61,0.3)'
            : '0 0 1px rgba(255,255,255,0.25), 0 2px 0 rgba(0,0,0,0.5)',
          animation: stat.live ? 'led-glow 3.2s var(--ease-paper) infinite' : undefined,
        }}
      >
        <CountUp value={stat.value} thousands={stat.thousands} />
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'rgba(150,168,162,0.6)' }}>
        {stat.sub}
      </div>
    </div>
  )
}

export function Scoreboard({ className }: { className?: string }) {
  return (
    <div
      className={['navy-panel relative overflow-hidden rounded-[20px] px-7 py-8 sm:px-9', className].filter(Boolean).join(' ')}
      style={{
        border: '1px solid rgba(0,0,0,0.4)',
        boxShadow:
          '0 28px 60px rgba(10,20,34,0.45), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 0 1px rgba(110,227,160,0.06)',
      }}
    >
      {/* LED scanline comb */}
      <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0 2px, transparent 2px 4px)', opacity: 0.5, mixBlendMode: 'multiply' }} />

      <div className="relative">
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <BallMark />
            <span className="font-display text-[clamp(22px,4vw,30px)] uppercase tracking-[0.025em]" style={{ color: '#eaf2ea' }}>
              By The Numbers
            </span>
          </div>
          <div className="text-right font-mono text-[11px] uppercase leading-[1.7] tracking-[0.12em]" style={{ color: 'rgba(180,196,190,0.7)' }}>
            <div>EST. 2010</div>
            <div>FOOTY + FLAGS</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-[18px] lg:grid-cols-4">
          {STATS.map((s) => (
            <StatWell key={s.label} stat={s} />
          ))}
        </div>

        {/* Fixture strip */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            <span className="text-[20px] leading-none" aria-hidden>{FIXTURE.home.flag}</span>
            <span className="font-display text-[clamp(24px,4vw,34px)]" style={{ color: '#eaf2ea' }}>{FIXTURE.home.code}</span>
            <span
              className="rounded-lg px-[18px] py-[6px] font-mono text-[clamp(26px,4vw,40px)] font-bold tracking-[0.04em]"
              style={{ background: 'rgba(0,0,0,0.3)', color: '#dde8de', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.55)' }}
            >
              {FIXTURE.score.split(':')[0]}
              <span style={{ color: 'var(--gold)' }}>:</span>
              {FIXTURE.score.split(':')[1]}
            </span>
            <span className="font-display text-[clamp(24px,4vw,34px)]" style={{ color: '#eaf2ea' }}>{FIXTURE.away.code}</span>
            <span className="text-[20px] leading-none" aria-hidden>{FIXTURE.away.flag}</span>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <div className="flex items-center justify-end gap-2 font-mono text-[13px] tracking-[0.1em]" style={{ color: 'var(--gold)' }}>
              <span className="h-[6px] w-[6px] rounded-full bg-gold" />
              {FIXTURE.clock}
            </div>
            <div className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.12em]" style={{ color: 'rgba(180,196,190,0.6)' }}>
              {FIXTURE.note.map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
