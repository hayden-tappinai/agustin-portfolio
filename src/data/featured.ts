import type { SelectedCountry } from '../types/country'

/**
 * The countries with a hand-written story (see `data/stories.ts`), exposed as a
 * keyboard/screen-reader path to open the panel — the globe canvas itself is
 * pointer-only, so this is how non-pointer users reach the actual content (and
 * how the boarding-pass nav links resolve). `lat`/`lng` are rough centroids the
 * camera flies to. Keep ISO codes in sync with the keys in `stories.ts`.
 */
export const FEATURED_COUNTRIES: readonly SelectedCountry[] = [
  { key: 'ESP', name: 'Spain', iso2: 'ES', iso3: 'ESP', lat: 40.42, lng: -3.7 },
  { key: 'ARG', name: 'Argentina', iso2: 'AR', iso3: 'ARG', lat: -34.61, lng: -58.38 },
  { key: 'BRA', name: 'Brazil', iso2: 'BR', iso3: 'BRA', lat: -22.95, lng: -43.21 },
  { key: 'GBR', name: 'United Kingdom', iso2: 'GB', iso3: 'GBR', lat: 51.51, lng: -0.13 },
  { key: 'ITA', name: 'Italy', iso2: 'IT', iso3: 'ITA', lat: 45.46, lng: 9.19 },
  { key: 'FRA', name: 'France', iso2: 'FR', iso3: 'FRA', lat: 48.86, lng: 2.35 },
  { key: 'PRT', name: 'Portugal', iso2: 'PT', iso3: 'PRT', lat: 38.72, lng: -9.14 },
  { key: 'JPN', name: 'Japan', iso2: 'JP', iso3: 'JPN', lat: 35.68, lng: 139.65 },
  { key: 'DEU', name: 'Germany', iso2: 'DE', iso3: 'DEU', lat: 51.51, lng: 7.47 },
  { key: 'NLD', name: 'Netherlands', iso2: 'NL', iso3: 'NLD', lat: 52.37, lng: 4.9 },
  { key: 'USA', name: 'United States', iso2: 'US', iso3: 'USA', lat: 40.71, lng: -74.01 },
  { key: 'MEX', name: 'Mexico', iso2: 'MX', iso3: 'MEX', lat: 19.43, lng: -99.13 },
]

/** The handful of marquee destinations surfaced as boarding-pass nav links. */
export const NAV_DESTINATIONS: readonly SelectedCountry[] = FEATURED_COUNTRIES.slice(0, 4)
