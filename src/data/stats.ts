import { VISITED_ISO3 } from './stories'

/**
 * The numbers behind Agustin's football life (the scoreboard / "by the numbers"
 * block). `countries` is derived from the visited set so it never drifts from
 * the globe. `flags` — the count of the world's countries, every one of which he
 * can identify by flag — is the live, volt-glowing figure that counts up (a nod
 * to the kid who drew all 32 World Cup flags and never stopped).
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
  { label: 'Countries', value: VISITED_ISO3.size, sub: 'VISITED' },
  { label: 'Stadiums', value: 10, sub: 'STOOD IN' },
  { label: 'Leagues', value: 20, sub: 'FOLLOWED' },
  { label: 'Flags', value: 195, sub: 'MEMORIZED', live: true },
]

/**
 * The fixture strip beneath the scoreboard — a real match Agustin attended:
 * Argentina 5–0 Panama, Copa América Centenario, Soldier Field, Messi hat-trick.
 */
export const FIXTURE = {
  home: { code: 'ARG', flag: '🇦🇷' },
  away: { code: 'PAN', flag: '🇵🇦' },
  score: '5:0',
  clock: 'FT · COPA AMÉRICA',
  note: ['SOLDIER FIELD · CHICAGO', 'MESSI HAT-TRICK'],
} as const
