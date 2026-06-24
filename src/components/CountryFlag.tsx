import { flagEmoji } from '../lib/countries'

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
 * replaced by the actual flags of the 17 countries Agustin has been to. Emoji
 * flags (one per country, Vatican included). Clickable to open the story.
 */
export function FlagChip({ iso2, name, rotate = 0, onClick, className }: FlagChipProps) {
  const flag = flagEmoji(iso2) || '🏳️'
  const cls = [
    'group relative flex w-[112px] flex-col items-center gap-[6px] rounded-lg bg-paper-2 px-3 py-3 text-center transition-transform',
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
      <span className="text-[40px] leading-none drop-shadow-sm" aria-hidden>
        {flag}
      </span>
      <span className="font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.08em] text-ink-2">
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
