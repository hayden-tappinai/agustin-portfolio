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

/** Which vector scene a Polaroid draws when there's no real photo yet. */
export type PhotoScene = 'stadium' | 'skyline' | 'pitch' | 'coast' | 'street'

/**
 * One Polaroid in a country story. When `file` is present (populated from
 * `photo-map.json`) it renders as a real `<img>` from `public/photos/`;
 * otherwise the tasteful vector `scene` is drawn — never a broken image.
 */
export interface StoryPhoto {
  /** File under `public/photos/`, e.g. "esp-1.webp". Optional until ingested. */
  file?: string
  /** Handwritten caption shown in the Polaroid's bottom lip. */
  caption: string
  /** Mono date stamp in the Polaroid corner, e.g. "07.MAY.2026". */
  date?: string
  /** Vector scene to draw as the placeholder photo. */
  scene?: PhotoScene
}

/** A passport stamp's printed meta. */
export interface StoryStamp {
  /** Big Anton word — "ENTRY", "ADMITTED", a city. */
  city: string
  /** Mono date line, e.g. "15 JUN 2026". */
  date: string
  /** Small label above, e.g. "ENTRY · MADRID". */
  entry?: string
}

/**
 * The content behind a country's scrapbook journal entry. Keyed by ISO alpha-3.
 * Hand-written for Agustin's footy/travel destinations; everything else falls
 * back to a deterministic placeholder so any clicked country still tells a story.
 */
export interface CountryStory {
  /** Short evocative title for the visit (also the route-line context). */
  title: string
  /** The handwritten (Caveat) journal narrative. */
  body: string
  /** Display coordinates string, e.g. "40.4168° N, 3.7038° W". */
  coords: string
  /** Arriving-flight origin city for the route line, e.g. "LISBON". */
  routeFrom?: string
  /** Polaroids — real photos when available, vector scenes otherwise. */
  photos: StoryPhoto[]
  /** Passport stamp meta. */
  stamp?: StoryStamp
  /** A short handwritten margin note (Caveat). */
  margin?: string
}
