/**
 * Single source of truth for the globe palette.
 *
 * Keep this in sync with the CSS custom properties in `src/index.css` and the
 * Tailwind theme tokens in `tailwind.config.js`. The THREE.js materials in the
 * globe can't read CSS variables, so the canonical hex values live here and are
 * mirrored into CSS — there are no ad-hoc hex codes scattered across components.
 *
 * Design constraint (see CONTEXT.md): 2–3 colors total — navy page, blue ocean,
 * green land. The hover tint is a brighter shade of the same land green, so the
 * palette still reads as three colors.
 */
export const palette = {
  /** Page background — deep navy so the globe pops. */
  pageBg: '#0a1422',
  /** Ocean sphere (THREE globeMaterial color). */
  ocean: '#14598c',
  /** Faint atmospheric rim glow — a lighter blue, same family. */
  atmosphere: '#5aa9e6',
  /** Country land — the resting green. */
  land: '#3ea96b',
  /** Country land while hovered — a brighter shade of the same green. */
  landHover: '#6fe3a0',
  /** Extruded country side wall, shown when a country lifts on hover. */
  landSide: '#1f6b45',
  /** Thin border between countries — a dark teal that separates without busying. */
  landStroke: '#0c2b22',
  /** Near-white primary text. */
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
} as const

export type Palette = typeof palette
