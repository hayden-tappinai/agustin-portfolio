import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** House spring (SPEC §7) — matches the globe lift + every settle. */
const SPRING = { type: 'spring', stiffness: 300, damping: 25 } as const

export interface TicketField {
  k: string
  v: string
  /** Accent the value: gold | volt | cream (default). */
  tone?: 'gold' | 'volt' | 'cream'
}

interface TicketStubProps {
  /** Anton headline on the main (right) half. */
  title: string
  /** A trailing glyph after the title, e.g. "→" or "✈". */
  glyph?: string
  /** The data fields printed on the main half. */
  fields: TicketField[]
  /** Small uppercase line at the top of the stub. */
  stubAdmit?: string
  /** The big Anton word on the stub (e.g. "VISITED", "ENTER"). */
  stubBig: string
  /** Gold sub-line under the stub word. */
  stubSub?: string
  /** Fires once the stub has fully torn away. */
  onTorn?: () => void
  /** Re-form the stub this many ms after it tears (showcase). Omit to leave torn. */
  resetAfter?: number
  /** Main-half colorway. */
  variant?: 'pitch' | 'ink'
  /** CSS width (the ticket is 2.1:1). */
  width?: string
  className?: string
}

/**
 * The signature ticket rip-off (SPEC §5 / §7.1). Two complementary clip-path
 * halves share one seam at 32%; clicking tears the stub — it detaches and
 * falls + rotates + fades on the house spring, the seam flashes volt, and the
 * main half recoils and settles. Re-arms after `resetAfter` for the hero
 * showcase, or stays torn (and calls `onTorn`) to drive a close/navigation.
 */
export function TicketStub({
  title,
  glyph = '→',
  fields,
  stubAdmit = 'ADMIT ONE',
  stubBig,
  stubSub,
  onTorn,
  resetAfter,
  variant = 'pitch',
  width = 'min(420px, 86vw)',
  className,
}: TicketStubProps) {
  const [torn, setTorn] = useState(false)

  const tear = useCallback(() => {
    if (torn) return
    setTorn(true)
  }, [torn])

  const handleExitComplete = useCallback(() => {
    onTorn?.()
    if (resetAfter !== undefined) {
      window.setTimeout(() => setTorn(false), resetAfter)
    }
  }, [onTorn, resetAfter])

  const mainBg = variant === 'pitch' ? 'var(--pitch)' : 'var(--ink)'

  const toneColor = (tone?: TicketField['tone']) =>
    tone === 'gold' ? 'var(--gold)' : tone === 'volt' ? 'var(--volt)' : 'var(--paper)'

  return (
    <button
      type="button"
      onClick={tear}
      aria-label={`${stubBig} — tear the ticket`}
      className={['group relative block cursor-pointer select-none border-0 bg-transparent p-0', className]
        .filter(Boolean)
        .join(' ')}
      style={{ width, aspectRatio: '2.1 / 1', filter: 'drop-shadow(0 16px 28px rgba(58,42,18,0.18))' }}
    >
      {/* MAIN half (right 68%) */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[14px]"
        style={{ clipPath: 'inset(0 0 0 32%)', background: mainBg, zIndex: 1 }}
        animate={torn ? { x: [0, 5, -1, 0] } : { x: 0 }}
        transition={{ duration: 0.44, ease: [0.18, 0.89, 0.32, 1.28] }}
      >
        <div
          className="absolute inset-0 grid content-between text-paper"
          style={{ left: '32%', padding: '12% 7% 12% 9%' }}
        >
          <div className="flex items-baseline gap-2">
            <span className="font-display uppercase leading-none" style={{ fontSize: 'clamp(15px,3.2vw,24px)', letterSpacing: '0.02em' }}>
              {title}
            </span>
            <span className="font-display" style={{ color: 'var(--gold)', fontSize: 'clamp(13px,2.6vw,20px)' }}>
              {glyph}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {fields.map((f) => (
              <div key={f.k} className="leading-tight">
                <div className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.14em', opacity: 0.65 }}>
                  {f.k}
                </div>
                <div className="font-mono font-bold" style={{ fontSize: 'clamp(11px,2.4vw,15px)', letterSpacing: '0.03em', color: toneColor(f.tone) }}>
                  {f.v}
                </div>
              </div>
            ))}
          </div>
          <div className="barcode-cream self-end" style={{ height: '14%', minHeight: '18px', borderRadius: '1px', opacity: 0.9 }} />
        </div>
      </motion.div>

      {/* STUB half (left 32%) — the piece that tears away */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {!torn && (
          <motion.div
            key="stub"
            className="absolute inset-0 overflow-hidden rounded-[14px]"
            style={{ clipPath: 'inset(0 68% 0 0)', background: 'var(--ink)', zIndex: 2, transformOrigin: 'right center' }}
            initial={false}
            exit={{ y: 156, rotate: -28, opacity: 0 }}
            transition={SPRING}
          >
            <div
              className="absolute inset-0 flex flex-col justify-between text-paper"
              style={{ width: '32%', padding: '8% 7%' }}
            >
              <span className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.16em', opacity: 0.7 }}>
                {stubAdmit}
              </span>
              <span className="font-display uppercase leading-none" style={{ fontSize: 'clamp(18px,4.4vw,30px)', letterSpacing: '0.02em' }}>
                {stubBig}
              </span>
              <span className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.14em', color: 'var(--gold)' }}>
                {stubSub ?? ''}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seam decoration — notches, dashed line, punched hole (overlay only) */}
      <span aria-hidden className="pointer-events-none absolute" style={{ top: 0, bottom: 0, left: '32%', width: 0, zIndex: 3, borderLeft: '2px dashed rgba(242,232,207,0.7)' }} />
      <span aria-hidden className="pointer-events-none absolute" style={{ left: '32%', top: '-10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--paper)', transform: 'translateX(-50%)', zIndex: 4, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)' }} />
      <span aria-hidden className="pointer-events-none absolute" style={{ left: '32%', bottom: '-10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--paper)', transform: 'translateX(-50%)', zIndex: 4, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)' }} />
      <span aria-hidden className="pointer-events-none absolute" style={{ left: '16%', top: '50%', width: '16px', height: '16px', borderRadius: '50%', border: '2px dashed rgba(242,232,207,0.55)', transform: 'translate(-50%,-50%)', zIndex: 5 }} />

      {/* Volt seam-flash at the split */}
      <AnimatePresence>
        {torn && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute"
            style={{ top: 0, bottom: 0, left: '32%', width: 0, zIndex: 6, borderLeft: '2px solid var(--volt-deep)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'linear' }}
          />
        )}
      </AnimatePresence>
    </button>
  )
}
