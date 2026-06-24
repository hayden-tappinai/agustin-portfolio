import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SelectedCountry, Stadium } from '../types/country'
import { getStory, isVisited } from '../data/stories'
import { flagEmoji } from '../lib/countries'
import { Polaroid } from './Polaroid'
import { TicketStub } from './TicketStub'
import { StadiumCard, StadiumLightbox } from './StadiumCard'

const SPRING = { type: 'spring', stiffness: 300, damping: 25 } as const

interface CountryPanelProps {
  /** The selected country (always non-null while mounted; AnimatePresence in
   *  App keeps it mounted through the exit animation). */
  country: SelectedCountry
  onClose: () => void
}

/**
 * THE scrapbook journal entry — the centerpiece. A torn, faintly-graticuled
 * journal page: the country name in Anton, coordinates + capital in Space Mono,
 * a handwritten Caveat story, the real country flag, clickable stadium photos,
 * a mono fact strip, and the ticket rip-off as the "return to globe" control.
 */
export function CountryPanel({ country, onClose }: CountryPanelProps) {
  const story = getStory(country)
  const visited = isVisited(country)
  const flag = flagEmoji(country.iso2)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const [openStadium, setOpenStadium] = useState<Stadium | null>(null)

  // Escape to close (the lightbox first, then the panel).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openStadium) setOpenStadium(null)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, openStadium])

  // Move focus into the panel on open, restore it on close.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => {
      if (restoreFocusRef.current?.isConnected) restoreFocusRef.current.focus()
    }
  }, [])

  const stadiums = (story.stadiums ?? []).slice(0, 3)
  const photos = story.photos.slice(0, 2)
  const facts = (story.facts ?? []).slice(0, 3)

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

          <div className="grid gap-8 pl-0 sm:pl-6 lg:grid-cols-[1.12fr_0.88fr]">
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
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">◌ Not yet</span>
                )}
              </div>

              <h2 className="mt-3 font-display uppercase text-ink" style={{ fontSize: 'clamp(44px,7vw,82px)', lineHeight: 1.04, letterSpacing: '0.015em' }}>
                {country.name}
              </h2>

              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] font-bold tracking-[0.08em] text-ocean">
                <span className="flex items-center gap-2">
                  <svg width="11" height="14" viewBox="0 0 11 14" aria-hidden className="shrink-0">
                    <path d="M5.5 0C2.46 0 0 2.46 0 5.5C0 9.6 5.5 14 5.5 14C5.5 14 11 9.6 11 5.5C11 2.46 8.54 0 5.5 0Z" fill="#c0362c" />
                    <circle cx="5.5" cy="5.3" r="2" fill="#e8d9b5" />
                  </svg>
                  {story.coords}
                </span>
                {story.capital && <span className="text-ink-faint">· {story.capital.toUpperCase()}</span>}
              </p>

              <p className="mt-5 font-hand text-[22px] font-bold leading-tight text-pitch" style={{ transform: 'rotate(-1deg)' }}>
                {story.title}
              </p>

              <p className="mt-2 max-w-[42ch] font-hand text-[clamp(22px,2.6vw,27px)] leading-[1.34] text-ink-2">
                {story.body}
              </p>

              {/* mono fact strip */}
              {facts.length > 0 && (
                <div className="mt-6 inline-flex flex-wrap items-center gap-x-6 gap-y-2 rounded-md px-[18px] py-[14px]" style={{ background: 'var(--navy)', boxShadow: '0 8px 20px rgba(10,20,34,0.3)' }}>
                  {facts.map((f, i) => (
                    <div key={f.label} className="flex items-center gap-6">
                      {i > 0 && <span className="h-7 w-px bg-white/12" />}
                      <Fact label={f.label} value={f.value} live={f.live} />
                    </div>
                  ))}
                </div>
              )}

              {/* return ticket — the rip-off close (tilted into the collage spine) */}
              <div className="mt-8" style={{ transform: 'rotate(-1.6deg)' }}>
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

            {/* RIGHT — the collage (stadiums when we have them, else scenes) */}
            <div className="relative min-h-[360px] pt-2">
              {/* coffee ring */}
              <span aria-hidden className="absolute right-2 top-0 hidden h-[56px] w-[56px] rounded-full sm:block" style={{ border: '3px solid rgba(120,82,38,0.18)', boxShadow: 'inset 0 0 0 2px rgba(120,82,38,0.07)' }} />

              {/* the country flag — the badge that replaces the passport stamp */}
              <div className="absolute -left-2 -top-2 z-30 grid place-items-center" style={{ transform: 'rotate(-9deg)' }}>
                <div className="rounded-md bg-[#fbf7ec] px-3 py-2 text-center" style={{ border: '1.5px solid var(--paper-edge)', boxShadow: '0 6px 14px var(--paper-shadow)' }}>
                  <div className="text-[30px] leading-none" aria-hidden>{flag || '🏳️'}</div>
                  <div className="mt-1 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-ink-faint">{visited ? 'Visited' : 'On the list'}</div>
                </div>
              </div>

              {stadiums.length > 0 ? (
                <div className="ml-auto flex w-[clamp(220px,86%,330px)] flex-col gap-4 pt-6">
                  {stadiums.map((s, i) => (
                    <StadiumCard key={s.slug} stadium={s} rotate={i % 2 === 0 ? 1.6 : -2.2} onOpen={() => setOpenStadium(s)} />
                  ))}
                </div>
              ) : (
                <div className="pt-6">
                  {photos[0] && (
                    <Polaroid photo={photos[0]} rotate={2.4} fixing="washi" tape="tape-ocean" width="clamp(220px,82%,300px)" className="ml-auto" style={{ position: 'relative', zIndex: 10 }} />
                  )}
                  {photos[1] && (
                    <Polaroid photo={photos[1]} rotate={-4} fixing="pushpin" width="clamp(170px,58%,220px)" style={{ position: 'relative', zIndex: 20, marginTop: '-16px', marginLeft: '6px' }} />
                  )}
                </div>
              )}

              {story.margin && (
                <p className="mt-5 max-w-[210px] font-hand text-[22px] leading-tight text-ink-faint" style={{ transform: 'rotate(3deg)' }}>
                  {story.margin}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.article>

      {/* stadium photo lightbox */}
      <AnimatePresence>
        {openStadium && <StadiumLightbox stadium={openStadium} onClose={() => setOpenStadium(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}

function Fact({ label, value, live }: { label: string; value: string; live?: boolean }) {
  return (
    <div className="leading-tight">
      <div className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em]" style={{ color: 'rgba(126,147,166,1)' }}>
        {label}
      </div>
      <div className="font-display text-[18px] uppercase" style={{ color: live ? 'var(--volt)' : '#eaf1ec', textShadow: live ? '0 0 10px rgba(205,255,61,0.4)' : undefined }}>
        {value}
      </div>
    </div>
  )
}
