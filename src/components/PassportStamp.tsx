import type { StoryStamp } from '../types/country'

type Tone = 'red' | 'ocean' | 'gold'

const TONE_HEX: Record<Tone, string> = {
  red: '#c0362c',
  ocean: '#14598c',
  gold: '#c8992f',
}

interface PassportStampProps {
  stamp: StoryStamp
  variant?: 'circle' | 'rect'
  tone?: Tone
  /** Rotation in degrees. */
  rotate?: number
  /** Diameter (circle) / min-width (rect). */
  size?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * A passport / postage ink stamp (SPEC §4.6). Multiply-blended, faded and
 * rotated so it reads as real ink soaked into paper, never a sticker. The big
 * word is Anton; all chrome is Space Mono. Colour carries meaning: red = entry,
 * ocean = admitted/control, gold = capital/special.
 */
export function PassportStamp({
  stamp,
  variant = 'circle',
  tone = 'red',
  rotate = -13,
  size = 124,
  className,
  style,
}: PassportStampProps) {
  const c = TONE_HEX[tone]
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    color: c,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    opacity: 0.9,
    mixBlendMode: 'multiply',
    transform: `rotate(${rotate}deg)`,
    border: `2.5px solid ${c}`,
    textAlign: 'center',
    ...style,
  }

  if (variant === 'rect') {
    return (
      <div
        className={className}
        style={{
          ...base,
          minWidth: size + 100,
          padding: '14px 22px 16px',
          boxShadow: `inset 0 0 0 1px ${c}`,
          display: 'grid',
          gap: '6px',
          justifyItems: 'center',
          position: 'relative',
        }}
      >
        <span aria-hidden style={{ position: 'absolute', inset: '6px', border: `1px solid ${c}`, opacity: 0.55 }} />
        {stamp.entry && (
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em' }}>{stamp.entry}</span>
        )}
        <span className="font-display" style={{ fontSize: '30px', letterSpacing: '0.04em', lineHeight: 1 }}>
          {stamp.city}
        </span>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>{stamp.date}</span>
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        ...base,
        width: size,
        height: size,
        borderRadius: '50%',
        boxShadow: `inset 0 0 0 3px ${tone === 'red' ? 'rgba(192,54,44,0.32)' : tone === 'ocean' ? 'rgba(20,89,140,0.3)' : 'rgba(200,153,47,0.3)'}`,
        display: 'grid',
        placeItems: 'center',
        padding: '14px',
      }}
    >
      <div style={{ display: 'grid', justifyItems: 'center', gap: '3px' }}>
        <span aria-hidden style={{ fontSize: '14px', lineHeight: 1 }}>✦</span>
        {stamp.entry && (
          <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.12em' }}>{stamp.entry}</span>
        )}
        <span className="font-display" style={{ fontSize: '22px', letterSpacing: '0.03em', lineHeight: 1 }}>
          {stamp.city}
        </span>
        <span style={{ fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.1em' }}>{stamp.date}</span>
      </div>
    </div>
  )
}
