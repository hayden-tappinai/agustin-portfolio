interface JerseyBadgeProps {
  className?: string
}

/**
 * Jersey / stat badge (SPEC §5) — a player card. Huge Anton number on a
 * pitch-green kit, arched name, crest + maker marks, then a plate of stats in
 * Space Mono. The one volt note is the highlighter swipe behind "23". Static by
 * design (the globe owns hover).
 */
export function JerseyBadge({ className }: JerseyBadgeProps) {
  return (
    <div
      className={['relative overflow-hidden rounded-md bg-paper-2', className].filter(Boolean).join(' ')}
      style={{ border: '1px solid var(--paper-edge)', boxShadow: '0 18px 40px var(--paper-shadow)' }}
    >
      <span className="washi tape-gold" style={{ top: '-15px', left: '32px', transform: 'rotate(-6deg)', zIndex: 5 }} />
      <span className="washi tape-ocean" style={{ top: '-13px', right: '30px', transform: 'rotate(5deg)', zIndex: 5 }} />

      {/* Kit */}
      <div
        className="relative"
        style={{
          aspectRatio: '5 / 4',
          background: 'var(--pitch)',
          backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 58px, rgba(255,255,255,0.07) 58px 116px)',
        }}
      >
        <div className="absolute left-1/2 top-[26px] -translate-x-1/2 font-display text-[clamp(22px,5vw,34px)] uppercase tracking-[0.16em] text-white" style={{ textShadow: '0 2px 0 rgba(0,0,0,0.18)', opacity: 0.95 }}>
          Agustín
        </div>

        <svg className="absolute right-[18px] top-[18px]" width="100" height="80" viewBox="0 0 120 96" aria-hidden style={{ opacity: 0.5 }}>
          <g stroke="rgba(255,255,255,0.85)" strokeWidth="2" fill="none">
            <path d="M120 4 H40 V92 H120" />
            <path d="M120 26 H78 V70 H120" />
            <path d="M78 30 A24 24 0 0 0 78 66" />
          </g>
        </svg>

        <div
          className="absolute inset-0 grid place-items-center font-display leading-none text-white"
          style={{ fontSize: 'clamp(150px, 30vw, 260px)', letterSpacing: '0.02em', WebkitTextStroke: '3px rgba(255,255,255,0.28)', textShadow: '0 6px 0 rgba(0,0,0,0.12)' }}
        >
          10
        </div>

        <div className="absolute bottom-[18px] left-[18px] flex items-center gap-2">
          <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden>
            <path d="M2 2 H28 V22 L15 32 L2 22 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.6" />
            <circle cx="15" cy="14" r="6" fill="none" stroke="#c8992f" strokeWidth="1.6" />
            <path d="M15 8 L15 20 M9 14 L21 14" stroke="#c8992f" strokeWidth="1.4" />
          </svg>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/85">CF · No. 10</span>
        </div>

        <div className="absolute bottom-[18px] right-[18px] font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
          EST · MADRID · 03
        </div>
      </div>

      {/* Plate */}
      <div className="px-6 pb-6 pt-[22px]">
        <div className="flex items-end justify-between">
          <span className="font-display text-[clamp(32px,6vw,46px)] uppercase tracking-[0.02em] text-ink">Agustín R.</span>
          <span className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-pitch">Globetrotter</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-y-2 border-t border-dashed border-paper-edge pt-4 font-mono text-[13px] font-bold tracking-[0.06em] text-ink-2">
          <Stat label="Caps" value="47" />
          <Sep />
          <Stat label="Cities" value="31" />
          <Sep />
          <Stat label="Countries" value="23" spark />
        </div>

        <div className="mt-[18px] inline-flex items-center gap-2 rounded-full bg-paper px-[14px] py-[7px] pl-[9px]" style={{ border: '1px solid var(--paper-edge)', boxShadow: '0 2px 5px var(--paper-shadow)' }}>
          <span className="h-5 w-[30px] rounded-[3px]" style={{ background: 'linear-gradient(180deg,#c0362c 0 30%,#c8992f 30% 70%,#c0362c 70% 100%)' }} />
          <span className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-ink">España</span>
          <span className="font-mono text-[11px] tracking-[0.04em] text-ink-faint">40.42° N, 3.70° W</span>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, spark }: { label: string; value: string; spark?: boolean }) {
  return (
    <div className="flex flex-col gap-[6px] px-[14px] first:pl-0">
      <span className="text-[11px] tracking-[0.12em] text-ink-faint">{label}</span>
      <span className="relative inline-block w-fit text-[18px] text-ink">
        {spark && <span aria-hidden className="absolute -left-[3px] -right-[3px] bottom-[1px] h-[9px] bg-volt" style={{ transform: 'skewX(-12deg)', zIndex: -1 }} />}
        {value}
      </span>
    </div>
  )
}

function Sep() {
  return <span className="w-px self-stretch bg-paper-edge" />
}
