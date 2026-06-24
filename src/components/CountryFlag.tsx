import { useState } from 'react'
import { flagEmoji } from '../lib/countries'

interface FlagProps {
  iso2: string | null
  className?: string
  style?: React.CSSProperties
}

/**
 * A country flag that renders identically on every platform: an SVG from
 * flagcdn (keyed by ISO alpha-2), falling back to the Unicode flag emoji if the
 * image can't load. Windows browsers don't ship flag emoji, so the image is
 * what keeps the flags from degrading to boxed letter pairs.
 */
export function Flag({ iso2, className, style }: FlagProps) {
  const [failed, setFailed] = useState(false)
  const code = iso2 ? iso2.toLowerCase() : null

  if (!code || failed) {
    return (
      <span aria-hidden className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
        {flagEmoji(iso2) || '🏳️'}
      </span>
    )
  }
  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      alt=""
      aria-hidden
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      style={{ objectFit: 'cover', display: 'block', ...style }}
    />
  )
}

interface FlagChipProps {
  iso2: string | null
  name: string
  /** Resting tilt — scattered across the page. */
  rotate?: number
  /** Click → open the country's story. */
  onClick?: () => void
  className?: string
}

/**
 * A real country flag as a little taped card — the passport-stamp motif,
 * replaced by the actual flags of the 17 countries Agustin has been to.
 * Clickable to open the story; fixed height so the scattered row stays tidy.
 */
export function FlagChip({ iso2, name, rotate = 0, onClick, className }: FlagChipProps) {
  const cls = [
    'group relative flex h-[112px] w-[112px] flex-col items-center justify-start gap-[8px] rounded-lg bg-paper-2 px-3 pt-4 text-center transition-transform',
    onClick ? 'cursor-pointer hover:-translate-y-1' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const style = {
    transform: `rotate(${rotate}deg)`,
    border: '1px solid var(--paper-edge)',
    boxShadow: '0 8px 18px var(--paper-shadow)',
  }

  const body = (
    <>
      <Flag iso2={iso2} className="h-[30px] w-[44px] rounded-[2px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      <span className="font-mono text-[10px] font-bold uppercase leading-[1.15] tracking-[0.06em] text-ink-2">
        {name}
      </span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls} style={style} aria-label={`Open ${name}`}>
        {body}
      </button>
    )
  }
  return (
    <div className={cls} style={style}>
      {body}
    </div>
  )
}
