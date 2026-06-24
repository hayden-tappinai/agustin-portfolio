import type { Feature, Geometry } from 'geojson'

/**
 * The subset of Natural Earth 110m admin-0 properties we actually read.
 * The source file carries ~80 keys per feature; we only need a name and codes.
 */
export interface CountryProperties {
  /** Administrative name, e.g. "Spain". Our primary display name. */
  ADMIN?: string
  /** Short name, e.g. "Spain". Fallback when ADMIN is missing. */
  NAME?: string
  /** Sovereign state name. Final fallback. */
  SOVEREIGNT?: string
  /** ISO 3166-1 alpha-2, e.g. "ES". May be "-99" for disputed territories. */
  ISO_A2?: string
  /** ISO 3166-1 alpha-3, e.g. "ESP". May be "-99" for disputed territories. */
  ISO_A3?: string
}

/** A single country polygon from the GeoJSON FeatureCollection. */
export type CountryFeature = Feature<Geometry, CountryProperties>

/** A country the user has selected (clicked), normalized for the UI. */
export interface SelectedCountry {
  /** Stable key (ISO_A3 when valid, else a slug of the name). */
  key: string
  /** Human-readable country name. */
  name: string
  /** ISO alpha-2 code, or null when the source has "-99". */
  iso2: string | null
  /** ISO alpha-3 code, or null when the source has "-99". */
  iso3: string | null
  /** Latitude the camera should fly to (click point). */
  lat: number
  /** Longitude the camera should fly to (click point). */
  lng: number
}

/** Placeholder story content shown in the country panel (real content comes later). */
export interface CountryStory {
  /** Short evocative title for the visit. */
  title: string
  /** A paragraph of placeholder narrative. */
  body: string
  /** Placeholder photo captions (images arrive from the Footy Drive folder later). */
  photoCaptions: string[]
}
