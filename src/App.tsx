import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BoardingPassNav } from './components/BoardingPassNav'
import { Hero } from './components/Hero'
import { Scoreboard } from './components/Scoreboard'
import { GlobeZone } from './components/GlobeZone'
import { Scrapbook } from './components/Scrapbook'
import { Footer } from './components/Footer'
import { CountryPanel } from './components/CountryPanel'
import { FeaturedNav } from './components/FeaturedNav'
import { VISITED_ISO3 } from './data/stories'
import type { SelectedCountry } from './types/country'

/**
 * The finished portfolio: a scrollable kraft-paper scrapbook that wraps around
 * the navy globe (the calm center). Boarding-pass nav → stadium-banner hero +
 * ticket rip-off → LED scoreboard → the interactive globe → scrapbook collage →
 * sign-off. Clicking a country opens the scrapbook journal entry.
 */
function App() {
  const [selected, setSelected] = useState<SelectedCountry | null>(null)
  const close = useCallback(() => setSelected(null), [])
  const visitedCount = VISITED_ISO3.size

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans text-ink">
      <BoardingPassNav />

      {/* Keyboard / screen-reader path into every story (the canvas is pointer-only). */}
      <FeaturedNav onSelect={setSelected} />

      <Hero />

      <section id="scoreboard" className="mx-auto w-full max-w-[1180px] px-6 pb-2 sm:px-10">
        <Scoreboard />
      </section>

      <GlobeZone selected={selected} onSelect={setSelected} visitedCount={visitedCount} />

      <Scrapbook visitedCount={visitedCount} />

      <Footer />

      <AnimatePresence>
        {selected && <CountryPanel key={selected.key} country={selected} onClose={close} />}
      </AnimatePresence>
    </div>
  )
}

export default App
