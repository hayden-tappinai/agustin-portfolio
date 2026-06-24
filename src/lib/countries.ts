import type { CountryFeature, SelectedCountry } from '../types/country'

/** Natural Earth uses "-99" for territories without a clean ISO code. */
const ISO_PLACEHOLDER = '-99'

/**
 * The example GeoJSON lacks `ISO_A2_EH`, so a handful of countries carry
 * `ISO_A2 = "-99"`. Override the common ones so flag emojis still resolve.
 * (Kosovo, N. Cyprus and Somaliland have no standard emoji flag, so they're
 * intentionally left to fall back to no flag.)
 */
const ISO2_OVERRIDES: Record<string, string> = {
  France: 'FR',
  Norway: 'NO',
}

/**
 * Natural Earth 110m codes a few sovereign states `ISO_A3 = "-99"` (France is
 * the one that matters for us). Override by name so France still highlights as
 * visited and resolves to its FRA story.
 */
const ISO3_OVERRIDES: Record<string, string> = {
  France: 'FRA',
  Norway: 'NOR',
}

/** Human-readable country name, with graceful fallbacks. */
export function countryName(feature: CountryFeature): string {
  const p = feature.properties
  return p.ADMIN ?? p.NAME ?? p.SOVEREIGNT ?? 'Unknown'
}

function cleanIso(value: string | undefined): string | null {
  if (!value || value === ISO_PLACEHOLDER) return null
  return value
}

/** ISO alpha-2 for the feature, applying overrides for the "-99" cases. */
export function countryIso2(feature: CountryFeature): string | null {
  const direct = cleanIso(feature.properties.ISO_A2)
  if (direct) return direct
  return ISO2_OVERRIDES[countryName(feature)] ?? null
}

/** ISO alpha-3 for the feature, applying overrides for the "-99" cases. */
export function countryIso3(feature: CountryFeature): string | null {
  const direct = cleanIso(feature.properties.ISO_A3)
  if (direct) return direct
  return ISO3_OVERRIDES[countryName(feature)] ?? null
}

/** Stable identity key: ISO alpha-3 when valid, else a slug of the name. */
export function countryKey(feature: CountryFeature): string {
  const iso3 = countryIso3(feature)
  if (iso3) return iso3
  return countryName(feature)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Convert an ISO alpha-2 code to its flag emoji via regional-indicator chars.
 * Returns an empty string when no clean alpha-2 is available.
 */
export function flagEmoji(iso2: string | null): string {
  if (!iso2 || iso2.length !== 2) return ''
  const base = 0x1f1e6 // regional indicator 'A'
  const a = iso2.toUpperCase().charCodeAt(0) - 65
  const b = iso2.toUpperCase().charCodeAt(1) - 65
  if (a < 0 || a > 25 || b < 0 || b > 25) return ''
  return String.fromCodePoint(base + a) + String.fromCodePoint(base + b)
}

/**
 * Normalize a clicked feature into the UI-facing `SelectedCountry`.
 * `lat`/`lng` come from the globe click coordinates so the camera can fly there.
 */
export function toSelectedCountry(
  feature: CountryFeature,
  coords: { lat: number; lng: number },
): SelectedCountry {
  return {
    key: countryKey(feature),
    name: countryName(feature),
    iso2: countryIso2(feature),
    iso3: countryIso3(feature),
    lat: coords.lat,
    lng: coords.lng,
  }
}
