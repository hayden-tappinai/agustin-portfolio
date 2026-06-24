import { useEffect, useRef } from 'react'
import type { SelectedCountry } from '../types/country'
import { getStory } from '../data/stories'
import { flagEmoji } from '../lib/countries'

interface CountryPanelProps {
  /** The selected country, or null when the panel is closed. */
  country: SelectedCountry | null
  /** Close handler (backdrop click, close button, or Escape). */
  onClose: () => void
}

/**
 * Side panel that slides in when a country is clicked. V1 shows placeholder
 * photos + a short story; real content from the Footy Drive arrives later.
 *
 * The panel stays mounted and animates via transform/opacity. We retain the
 * last country during the close animation so the text doesn't blank out mid-slide.
 */
export function CountryPanel({ country, onClose }: CountryPanelProps) {
  const open = country !== null

  // Keep showing the last country while the panel slides away. A ref (not state)
  // is the right tool: it isn't reactive, only ever advances to the latest
  // non-null selection, and updating it during render is safe here.
  const lastCountry = useRef<SelectedCountry | null>(country)
  if (country) lastCountry.current = country
  const display = country ?? lastCountry.current

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Focus management: move focus into the panel on open, restore it on close so
  // keyboard/screen-reader users aren't stranded. The panel is `inert` when
  // closed (below), which keeps its controls out of the tab order too.
  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null
      closeButtonRef.current?.focus()
    } else if (restoreFocusRef.current?.isConnected) {
      restoreFocusRef.current.focus()
      restoreFocusRef.current = null
    }
  }, [open])

  const story = display ? getStory(display) : null
  const flag = display ? flagEmoji(display.iso2) : ''

  return (
    <>
      {/* Backdrop — subtle, click to dismiss. */}
      <div
        aria-hidden
        onClick={onClose}
        className={[
          'fixed inset-0 z-20 bg-navy/40 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={display ? `${display.name} — photos and story` : 'Country details'}
        aria-hidden={!open}
        inert={!open}
        className={[
          'fixed right-0 top-0 z-30 flex h-full w-[min(420px,90vw)] flex-col',
          'border-l border-stroke/70 bg-surface/95 backdrop-blur-md',
          'shadow-[0_0_60px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-spring',
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full',
        ].join(' ')}
      >
        <header className="flex items-start justify-between gap-4 px-7 pt-7">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              A place Agustin's been
            </p>
            <h2 className="mt-2 flex items-center gap-3 text-2xl font-semibold text-ink">
              {flag && (
                <span aria-hidden className="text-3xl leading-none">
                  {flag}
                </span>
              )}
              <span className="truncate">{display?.name}</span>
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="-mr-2 -mt-1 shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-white/5 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-land-hover"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-7 pb-7 pt-6">
          {/* Placeholder photo tiles — real images drop in later. */}
          <div className="grid grid-cols-2 gap-3">
            {story?.photoCaptions.map((caption, i) => (
              <figure
                key={caption}
                className={[
                  'group relative overflow-hidden rounded-xl border border-stroke/60',
                  'aspect-[4/3] bg-gradient-to-br from-ocean/40 to-land/30',
                  i === 0 ? 'col-span-2 aspect-[16/9]' : '',
                ].join(' ')}
              >
                <span className="absolute inset-0 flex items-center justify-center text-ink/30">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M21 16l-5-4-4 3-2-1.5L3 18"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent px-3 pb-2 pt-6 text-xs text-ink/90">
                  {caption}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Story */}
          {story && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-land-hover">{story.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{story.body}</p>
            </div>
          )}
        </div>

        <footer className="border-t border-stroke/50 px-7 py-4">
          <p className="text-xs text-muted/80">
            Placeholder content — real photos &amp; stories from Agustin's travels coming soon.
          </p>
        </footer>
      </aside>
    </>
  )
}
