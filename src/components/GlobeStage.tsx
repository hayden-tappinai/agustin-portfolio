import { motion } from 'framer-motion'
import type { SelectedCountry } from '../types/country'
import { GlobeHero } from './GlobeHero'
import { TicketStub } from './TicketStub'

const SPRING = { type: 'spring', stiffness: 300, damping: 25 } as const

function scrollToContent() {
  document.getElementById('scoreboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

interface GlobeStageProps {
  selected: SelectedCountry | null
  onSelect: (country: SelectedCountry) => void
}

/**
 * The hero: the interactive globe is the whole stage, rendered directly on the
 * kraft page (no navy box). A quiet lockup sits off to the left — coordinates,
 * the name, a handwritten line, and the boarding-pass ticket you tear to descend
 * into the story. Everything else is the globe.
 */
export function GlobeStage({ selected, onSelect }: GlobeStageProps) {
  return (
    <section id="globe" className="relative w-full" style={{ minHeight: 'min(94svh, 920px)' }}>
      {/* the globe, full-bleed on kraft */}
      <div className="absolute inset-0">
        <GlobeHero selected={selected} onSelect={onSelect} />
      </div>

      {/* quiet lockup, off to one side */}
      <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1180px] items-start px-6 pt-10 sm:items-center sm:px-10 sm:pt-0">
        <motion.div
          className="max-w-[26rem]"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SPRING, delay: 0.2 }}
        >
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[7px] w-[7px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
            40.4168° N, 3.7038° W
          </p>

          <h1 className="mt-3 font-display uppercase leading-[1.04] tracking-[0.02em] text-ink" style={{ fontSize: 'clamp(40px,6vw,72px)' }}>
            Agustin
          </h1>

          <p className="mt-1 font-hand text-[clamp(24px,3.2vw,34px)] leading-tight text-pitch" style={{ transform: 'rotate(-2deg)' }}>
            footy &amp; far-flung places
          </p>

          <p className="mt-5 max-w-[22rem] font-sans text-[15px] leading-[1.6] text-ink-2">
            Spin the world, lift a country, and click anywhere I've left a stamp.
          </p>

          {/* the boarding pass — tear it to descend into the story */}
          <div className="pointer-events-auto mt-6">
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
              stubSub="to begin"
              variant="pitch"
              width="min(380px, 84vw)"
              onTorn={scrollToContent}
              resetAfter={1100}
            />
            <span className="mt-3 block font-hand text-[20px] text-ink-faint" style={{ transform: 'rotate(-1.5deg)' }}>
              ↑ tear it — or just start scrolling
            </span>
          </div>
        </motion.div>
      </div>

      {/* quiet scroll cue */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll ↓
      </motion.span>
    </section>
  )
}
