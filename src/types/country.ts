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

/** A passport stamp's printed meta (legacy; PassportStamp component only). */
export interface StoryStamp {
  city: string
  date: string
  entry?: string
}

/**
 * A football ground Agustin has visited (or a bucket-list one). Rendered as a
 * clickable image slot in the country panel — the real photo is read from
 * `public/agustin/stadiums/<slug>.jpg`, with a tasteful vector scene until it
 * lands. `visited: false` marks a bucket-list ground.
 */
export interface Stadium {
  /** Ground name, e.g. "Camp Nou". */
  name: string
  /** Home club, e.g. "Barcelona". */
  club?: string
  /** City, e.g. "Barcelona". */
  city: string
  /** Slug → `public/agustin/stadiums/<slug>.jpg` (fallback path). */
  slug: string
  /** Real photo filename in `public/agustin/photos/` when one maps here. */
  file?: string
  /** False = bucket-list (not yet visited). */
  visited: boolean
  /** Vector scene drawn as the placeholder until the photo lands. */
  scene?: PhotoScene
}

/** One cell in the country panel's mono stat strip. */
export interface StoryFact {
  label: string
  value: string
  /** The single volt-glowing figure. */
  live?: boolean
}

/**
 * The content behind a country's scrapbook journal entry. Keyed by ISO alpha-3.
 * Hand-written from Agustin's real travels; everything else falls back to a
 * clean deterministic entry so any clicked country still tells a story.
 */
export interface CountryStory {
  /** Short evocative title for the visit (also the route-line context). */
  title: string
  /** The handwritten (Caveat) journal narrative. */
  body: string
  /** Display coordinates string, e.g. "40.4168° N, 3.7038° W". */
  coords: string
  /** The capital city (shown in the panel meta). */
  capital?: string
  /** Arriving-flight origin city for the route line, e.g. "LISBON". */
  routeFrom?: string
  /** Polaroids — real photos when available, vector scenes otherwise. */
  photos: StoryPhoto[]
  /** Football grounds — clickable image slots in the panel. */
  stadiums?: Stadium[]
  /** The mono stat strip (match / venue / year, etc.). */
  facts?: StoryFact[]
  /** A short handwritten margin note (Caveat). */
  margin?: string
}
