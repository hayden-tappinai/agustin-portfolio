import type { SelectedCountry } from '../types/country'

/**
 * The 17 countries Agustin has been to (the keys of `data/stories.ts`), in a
 * sensible order. Exposed as a keyboard/screen-reader path to open each panel —
 * the globe canvas is pointer-only — and as the source for the flag page. The
 * `iso2` drives the flag; `lat`/`lng` are centroids the camera flies to. Keep
 * ISO codes in sync with the keys in `stories.ts`.
 */
export const FEATURED_COUNTRIES: readonly SelectedCountry[] = [
  { key: 'ESP', name: 'Spain', iso2: 'ES', iso3: 'ESP', lat: 40.42, lng: -3.7 },
  { key: 'ARG', name: 'Argentina', iso2: 'AR', iso3: 'ARG', lat: -34.61, lng: -58.38 },
  { key: 'ITA', name: 'Italy', iso2: 'IT', iso3: 'ITA', lat: 41.9, lng: 12.5 },
  { key: 'FRA', name: 'France', iso2: 'FR', iso3: 'FRA', lat: 46.6, lng: 2.3 },
  { key: 'USA', name: 'United States', iso2: 'US', iso3: 'USA', lat: 39.0, lng: -98.0 },
  { key: 'ISL', name: 'Iceland', iso2: 'IS', iso3: 'ISL', lat: 64.96, lng: -19.02 },
  { key: 'AUT', name: 'Austria', iso2: 'AT', iso3: 'AUT', lat: 47.52, lng: 14.55 },
  { key: 'BHS', name: 'Bahamas', iso2: 'BS', iso3: 'BHS', lat: 25.03, lng: -77.4 },
  { key: 'DNK', name: 'Denmark', iso2: 'DK', iso3: 'DNK', lat: 56.0, lng: 10.0 },
  { key: 'DOM', name: 'Dominican Republic', iso2: 'DO', iso3: 'DOM', lat: 18.74, lng: -70.16 },
  { key: 'GRC', name: 'Greece', iso2: 'GR', iso3: 'GRC', lat: 39.07, lng: 22.0 },
  { key: 'HUN', name: 'Hungary', iso2: 'HU', iso3: 'HUN', lat: 47.16, lng: 19.5 },
  { key: 'PAN', name: 'Panama', iso2: 'PA', iso3: 'PAN', lat: 8.54, lng: -80.78 },
  { key: 'PER', name: 'Peru', iso2: 'PE', iso3: 'PER', lat: -9.19, lng: -75.02 },
  { key: 'SWE', name: 'Sweden', iso2: 'SE', iso3: 'SWE', lat: 60.13, lng: 18.64 },
  { key: 'CHE', name: 'Switzerland', iso2: 'CH', iso3: 'CHE', lat: 46.82, lng: 8.23 },
  { key: 'VAT', name: 'Vatican City', iso2: 'VA', iso3: 'VAT', lat: 41.9, lng: 12.45 },
]

/** The handful of marquee destinations surfaced as boarding-pass nav links. */
export const NAV_DESTINATIONS: readonly SelectedCountry[] = FEATURED_COUNTRIES.slice(0, 4)
