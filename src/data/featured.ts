import type { SelectedCountry } from '../types/country'

/**
 * Countries with a hand-written story (see `data/stories.ts`), exposed as a
 * keyboard/screen-reader path to open the panel — the globe canvas itself is
 * pointer-only, so this is how non-pointer users reach the actual content.
 * `lat`/`lng` are rough centroids the camera flies to. Keep ISO codes in sync
 * with the keys in `stories.ts`.
 */
export const FEATURED_COUNTRIES: readonly SelectedCountry[] = [
  { key: 'ESP', name: 'Spain', iso2: 'ES', iso3: 'ESP', lat: 40.4, lng: -3.7 },
  { key: 'ARG', name: 'Argentina', iso2: 'AR', iso3: 'ARG', lat: -34.6, lng: -58.4 },
  { key: 'BRA', name: 'Brazil', iso2: 'BR', iso3: 'BRA', lat: -14.2, lng: -51.9 },
  { key: 'GBR', name: 'United Kingdom', iso2: 'GB', iso3: 'GBR', lat: 51.5, lng: -0.1 },
  { key: 'ITA', name: 'Italy', iso2: 'IT', iso3: 'ITA', lat: 41.9, lng: 12.5 },
  { key: 'FRA', name: 'France', iso2: 'FR', iso3: 'FRA', lat: 46.6, lng: 2.3 },
]
