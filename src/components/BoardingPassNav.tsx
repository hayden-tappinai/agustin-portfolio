import { useCallback } from 'react'
import { scrollToTarget, scrollToTop } from '../lib/smoothScroll'

interface NavItem {
  label: string
  seg: string
  target: string
  active?: boolean
}

const NAV: NavItem[] = [
  { label: 'Globe', seg: 'A1', target: 'globe', active: true },
  { label: 'Season', seg: 'B2', target: 'scoreboard' },
  { label: 'Stamps', seg: 'C3', target: 'scrapbook' },
  { label: 'Sign-off', seg: 'D4', target: 'footer' },
]

function scrollToId(id: string) {
  if (id === 'top') scrollToTop()
  else scrollToTarget(id)
}

/** Roundel — a little globe mark in the carrier slot. */
function Roundel() {
  return (
    <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="18.5" stroke="#1c1712" strokeWidth="1.6" fill="none" />
      <circle cx="20" cy="20" r="18.5" fill="#14598c" opacity="0.12" />
      <ellipse cx="20" cy="20" rx="8.5" ry="18.5" stroke="#14598c" strokeWidth="1" fill="none" />
      <line x1="2" y1="20" x2="38" y2="20" stroke="#14598c" strokeWidth="1" />
      <path d="M11 14 q4 3 2 7 q5 1 7 5 q4-2 6 1" stroke="#3ea96b" strokeWidth="2.2" fill="none" />
      <circle cx="27" cy="13" r="2.4" fill="#c0362c" />
    </svg>
  )
}

/**
 * Boarding-pass nav (SPEC §5). A horizontal pass — wordmark, FROM/TO/GATE/SEAT
 * fields, nav links as boxed fields, then a perforated stub with a route line,
 * barcode and a mini ink stamp. The one volt note is the active "Globe" link's
 * highlighter swipe + pulsing dot. No hover-lift (the globe owns that).
 */
export function BoardingPassNav() {
  const go = useCallback((target: string) => () => scrollToId(target), [])

  return (
    <div className="relative z-40 mx-auto w-full max-w-[1180px] px-3 pt-3 sm:px-6">
      <nav
        aria-label="Primary"
        className="grid grid-cols-1 overflow-hidden rounded-[14px] bg-[#fbf7ec] sm:grid-cols-[minmax(0,1fr)_34px_minmax(0,250px)]"
        style={{ boxShadow: '0 18px 40px rgba(58,42,18,0.18), 0 2px 0 #cdb789' }}
      >
        {/* MAIN */}
        <div className="flex flex-col gap-[14px] p-[18px] sm:p-[22px]">
          <div className="flex items-center justify-between gap-3 border-b-2 border-ink pb-[14px]">
            <button type="button" onClick={go('top')} className="flex items-center gap-3 text-left">
              <Roundel />
              <span className="leading-none">
                <span className="block font-display text-[clamp(26px,4vw,40px)] uppercase tracking-[0.02em] text-ink">Agustin</span>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-stamp-red">Footy &amp; Far-Flung Places</span>
              </span>
            </button>
            <div className="hidden text-right sm:block">
              <span className="font-display text-[26px] uppercase text-ink">
                Open <em className="not-italic text-pitch">World</em>
              </span>
            </div>
          </div>

          {/* compact boarding-pass identity on mobile (the stub is desktop-only) */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-ink">
                MAD <span className="text-stamp-red">→</span> WORLD
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">GATE B10 · 10A</span>
            </div>
            <div className="barcode-ink mt-2 h-[20px] w-full opacity-80" style={{ borderRadius: '1px' }} />
          </div>

          {/* fields */}
          <div className="hidden grid-cols-3 gap-y-2 sm:grid md:grid-cols-6">
            <Field k="Passenger" v="A. RÍOS" />
            <Field k="From" v="HOME" />
            <Field k="To" v="THE WORLD" tone="red" />
            <Field k="Flight" v="AG-2026" />
            <Field k="Gate" v="B-10" />
            <Field k="Seat" v="10A" tone="pitch" last />
          </div>

          {/* nav links */}
          <div className="flex flex-wrap items-end gap-2 border-t border-dashed border-paper-edge pt-4">
            {NAV.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={go(item.target)}
                className="relative rounded-[7px] px-[14px] pb-[9px] pt-[8px] transition-colors"
                style={{
                  border: item.active ? '1.5px solid var(--ink)' : '1.5px solid var(--paper-edge)',
                  background: item.active
                    ? 'linear-gradient(var(--volt), var(--volt)) left bottom / 100% 9px no-repeat, rgba(255,255,255,0.4)'
                    : 'rgba(255,255,255,0.4)',
                }}
              >
                {item.active && <span className="absolute -right-[5px] -top-[5px] h-[11px] w-[11px] rounded-full border-2 border-ink bg-volt" style={{ animation: 'volt-pulse 2.6s var(--ease-paper) infinite' }} />}
                <span className="block font-mono text-[clamp(13px,2.4vw,16px)] font-bold uppercase tracking-[0.04em] text-ink">{item.label}</span>
                <span className="block font-mono text-[8px] uppercase tracking-[0.12em] text-ink-faint">{item.seg}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SEAM */}
        <div className="relative hidden sm:block" aria-hidden>
          <span className="absolute bottom-[14px] top-[14px] left-1/2 -translate-x-1/2 border-l-2 border-dashed border-ink-faint opacity-70" />
          <span className="absolute -top-[11px] left-1/2 h-[22px] w-[22px] -translate-x-1/2 rounded-full bg-paper" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)' }} />
          <span className="absolute -bottom-[11px] left-1/2 h-[22px] w-[22px] -translate-x-1/2 rounded-full bg-paper" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)' }} />
        </div>

        {/* STUB */}
        <div className="hidden flex-col justify-between p-[20px] sm:flex">
          <div className="flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-ink-faint">
            <span>MAD</span>
            <span>BOARDING</span>
          </div>
          <svg viewBox="0 0 210 34" className="my-2 w-full" aria-hidden>
            <path d="M6 26 Q 105 -6 196 16" stroke="#c0362c" strokeWidth="2.2" strokeDasharray="1 8" fill="none" strokeLinecap="round" />
            <circle cx="6" cy="26" r="3.4" fill="#c0362c" />
            <text x="183" y="14" fontSize="12" fill="#14598c">✈</text>
          </svg>
          <div className="barcode-ink h-[40px] w-full opacity-85" style={{ borderRadius: '1px' }} />
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">AG · 2026</span>
            <span className="grid h-[52px] w-[52px] place-items-center rounded-full text-center font-mono text-[10px] font-bold uppercase leading-none text-stamp-red" style={{ border: '1.6px solid #c0362c', transform: 'rotate(-12deg)', opacity: 0.85, mixBlendMode: 'multiply' }}>
              <span>
                <span className="block text-[13px] leading-none">✦</span>
                MAD
              </span>
            </span>
          </div>
        </div>
      </nav>
    </div>
  )
}

function Field({ k, v, tone, last }: { k: string; v: string; tone?: 'red' | 'pitch'; last?: boolean }) {
  return (
    <div className="pr-[14px]" style={{ borderRight: last ? 'none' : '1px solid var(--paper-edge)' }}>
      <div className="font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-ink-faint">{k}</div>
      <div
        className="whitespace-nowrap font-mono text-[15px] font-bold"
        style={{ color: tone === 'red' ? 'var(--stamp-red)' : tone === 'pitch' ? 'var(--pitch)' : 'var(--ink)' }}
      >
        {v}
      </div>
    </div>
  )
}
