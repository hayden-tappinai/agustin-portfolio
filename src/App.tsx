import { useCallback, useState } from 'react'
import { GlobeHero } from './components/GlobeHero'
import { CountryPanel } from './components/CountryPanel'
import { FeaturedNav } from './components/FeaturedNav'
import type { SelectedCountry } from './types/country'

function App() {
  const [selected, setSelected] = useState<SelectedCountry | null>(null)
  const closePanel = useCallback(() => setSelected(null), [])
  const panelOpen = selected !== null

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-navy font-sans text-ink">
      <GlobeHero selected={selected} onSelect={setSelected} />

      {/* Keyboard / screen-reader path into the stories (the canvas is pointer-only). */}
      <FeaturedNav onSelect={setSelected} />

      {/* Overlay chrome — above the globe, fades out when a panel is open so it
          never peeks out behind the panel on narrow screens. */}
      <div
        className={[
          'pointer-events-none relative z-10 flex h-full flex-col justify-between p-6 sm:p-10',
          'transition-opacity duration-300',
          panelOpen ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
        aria-hidden={panelOpen}
      >
        <header className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted">
            Footy &amp; far-flung places
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] sm:text-5xl">Agustín</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            A life mapped in stadiums and stamps. Spin the globe, find a country
            he's been to, and click in.
          </p>
        </header>

        <footer className="flex flex-wrap items-center gap-2 text-xs text-muted/80">
          <span className="inline-flex h-6 items-center rounded-full border border-stroke/70 px-3">
            Drag to spin
          </span>
          <span className="inline-flex h-6 items-center rounded-full border border-stroke/70 px-3">
            Hover to lift
          </span>
          <span className="inline-flex h-6 items-center rounded-full border border-stroke/70 px-3">
            Click for the story
          </span>
        </footer>
      </div>

      <CountryPanel country={selected} onClose={closePanel} />
    </main>
  )
}

export default App
