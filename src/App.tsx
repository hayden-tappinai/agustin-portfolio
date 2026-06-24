import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BoardingPassNav } from './components/BoardingPassNav'
import { GlobeStage } from './components/GlobeStage'
import { About } from './components/About'
import { Scoreboard } from './components/Scoreboard'
import { Scrapbook } from './components/Scrapbook'
import { Footer } from './components/Footer'
import { CountryPanel } from './components/CountryPanel'
import { FeaturedNav } from './components/FeaturedNav'
import { Reveal } from './components/Reveal'
import { PerforatedDivider } from './components/PerforatedDivider'
import { SoccerField } from './components/SoccerField'
import { WorldCupBalls } from './components/WorldCupBalls'
import { LogoWall } from './components/LogoWall'
import { useLenis } from './hooks/useLenis'
import { VISITED_ISO3 } from './data/stories'
import type { SelectedCountry } from './types/country'

/**
 * One continuous kraft-paper scroll. A boarding-pass ticket header, then the
 * globe IS the hero — full-bleed on the page, no box. The story unspools beneath
 * it: a taped scoreboard, the scrapbook collage, a sign-off — each woven in with
 * a scroll reveal and threaded together by ticket tear-lines. Clicking a country
 * opens the scrapbook journal entry.
 */
function App() {
  const [selected, setSelected] = useState<SelectedCountry | null>(null)
  const close = useCallback(() => setSelected(null), [])
  const visitedCount = VISITED_ISO3.size
  useLenis()

  return (
    <div className="min-h-screen w-full overflow-x-clip font-sans text-ink">
      <BoardingPassNav />

      {/* Keyboard / screen-reader path into every story (the canvas is pointer-only). */}
      <FeaturedNav onSelect={setSelected} />

      <GlobeStage selected={selected} onSelect={setSelected} />

      <PerforatedDivider />

      {/* the story — his full bio, readable */}
      <About />

      <PerforatedDivider />

      {/* taped-down scoreboard — placed, not boxed */}
      <section id="scoreboard" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <Reveal>
          <div className="relative" style={{ transform: 'rotate(-0.6deg)' }}>
            <span className="washi tape-red" style={{ top: '-15px', left: '7%', transform: 'rotate(4deg)', zIndex: 20 }} />
            <Scoreboard />
          </div>
        </Reveal>
      </section>

      <Scrapbook visitedCount={visitedCount} onSelect={setSelected} />

      {/* ── collectibles: the pitch, the match balls, the scrambled crest wall ── */}
      <PerforatedDivider />
      <SoccerField />
      <PerforatedDivider />
      <WorldCupBalls />
      <PerforatedDivider />
      <LogoWall />

      <PerforatedDivider className="mb-2" />

      <Footer />

      <AnimatePresence>
        {selected && <CountryPanel key={selected.key} country={selected} onClose={close} />}
      </AnimatePresence>
    </div>
  )
}

export default App
