import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { SelectedCountry } from '../types/country'
import { getStory, isVisited } from '../data/stories'
import { flagEmoji } from '../lib/countries'
import { Polaroid } from './Polaroid'
import { PassportStamp } from './PassportStamp'
import { TicketStub } from './TicketStub'

const SPRING = { type: 'spring', stiffness: 300, damping: 25 } as const

interface CountryPanelProps {
  /** The selected country (always non-null while mounted; AnimatePresence in
   *  App keeps it mounted through the exit animation). */
  country: SelectedCountry
  onClose: () => void
}

/**
 * THE scrapbook journal entry (SPEC §5 destination card) — the centerpiece.
 * A torn, faintly-graticuled journal page on aged tan: the country name in
 * Anton, coordinates in Space Mono, a handwritten Caveat story, taped Polaroids,
 * a passport stamp, an arriving route line, and the ticket rip-off as the
 * "return to globe" control.
 */
export function CountryPanel({ country, onClose }: CountryPanelProps) {
  const story = getStory(country)
  const visited = isVisited(country)
  const flag = flagEmoji(country.iso2)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  // Escape to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Move focus into the panel on open, restore it on close.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => {
      if (restoreFocusRef.current?.isConnected) restoreFocusRef.current.focus()
    }
  }, [])

  const photos = story.photos.slice(0, 2)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: 'rgba(10,20,34,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-label={`${country.name} — photos and story`}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-[1000px]"
        initial={{ opacity: 0, scale: 0.92, rotate: -4, y: 24 }}
        animate={{ opacity: 1, scale: 1, rotate: -1.1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, rotate: -3, y: 16 }}
        transition={SPRING}
      >
        {/* under-edge (the page beneath) */}
        <span aria-hidden className="absolute" style={{ inset: '8px -5px -8px 8px', background: 'var(--paper-edge)', transform: 'rotate(-1.1deg)', zIndex: -1, opacity: 0.8 }} />

        {/* the journal page */}
        <div
          className="graticule-paper torn-deckle relative bg-paper-2 px-6 pb-14 pt-10 sm:px-12"
          style={{ boxShadow: '0 22px 48px rgba(58,42,18,0.18), 0 2px 0 var(--paper-edge)' }}
        >
          {/* red margin rule */}
          <span aria-hidden className="absolute bottom-0 top-0 hidden sm:block" style={{ left: '38px', width: '2px', background: 'rgba(192,54,44,0.32)' }} />

          {/* close (X) */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-ink/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stamp-red"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* arriving route line */}
          {story.routeFrom && (
            <svg viewBox="0 0 300 80" className="absolute left-6 top-1 w-[260px] sm:left-12" aria-hidden style={{ opacity: 0.8 }}>
              <text x="2" y="12" fontFamily="var(--font-mono)" fontSize="9" fill="#8a7e68" letterSpacing="1">{`FROM ${story.routeFrom} ✈`}</text>
              <path d="M8 44 Q150 -6 290 36" stroke="#c0362c" strokeWidth="2.4" strokeDasharray="1 9" strokeLinecap="round" fill="none" />
              <circle cx="8" cy="44" r="4" fill="#c0362c" />
              <circle cx="290" cy="36" r="4.5" fill="none" stroke="#c0362c" strokeWidth="2" />
            </svg>
          )}

          <div className="grid gap-8 pl-0 sm:pl-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT — the country */}
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                {flag && <span aria-hidden className="text-[34px] leading-none">{flag}</span>}
                <span className="font-mono text-[13px] font-bold uppercase tracking-[0.18em] text-ink-2" style={{ border: '1.5px solid var(--ink-2)', padding: '4px 8px' }}>
                  {country.iso3 ?? '—'}
                </span>
                {visited ? (
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-pitch">● Visited</span>
                ) : (
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">◌ Next trip</span>
                )}
              </div>

              <h2 className="mt-3 font-display uppercase text-ink" style={{ fontSize: 'clamp(48px,7.4vw,88px)', lineHeight: 0.98, letterSpacing: '0.015em' }}>
                {country.name}
              </h2>

              <p className="mt-2 flex items-center gap-2 font-mono text-[13px] font-bold tracking-[0.08em] text-ocean">
                <span className="text-stamp-red">📍</span>
                {story.coords}
              </p>

              <p className="mt-5 font-hand text-[22px] font-bold leading-tight text-pitch" style={{ transform: 'rotate(-1deg)' }}>
                {story.title}
              </p>

              <p className="mt-2 max-w-[34ch] font-hand text-[clamp(24px,3vw,29px)] leading-[1.32] text-ink-2">
                {story.body}
              </p>

              {/* mini navy stat strip */}
              {story.stamp && (
                <div className="mt-6 inline-flex flex-wrap items-center gap-x-6 gap-y-2 rounded-md px-[18px] py-[14px]" style={{ background: 'var(--navy)', boxShadow: '0 8px 20px rgba(10,20,34,0.3)' }}>
                  <Stat label="Entry" value={story.stamp.date} />
                  <span className="h-7 w-px bg-white/12" />
                  <Stat label="City" value={story.stamp.city} />
                  <span className="h-7 w-px bg-white/12" />
                  <Stat label="Status" value={visited ? 'STAMPED' : 'PENDING'} live={visited} />
                </div>
              )}

              {/* return ticket — the rip-off close */}
              <div className="mt-8">
                <TicketStub
                  title="Return"
                  glyph="→"
                  fields={[
                    { k: 'From', v: country.iso3 ?? country.name.slice(0, 3).toUpperCase() },
                    { k: 'To', v: 'GLOBE', tone: 'gold' },
                  ]}
                  stubAdmit="Tear off"
                  stubBig="Back"
                  stubSub="to globe"
                  variant="ink"
                  width="min(320px, 80vw)"
                  onTorn={onClose}
                />
              </div>
            </div>

            {/* RIGHT — the collage */}
            <div className="relative min-h-[360px]">
              {/* coffee ring */}
              <span aria-hidden className="absolute right-8 top-0 hidden h-[74px] w-[74px] rounded-full sm:block" style={{ border: '3px solid rgba(120,82,38,0.18)', boxShadow: 'inset 0 0 0 2px rgba(120,82,38,0.07)' }} />

              {photos[0] && (
                <Polaroid photo={photos[0]} rotate={2.4} fixing="washi" tape="tape-ocean" width="clamp(220px, 80%, 300px)" className="ml-auto" style={{ position: 'relative', zIndex: 10 }} />
              )}
              {photos[1] && (
                <Polaroid photo={photos[1]} rotate={-4} fixing="pushpin" width="clamp(180px, 62%, 230px)" style={{ position: 'relative', zIndex: 20, marginTop: '-28px', marginLeft: '8px' }} />
              )}

              {story.stamp && (
                <PassportStamp
                  stamp={story.stamp}
                  tone={visited ? 'red' : 'gold'}
                  rotate={-15}
                  size={118}
                  className="absolute -bottom-2 left-0 z-30 sm:left-4"
                />
              )}

              {story.margin && (
                <p className="absolute -bottom-6 right-0 max-w-[160px] font-hand text-[22px] leading-tight text-ink-faint" style={{ transform: 'rotate(5deg)' }}>
                  {story.margin}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

function Stat({ label, value, live }: { label: string; value: string; live?: boolean }) {
  return (
    <div className="leading-tight">
      <div className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em]" style={{ color: 'rgba(126,147,166,1)' }}>
        {label}
      </div>
      <div className="font-display text-[20px] uppercase" style={{ color: live ? 'var(--volt)' : '#eaf1ec', textShadow: live ? '0 0 10px rgba(205,255,61,0.4)' : undefined }}>
        {value}
      </div>
    </div>
  )
}
