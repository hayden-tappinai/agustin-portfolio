import { FlagBunting } from './FlagBunting'

function BallMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#f2e8cf" stroke="#1c1712" strokeWidth="2" />
      <path d="M32 16 L41 23 L37 34 L27 34 L23 23 Z" fill="#1c1712" />
      <path d="M32 16 L23 23 L13 19 M32 16 L41 23 L51 19 M37 34 L44 44 M27 34 L20 44 M23 23 L14 31 M41 23 L50 31" stroke="#1c1712" strokeWidth="1.6" fill="none" />
    </svg>
  )
}

/**
 * Footer (SPEC §0) — the sign-off, on kraft. Bookends the header bunting, a
 * stadium-banner closer, ghost links with the single volt underline, and the
 * coordinates that opened the page.
 */
export function Footer() {
  return (
    <footer id="footer" className="relative mt-8">
      <FlagBunting className="mb-2" />
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-14 pt-6 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-8 border-t-2 border-ink pt-8 lg:flex-row lg:items-end">
          <div>
            <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
              <span className="h-[8px] w-[8px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
              40.4168° N, 3.7038° W · Full time
            </p>
            <h2 className="mt-3 font-display text-[clamp(40px,8vw,96px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
              The Trip's
              <br />
              Not Over
            </h2>
            <p className="mt-4 font-hand text-[26px] text-pitch" style={{ transform: 'rotate(-2deg)' }}>
              next stamp's already booked ✈
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <div className="flex items-center gap-3">
              <BallMark />
              <span className="font-display text-[28px] uppercase tracking-[0.02em] text-ink">Agustín · 10</span>
            </div>
            <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-[15px] font-semibold text-ink-2">
              <a href="#top" className="transition-colors hover:text-ink" style={{ textDecoration: 'underline', textDecorationColor: 'var(--volt-deep)', textUnderlineOffset: '4px', textDecorationThickness: '2px' }}>
                Say hello
              </a>
              <a href="#globe" className="transition-colors hover:text-ink">The globe</a>
              <a href="#scrapbook" className="transition-colors hover:text-ink">The stamps</a>
            </nav>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              Made in 2026 · Plus a globe, five fonts &amp; one lime spark
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
