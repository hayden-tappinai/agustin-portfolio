import type { CountryStory, SelectedCountry } from '../types/country'

/**
 * Agustin's stories, keyed by ISO alpha-3. These are the places he's been —
 * footy grounds and far-flung cities. Real, specific copy (the Bernabéu, La
 * Bombonera, Maracanã…). Real photos + an optional `file` per Polaroid arrive
 * from `~/tappinai/assets/agustin/photo-map.json`; until then each Polaroid
 * draws a tasteful vector `scene`, never a broken image.
 *
 * The keys of this map are also the "visited" set: the globe lights those
 * countries brighter and the scoreboard counts them.
 */
export const STORIES: Record<string, CountryStory> = {
  ESP: {
    title: 'Bernabéu, under the lights',
    coords: '40.4530° N, 3.6883° W',
    routeFrom: 'LISBON',
    body: 'Real Madrid at home. The roar when the teams walked out is the kind of sound you feel in your chest before you hear it. Stayed a week, ate late, walked everywhere.',
    photos: [
      { caption: 'Bernabéu, full house', date: '07.MAY.2026', scene: 'stadium' },
      { caption: 'Gran Vía at night', date: '08.MAY.2026', scene: 'skyline' },
    ],
    stamp: { entry: 'ENTRY · MADRID', city: 'MADRID', date: '06 MAY 2026' },
    margin: "best night of the trip — and we still had Sevilla to go →",
  },
  ARG: {
    title: 'La Bombonera shakes',
    coords: '34.6354° S, 58.3648° W',
    routeFrom: 'MADRID',
    body: 'They say the stadium trembles when Boca scores. It does — you feel it through your feet. Spent the afternoon in La Boca, then found a parrilla that did not stop bringing food.',
    photos: [
      { caption: 'La Bombonera, half-time', date: '14.MAR.2026', scene: 'stadium' },
      { caption: 'Caminito colours', date: '15.MAR.2026', scene: 'street' },
    ],
    stamp: { entry: 'ENTRY · EZE', city: 'BUENOS AIRES', date: '13 MAR 2026' },
    margin: 'the asado alone was worth the flight ↘',
  },
  BRA: {
    title: 'Beach football at golden hour',
    coords: '22.9519° S, 43.2105° W',
    routeFrom: 'BUENOS AIRES',
    body: 'Pickup games on Copacabana until the light went. Nobody keeps score and everybody does. The Maracanã the next day — cathedral-sized, and somehow louder.',
    photos: [
      { caption: 'Copacabana, golden hour', date: '20.JAN.2026', scene: 'coast' },
      { caption: 'Maracanã', date: '21.JAN.2026', scene: 'stadium' },
    ],
    stamp: { entry: 'ENTRY · GIG', city: 'RIO', date: '19 JAN 2026' },
    margin: 'sand in my boots for a week ↗',
  },
  GBR: {
    title: 'Matchday in the rain',
    coords: '51.5549° N, 0.1084° W',
    routeFrom: 'PARIS',
    body: 'Pints before kickoff, a scarf bought on the walk in, ninety minutes of weather and noise. The away end never sat down once.',
    photos: [
      { caption: 'The terraces, full', date: '02.NOV.2025', scene: 'stadium' },
      { caption: 'Pub before kickoff', date: '02.NOV.2025', scene: 'street' },
    ],
    stamp: { entry: 'ENTRY · LHR', city: 'LONDON', date: '01 NOV 2025' },
    margin: 'never did warm up — worth it →',
  },
  ITA: {
    title: 'San Siro at dusk',
    coords: '45.4781° N, 9.1240° E',
    routeFrom: 'MADRID',
    body: 'The spiral ramps, the smoke, a tifo unfurling across a whole stand. Then pasta somewhere small with no menu and no English.',
    photos: [
      { caption: 'San Siro, the tifo', date: '18.OCT.2025', scene: 'stadium' },
      { caption: 'Duomo at dusk', date: '19.OCT.2025', scene: 'skyline' },
    ],
    stamp: { entry: 'ENTRY · MXP', city: 'MILANO', date: '17 OCT 2025' },
    margin: 'go for the football, stay for the food ↘',
  },
  FRA: {
    title: 'A long weekend in Paris',
    coords: '48.8414° N, 2.2530° E',
    routeFrom: 'BARCELONA',
    body: 'Parc des Princes on Saturday, the rest of the time just walking the river. Coffee standing up at the bar like a local trying a bit too hard.',
    photos: [
      { caption: 'Parc des Princes', date: '12.SEP.2025', scene: 'stadium' },
      { caption: 'Along the Seine', date: '13.SEP.2025', scene: 'skyline' },
    ],
    stamp: { entry: 'ENTRY · CDG', city: 'PARIS', date: '11 SEP 2025' },
    margin: 'three days, eight thousand steps a day ↗',
  },
  PRT: {
    title: 'Lisbon, all downhill to the water',
    coords: '38.7528° N, 9.1847° W',
    routeFrom: 'MADRID',
    body: 'Trams that shouldn’t make those corners, custard tarts twice a day, and the Estádio da Luz lit up red over the rooftops. Everything in Lisbon runs downhill to the river.',
    photos: [
      { caption: 'Estádio da Luz', date: '04.JUN.2025', scene: 'stadium' },
      { caption: 'Alfama rooftops', date: '05.JUN.2025', scene: 'skyline' },
    ],
    stamp: { entry: 'ENTRY · LIS', city: 'LISBOA', date: '03 JUN 2025' },
    margin: 'the 28 tram is a rollercoaster ↘',
  },
  JPN: {
    title: 'Tokyo, neon and quiet',
    coords: '35.6762° N, 139.6503° E',
    routeFrom: 'LONDON',
    body: 'Loudest city I’ve been to and the most polite. Watched a J-League game where the crowd sang for ninety straight minutes, then the whole stand bowed and tidied up after.',
    photos: [
      { caption: 'Shibuya crossing', date: '22.APR.2025', scene: 'skyline' },
      { caption: 'Matchday, Tokyo', date: '23.APR.2025', scene: 'stadium' },
    ],
    stamp: { entry: 'ENTRY · HND', city: 'TOKYO', date: '21 APR 2025' },
    margin: 'jet-lag worth every minute ↗',
  },
  DEU: {
    title: 'The Yellow Wall',
    coords: '51.4926° N, 7.4518° E',
    routeFrom: 'AMSTERDAM',
    body: 'Eighty thousand people and one giant wall of yellow that never stopped moving. Bratwurst at half time, a stein the size of my head, a train home full of singing.',
    photos: [
      { caption: 'Signal Iduna, südtribüne', date: '15.FEB.2025', scene: 'stadium' },
      { caption: 'Old town, snow', date: '16.FEB.2025', scene: 'street' },
    ],
    stamp: { entry: 'ENTRY · DTM', city: 'DORTMUND', date: '14 FEB 2025' },
    margin: 'the Yellow Wall is real and it is loud →',
  },
  NLD: {
    title: 'Amsterdam by bike and canal',
    coords: '52.3144° N, 4.9419° E',
    routeFrom: 'BERLIN',
    body: 'Rented a bike on day one and never gave it back. Johan Cruyff Arena on Sunday, canals the rest of the time, and the best chips of my life with too much mayo.',
    photos: [
      { caption: 'Cruyff Arena', date: '08.DEC.2024', scene: 'stadium' },
      { caption: 'Canal ring at dusk', date: '09.DEC.2024', scene: 'skyline' },
    ],
    stamp: { entry: 'ENTRY · AMS', city: 'AMSTERDAM', date: '07 DEC 2024' },
    margin: 'bikes always win here ↘',
  },
  USA: {
    title: 'Lights on a Tuesday in New York',
    coords: '40.7128° N, 74.0060° W',
    routeFrom: 'LONDON',
    body: 'Walked it end to end. Caught a match across the river under floodlights, ate a slice at 1am, and the city never once went quiet.',
    photos: [
      { caption: 'Downtown skyline', date: '03.OCT.2024', scene: 'skyline' },
      { caption: 'Midweek, under lights', date: '04.OCT.2024', scene: 'stadium' },
    ],
    stamp: { entry: 'ENTRY · JFK', city: 'NEW YORK', date: '02 OCT 2024' },
    margin: 'a slice at 1am fixes everything ↗',
  },
  MEX: {
    title: 'El Tri at altitude',
    coords: '19.3029° N, 99.1505° W',
    routeFrom: 'NEW YORK',
    body: 'The Azteca sits high enough that the ball flies and your lungs notice. Tacos al pastor from a cart afterward, green and red everywhere, a city that does noise properly.',
    photos: [
      { caption: 'Estadio Azteca', date: '11.AUG.2024', scene: 'stadium' },
      { caption: 'Centro Histórico', date: '12.AUG.2024', scene: 'street' },
    ],
    stamp: { entry: 'ENTRY · MEX', city: 'CDMX', date: '10 AUG 2024' },
    margin: 'altitude is no joke ↘',
  },
}

