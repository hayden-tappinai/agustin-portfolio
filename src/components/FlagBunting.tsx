const PENNANT_COLORS = ['#1e7a46', '#14598c', '#c0362c', '#c8992f', '#3ea96b', '#0a1422']

interface FlagBuntingProps {
  count?: number
  className?: string
}

/**
 * A string of triangular pennants cycling the fusion colours (SPEC §4.13).
 * Tops the header like stadium / festival bunting. Static — no sway (the brand
 * card de-emphasises bunting motion).
 */
export function FlagBunting({ count = 22, className }: FlagBuntingProps) {
  return (
    <div className={['relative h-[46px] w-full', className].filter(Boolean).join(' ')} aria-hidden>
      {/* the string */}
      <span
        className="absolute left-0 right-0"
        style={{
          top: '6px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, var(--ink-2) 6%, var(--ink-2) 94%, transparent 100%)',
        }}
      />
      <div className="flex justify-between px-[2%]">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            style={{
              width: '34px',
              height: '40px',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: PENNANT_COLORS[i % PENNANT_COLORS.length],
              transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
              boxShadow: '0 4px 6px rgba(58,42,18,0.14)',
              flex: '0 0 auto',
            }}
          />
        ))}
      </div>
    </div>
  )
}
