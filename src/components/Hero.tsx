import { FlagBunting } from './FlagBunting'
import { PassportStamp } from './PassportStamp'
import { TicketStub } from './TicketStub'

function scrollToGlobe() {
  document.getElementById('globe')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

/**
 * The masthead (SPEC §0, brand card). Stadium-banner Anton "AGUSTÍN" with the
 * single volt swipe under the Í and a jersey number; an eyebrow coordinate, a
 * handwritten tagline, the ticket rip-off showcase, and a floating passport
 * stamp. Anton breathes — positive tracking, line-height 0.98 floor.
 */
export function Hero() {
  return (
    <header id="top" className="relative mx-auto w-full max-w-[1180px] px-6 pb-10 pt-8 sm:px-10">
      <FlagBunting className="mb-7" />

      <div className="relative">
        {/* floating passport stamp */}
        <PassportStamp
          stamp={{ entry: 'ENTRY · MADRID', city: 'MADRID', date: '06 MAY 2026' }}
          rotate={-13}
          size={118}
          className="absolute right-0 top-2 hidden sm:grid"
        />

        {/* eyebrow */}
        <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
          <span className="h-[8px] w-[8px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
          40.4168° N, 3.7038° W · Madrid · Est. 2003
        </p>

        {/* wordmark */}
        <h1
          className="mt-3 font-display uppercase text-ink"
          style={{ fontSize: 'clamp(72px,13vw,184px)', lineHeight: 0.98, letterSpacing: '0.015em' }}
        >
          AGUST
          <span className="relative inline-block">
            <span
              aria-hidden
              className="absolute"
              style={{ left: '-2px', right: '-4px', bottom: '8%', height: '34%', background: 'var(--volt)', transform: 'skewX(-9deg) rotate(-1.2deg)', borderRadius: '2px', opacity: 0.92, zIndex: -1, boxShadow: '0 1px 0 rgba(166,212,0,0.4)' }}
            />
            Í
          </span>
          N
          <span
            className="font-mono font-bold text-pitch"
            style={{ fontSize: 'clamp(22px,3vw,40px)', verticalAlign: 'super', marginLeft: '10px', position: 'relative', top: '-0.2em' }}
          >
            10
          </span>
        </h1>

        {/* coords / tags */}
        <div className="mt-4 flex flex-wrap items-center gap-[14px] font-mono text-[14px] font-bold tracking-[0.1em] text-ink-2">
          <span className="rounded-[3px] bg-paper-2 px-[11px] py-[5px] text-[11.5px] uppercase" style={{ border: '1px solid var(--paper-edge)' }}>
            23 Countries
          </span>
          <span className="rounded-[3px] bg-paper-2 px-[11px] py-[5px] text-[11.5px] uppercase" style={{ border: '1px solid var(--paper-edge)' }}>
            47 Matches
          </span>
          <span className="rounded-[3px] bg-paper-2 px-[11px] py-[5px] text-[11.5px] uppercase" style={{ border: '1px solid var(--paper-edge)' }}>
            6 Continents
          </span>
        </div>

        {/* tagline */}
        <p className="mt-[18px] font-hand text-[clamp(30px,4vw,46px)] font-bold text-pitch" style={{ transform: 'rotate(-2deg)' }}>
          a life mapped in stadiums &amp; stamps
        </p>

        {/* lockup: ticket + position */}
        <div className="mt-7 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="relative">
            <TicketStub
              title="Boarding Pass"
              glyph="✈"
              fields={[
                { k: 'From', v: 'MADRID' },
                { k: 'To', v: 'THE WORLD', tone: 'gold' },
                { k: 'Seat', v: '10A' },
              ]}
              stubAdmit="Admit One"
              stubBig="Tear"
              stubSub="to explore"
              variant="pitch"
              onTorn={scrollToGlobe}
              resetAfter={1100}
            />
            <span className="mt-3 block font-hand text-[22px] text-ink-faint" style={{ transform: 'rotate(-2deg)' }}>
              ↑ go on, tear it — it spins the globe
            </span>
          </div>

          <p className="max-w-[560px] font-sans text-[18px] leading-[1.55] text-ink-2">
            Twenty-three countries, forty-seven matches, one passport gone soft at the corners. I chase
            football to the ends of the map and write down what I find. <b className="font-extrabold text-ink">This is the globe</b> —
            spin it, and click anywhere I've left a stamp.
          </p>
        </div>
      </div>
    </header>
  )
}