/** Visited ISO alpha-3 set — drives the globe tint and the scoreboard count. */
export const VISITED_ISO3: ReadonlySet<string> = new Set(Object.keys(STORIES))

/** Deterministic placeholder for any country without a hand-written story. */
export function getStory(country: SelectedCountry): CountryStory {
  const known = country.iso3 ? STORIES[country.iso3] : undefined
  if (known) return known
  return {
    title: `Somewhere in ${country.name}`,
    coords: formatCoords(country.lat, country.lng),
    body: `A chapter from ${country.name} — a match, a city, a long walk to the ground. The real story and photos land here soon, pulled straight from Agustin's travels.`,
    photos: [
      { caption: `${country.name} · I`, scene: 'skyline' },
      { caption: `${country.name} · II`, scene: 'stadium' },
    ],
    stamp: { entry: 'NEXT TRIP', city: country.name.toUpperCase(), date: 'PENDING' },
    margin: 'one for the list ↗',
  }
}

/** "40.4168° N, 3.7038° W" from signed lat/lng. */
export function formatCoords(lat: number, lng: number): string {
  const ns = lat >= 0 ? 'N' : 'S'
  const ew = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lng).toFixed(4)}° ${ew}`
}

/** Whether a selected country is one Agustin has been to. */
export function isVisited(country: SelectedCountry): boolean {
  return country.iso3 !== null && VISITED_ISO3.has(country.iso3)
}
