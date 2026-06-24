import { VISITED_ISO3 } from './stories'

/**
 * Scoreboard figures (SPEC §5 scoreboard stat block). `countries` is derived
 * from the visited set so it never drifts from the globe; the rest are Agustin's
 * running totals. `miles` is the live, volt-glowing LED figure that counts up.
 */
export interface Stat {
  label: string
  value: number
  /** Mono sub-line under the digits. */
  sub: string
  /** The single live figure that glows volt + counts up. */
  live?: boolean
  /** Render the value with thousands separators. */
  thousands?: boolean
}

export const STATS: readonly Stat[] = [
  { label: 'Countries', value: VISITED_ISO3.size, sub: 'STAMPED' },
  { label: 'Matches', value: 47, sub: 'IN PERSON' },
  { label: 'Cities', value: 31, sub: 'WALKED' },
  { label: 'Miles Flown', value: 88402, sub: 'AND COUNTING', live: true, thousands: true },
]

/** The fixture strip beneath the scoreboard — a recent, real-feeling result. */
export const FIXTURE = {
  home: { code: 'ESP', flag: 'esp' as const },
  away: { code: 'ARG', flag: 'arg' as const },
  score: '3:1',
  clock: '78:14 · 2ND HALF',
  note: ['BERNABÉU · MADRID', 'ATT 81,044'],
} as const
