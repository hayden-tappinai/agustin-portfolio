import type { CountryStory, SelectedCountry } from '../types/country'

/**
 * Placeholder stories for V1. Keyed by ISO alpha-3.
 *
 * Real photos + narratives come from Agustin's "Footy" Google Drive folder and
 * will be mapped to countries later — this just gives the click → panel
 * interaction real-feeling content to render. A few footy/travel destinations
 * are hand-written; everything else falls back to `fallbackStory`.
 */
const STORIES: Record<string, CountryStory> = {
  ESP: {
    title: 'Bernabéu, under the lights',
    body: 'Real Madrid at home. The roar when the teams walked out is the kind of sound you feel in your chest before you hear it. Stayed in Madrid for a week, ate late, walked everywhere.',
    photoCaptions: ['Santiago Bernabéu', 'Gran Vía at night', 'Pre-match outside the ground'],
  },
  ARG: {
    title: 'La Bombonera shakes',
    body: 'They say the stadium trembles when Boca scores. It does. Spent the afternoon in La Boca, then found a parrilla that did not stop bringing food.',
    photoCaptions: ['La Bombonera', 'Caminito', 'Asado'],
  },
  BRA: {
    title: 'Beach football at golden hour',
    body: 'Pickup games on Copacabana until the light went. Nobody keeps score and everybody does. Maracanã the next day — cathedral-sized.',
    photoCaptions: ['Copacabana', 'Maracanã', 'Sugarloaf from the water'],
  },
  GBR: {
    title: 'Matchday in the rain',
    body: 'Pints before kickoff, a scarf bought on the walk in, ninety minutes of weather and noise. The away end never sat down.',
    photoCaptions: ['The terraces', 'Pub before kickoff', 'Floodlights'],
  },
  ITA: {
    title: 'San Siro at dusk',
    body: 'The spiral ramps, the smoke, the tifo unfurling across a whole stand. Then pasta somewhere small with no menu.',
    photoCaptions: ['San Siro', 'The tifo', 'Trattoria'],
  },
  FRA: {
    title: 'A long weekend in Paris',
    body: 'Parc des Princes on Saturday, the rest of the time just walking the river. Coffee standing up at the bar like a local trying too hard.',
    photoCaptions: ['Parc des Princes', 'Along the Seine', 'Corner café'],
  },
}

/** Deterministic placeholder for any country without a hand-written story. */
export function getStory(country: SelectedCountry): CountryStory {
  const known = country.iso3 ? STORIES[country.iso3] : undefined
  if (known) return known
  return {
    title: `Somewhere in ${country.name}`,
    body: `A chapter from ${country.name} — a match, a city, a long walk to the ground. Photos and the real story land here soon, pulled straight from Agustin's travels.`,
    photoCaptions: [`${country.name} · I`, `${country.name} · II`, `${country.name} · III`],
  }
}
