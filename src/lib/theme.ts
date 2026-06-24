/**
 * Single source of truth for the globe palette (and a mirror of the full design
 * tokens for any TS consumer that needs an exact hex).
 *
 * Keep the globe values in sync with the CSS custom properties in
 * `src/index.css` and the Tailwind tokens in `tailwind.config.js`. The THREE.js
 * materials can't read CSS variables, so the canonical hex values live here and
 * are mirrored into CSS — there are no ad-hoc hex codes scattered in components.
 *
 * Design constraint (CONTEXT.md): the globe stays clean & minimal — navy page,
 * blue ocean, green land. It is the *calm center*; the warm scrapbook system
 * (kraft, stamps, Polaroids) wraps around it. The hover and "visited" tints are
 * brighter shades of the same land green, so the globe still reads as a few
 * greens — never busy.
 */
export const palette = {
  /** Page background — deep navy so the globe pops. */
  pageBg: '#0a1422',
  /** Ocean sphere (THREE globeMaterial color). */
  ocean: '#14598c',
  /** Faint atmospheric rim glow — a lighter blue, same family. */
  atmosphere: '#5aa9e6',
  /** Country land — the resting green for places not yet visited. */
  land: '#34965d',
  /** A country Agustin has been to — brighter, it reads as "lit up". */
  landVisited: '#54cf8a',
  /** Country land while hovered — the brightest shade of the same green. */
  landHover: '#8af0b3',
  /** Extruded country side wall, shown when a country lifts on hover. */
  landSide: '#1f6b45',
  /** Thin border between countries — a dark teal that separates without busying. */
  landStroke: '#0c2b22',
  /** The one electric spark — the "you-are-here" pulse on a selected country. */
  volt: '#cdff3d',
  /** Near-white primary text (used on the navy globe zone). */
  text: '#eef4f2',
  /** Muted secondary text. */
  textMuted: '#9bb0c2',
} as const

/**
 * Resting vs. hovered altitude of a country polygon above the ocean surface.
 * The delta between these is the visible "lift" on hover.
 */
export const altitude = {
  rest: 0.008,
  hover: 0.06,
  /** A selected country sits slightly proud so the volt marker reads. */
  selected: 0.03,
} as const

/**
 * The full design-system palette (SPEC §1), mirrored for TS consumers. Most of
 * the UI reads these via Tailwind tokens / CSS vars; this export exists so the
 * rare component that needs an exact hex in JS has one source of truth.
 */
export const design = {
  paper: '#f2e8cf',
  paper2: '#e8d9b5',
  paperEdge: '#cdb789',
  paperLine: '#c7b488',
  ink: '#1c1712',
  ink2: '#4a4034',
  inkFaint: '#8a7e68',
  navy: '#0a1422',
  navy2: '#14233a',
  pitch: '#1e7a46',
  globeGreen: '#3ea96b',
  ocean: '#14598c',
  stampRed: '#c0362c',
  gold: '#c8992f',
  volt: '#cdff3d',
  voltDeep: '#a6d400',
} as const

export type Palette = typeof palette
