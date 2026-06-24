/**
 * Per-country Agustin cutouts — he's drawn as a cardboard scrapbook cutout in
 * each nation's kit, waving its flag. The transparent PNGs land in
 * `public/agustin/countries/<ISO3>.png` (a parallel pipeline generates them);
 * any that haven't arrived yet are skipped gracefully at render time.
 *
 * The centroids below are rough [lat, lng] anchors used to pin a cutout onto
 * its country on the globe via `getScreenCoords`. Not survey-grade — just close
 * enough that the figure "stands on" the right place while the country is hovered.
 */
export const COUNTRY_CENTROIDS: Record<string, [number, number]> = {
  ARG: [-38, -63],
  BHS: [24.5, -76.8],
  ITA: [42.8, 12.8],
  FRA: [46.6, 2.2],
  USA: [39.5, -98.5],
  ESP: [40.2, -3.7],
  ISL: [64.9, -19],
  AUT: [47.6, 14.1],
  DNK: [56, 9.5],
  DOM: [18.9, -70.4],
  GRC: [39, 22.5],
  HUN: [47.1, 19.5],
  PAN: [8.6, -80.1],
  PER: [-9.2, -75],
  SWE: [62.5, 15.5],
  CHE: [46.8, 8.2],
  VAT: [41.9, 12.45],
}

/** The ISO-3 set we have (or expect) national-kit cutouts for. */
export const CUTOUT_ISO3: ReadonlySet<string> = new Set(Object.keys(COUNTRY_CENTROIDS))

/** Public path to a country's static cutout PNG (fallback). */
export const cutoutSrc = (iso3: string): string => `/agustin/countries/${iso3}.png`

/**
 * Public path to a country's ANIMATED cutout — a seamless-looping stop-motion
 * WebP of Agustin waving that nation's flag. An `<img>` plays it natively. If a
 * country's webp hasn't landed yet, the render falls back to the static PNG.
 */
export const cutoutAnimSrc = (iso3: string): string => `/agustin/countries-anim/${iso3}.webp`
