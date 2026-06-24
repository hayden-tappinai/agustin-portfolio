import type { CountryStory, SelectedCountry } from '../types/country'

/**
 * Agustin's real stories, keyed by ISO alpha-3 — the 17 countries he's been to.
 * Six carry rich match memories from his bio (Spain, Argentina, Italy, France,
 * USA, Iceland); the rest get an authentic short entry from a geography-and-footy
 * obsessive who can name every league, derby and capital. Stadium photos load
 * from `public/agustin/stadiums/<slug>.jpg` when they land; tasteful vector
 * scenes stand in until then.
 *
 * The keys of this map are also the "visited" set: the globe highlights only
 * these countries and the stat blocks count them.
 */
export const STORIES: Record<string, CountryStory> = {
  ESP: {
    title: 'El Clásico at the Camp Nou',
    coords: '40.4168° N, 3.7038° W',
    capital: 'Madrid',
    body: 'I watched the MSN front three — Messi, Suárez and Neymar — take on the Real Madrid side that went on to win three straight Champions Leagues. I came back for a Champions League quarter-final against Atlético and heard that anthem in person for the first time. Later I stood inside the Bernabéu too.',
    photos: [
      { caption: 'El Clásico, Camp Nou', scene: 'stadium' },
      { caption: 'Barcelona', scene: 'skyline' },
    ],
    stadiums: [
      { name: 'Camp Nou', club: 'Barcelona', city: 'Barcelona', slug: 'camp-nou', file: 'IMG_2759.webp', visited: true, scene: 'stadium' },
      { name: 'Santiago Bernabéu', club: 'Real Madrid', city: 'Madrid', slug: 'santiago-bernabeu', file: 'IMG_2942.webp', visited: true, scene: 'stadium' },
      { name: 'Reale Arena', club: 'Real Sociedad', city: 'San Sebastián', slug: 'reale-arena', file: 'IMG_2988.webp', visited: true, scene: 'stadium' },
    ],
    facts: [
      { label: 'Match', value: 'EL CLÁSICO' },
      { label: 'Venue', value: 'CAMP NOU' },
      { label: 'Trio', value: 'MSN', live: true },
    ],
    margin: 'the MSN trio in the flesh — unreal ↗',
  },
  ARG: {
    title: 'The Tucumán Derby & La Bombonera',
    coords: '34.6037° S, 58.3816° W',
    capital: 'Buenos Aires',
    body: "Half of me is from here. I went to the Tucumán Derby — Atlético against San Martín, the biggest rivalry in the north — and ate the best stadium food of my life: panchuques and choripán. I've also stood inside La Bombonera, home of Boca and one half of the Superclásico I'm still dying to see.",
    photos: [
      { caption: 'Tucumán Derby', scene: 'stadium' },
      { caption: 'Buenos Aires', scene: 'street' },
    ],
    stadiums: [
      { name: 'La Bombonera', club: 'Boca Juniors', city: 'Buenos Aires', slug: 'la-bombonera', file: 'IMG_1379.webp', visited: true, scene: 'stadium' },
      { name: 'Estadio J. Fierro', club: 'Atlético Tucumán', city: 'Tucumán', slug: 'jose-fierro', file: 'IMG_2019.webp', visited: true, scene: 'stadium' },
      { name: 'La Ciudadela', club: 'San Martín de Tucumán', city: 'Tucumán', slug: 'la-ciudadela', file: 'IMG_4024.webp', visited: true, scene: 'stadium' },
    ],
    facts: [
      { label: 'Derby', value: 'TUCUMÁN' },
      { label: 'Ate', value: 'CHORIPÁN' },
      { label: 'Ground', value: 'BOMBONERA' },
    ],
    margin: "dual citizen — this one's home 🇦🇷",
  },
  ITA: {
    title: 'Roma vs Salernitana, Stadio Olimpico',
    coords: '41.9028° N, 12.4964° E',
    capital: 'Rome',
    body: 'A Serie A night at the Stadio Olimpico, Roma against Salernitana. I ended up right by the traveling Salernitana support — ninety minutes of singing, chanting and waving flags, an absolutely electric away end. The San Siro is high on my list before they tear it down.',
    photos: [
      { caption: 'Stadio Olimpico', scene: 'stadium' },
      { caption: 'Rome', scene: 'skyline' },
    ],
    stadiums: [
      { name: 'Stadio Olimpico', club: 'Roma', city: 'Rome', slug: 'stadio-olimpico', file: 'IMG_1766.webp', visited: true, scene: 'stadium' },
      { name: 'Curva Sud', club: 'Roma · matchday', city: 'Rome', slug: 'olimpico-curva', file: 'IMG_1469.webp', visited: true, scene: 'stadium' },
      { name: 'San Siro', club: 'Milan · Inter', city: 'Milan', slug: 'san-siro', visited: false, scene: 'stadium' },
    ],
    facts: [
      { label: 'Match', value: 'ROMA · SAL' },
      { label: 'Venue', value: 'OLIMPICO' },
      { label: 'Next', value: 'SAN SIRO' },
    ],
    margin: 'the Salernitana away end was unreal ↘',
  },
  FRA: {
    title: 'Inside the Parc des Princes',
    coords: '48.8566° N, 2.3522° E',
    capital: 'Paris',
    body: "I stood inside the Parc des Princes, home of Paris Saint-Germain. There's a real weight to grounds like this — you feel the history of the club in the concrete before a ball is even kicked.",
    photos: [
      { caption: 'Parc des Princes', scene: 'stadium' },
      { caption: 'Paris', scene: 'skyline' },
    ],
    stadiums: [
      { name: 'Parc des Princes', club: 'Paris Saint-Germain', city: 'Paris', slug: 'parc-des-princes', file: 'IMG_1454.webp', visited: true, scene: 'stadium' },
    ],
    facts: [
      { label: 'Club', value: 'PSG' },
      { label: 'Ground', value: 'PARC DES PRINCES' },
      { label: 'City', value: 'PARIS' },
    ],
    margin: 'Paris does football history right ↗',
  },
  USA: {
    title: 'Ball boy, and a Copa América summer',
    coords: '38.2527° N, 85.7585° W',
    capital: 'Washington, D.C.',
    body: "I grew up supporting Louisville City through USL — my best night was being a ball boy in the final when we hosted Didier Drogba's Phoenix Rising. That same summer I followed Argentina through the Copa América Centenario: Messi's second-half hat-trick against Panama at Soldier Field, his free kick against the US at NRG in Houston, then the heartbreak of the final against Chile.",
    photos: [
      { caption: 'Copa América', scene: 'stadium' },
      { caption: 'Louisville', scene: 'skyline' },
    ],
    stadiums: [
      { name: 'Lynn Family Stadium', club: 'Louisville City FC', city: 'Louisville', slug: 'lynn-family-stadium', file: 'IMG_1172.webp', visited: true, scene: 'stadium' },
      { name: 'NRG Stadium', club: 'Copa América 2016', city: 'Houston', slug: 'nrg-stadium', file: 'IMG_0128.webp', visited: true, scene: 'stadium' },
      { name: 'Hard Rock Stadium', club: 'Copa América 2024', city: 'Miami', slug: 'hard-rock', file: 'IMG_2348.webp', visited: true, scene: 'stadium' },
    ],
    facts: [
      { label: 'Club', value: 'LOU CITY' },
      { label: 'Cup', value: "COPA AM '16" },
      { label: 'Moment', value: 'HAT-TRICK', live: true },
    ],
    margin: 'ball boy in a final — wild 🇺🇸',
  },
  ISL: {
    title: 'KR Reykjavík vs Valur',
    coords: '64.1466° N, 21.9426° W',
    capital: 'Reykjavík',
    body: "Most recently I caught an Icelandic top-flight match between KR Reykjavík and Valur, two of the oldest clubs in the country. There's something pure about football this far north — small grounds, real community, the volcanoes never far off.",
    photos: [
      { caption: 'KR vs Valur', scene: 'stadium' },
      { caption: 'Reykjavík', scene: 'coast' },
    ],
    stadiums: [
      { name: 'KR-völlur', club: 'KR Reykjavík', city: 'Reykjavík', slug: 'kr-vollur', file: 'IMG_8997.webp', visited: true, scene: 'stadium' },
      { name: 'KR vs Valur', club: 'Matchday', city: 'Reykjavík', slug: 'kr-matchday', file: 'IMG_0742.webp', visited: true, scene: 'stadium' },
    ],
    facts: [
      { label: 'Match', value: 'KR · VALUR' },
      { label: 'League', value: 'BESTA DEILD' },
      { label: 'City', value: 'REYKJAVÍK' },
    ],
    margin: 'football at the edge of the Arctic ❄',
  },
  AUT: {
    title: 'Vienna & the Wiener Derby',
    coords: '48.2082° N, 16.3738° E',
    capital: 'Vienna',
    body: 'Vienna, where the Wiener Derby between Rapid and Austria Wien is one of the oldest rivalries on the continent, and Red Bull Salzburg keep exporting talent to the rest of Europe. A city that takes its football seriously under all that imperial grandeur.',
    photos: [
      { caption: 'Vienna', scene: 'skyline' },
      { caption: 'Old town', scene: 'street' },
    ],
    facts: [
      { label: 'Derby', value: 'WIENER' },
      { label: 'Club', value: 'RAPID WIEN' },
      { label: 'Ground', value: 'ERNST HAPPEL' },
    ],
    margin: 'the Ernst Happel hosted Euro 2008 ↗',
  },
  BHS: {
    title: 'Island football in the Bahamas',
    coords: '25.0443° N, 77.3504° W',
    capital: 'Nassau',
    body: "Turquoise water and not much of a pyramid — the Bahamas are a CONCACAF minnow where the BFA league plays on a handful of pitches. Still, I'll take any country off the map, and I can place this one without looking.",
    photos: [
      { caption: 'Bahamas', scene: 'coast' },
      { caption: 'Nassau', scene: 'street' },
    ],
    facts: [
      { label: 'Conf', value: 'CONCACAF' },
      { label: 'Capital', value: 'NASSAU' },
      { label: 'Map', value: 'PLACED ✓' },
    ],
    margin: 'every flag, every capital — even this one ↘',
  },
  DNK: {
    title: 'Copenhagen & Danish Dynamite',
    coords: '55.6761° N, 12.5683° E',
    capital: 'Copenhagen',
    body: "Copenhagen, home of the New Firm derby between FC København and Brøndby at Parken. This is the land of the 'Danish Dynamite' side and the fairytale Euro '92 win — a small country that punches far above its weight.",
    photos: [
      { caption: 'Parken', scene: 'stadium' },
      { caption: 'Copenhagen', scene: 'skyline' },
    ],
    facts: [
      { label: 'Derby', value: 'NEW FIRM' },
      { label: 'Ground', value: 'PARKEN' },
      { label: 'Glory', value: 'EURO 92' },
    ],
    margin: 'Euro 92 still the best underdog story ↗',
  },
  DOM: {
    title: 'Santo Domingo, an island warming to football',
    coords: '18.4861° N, 69.9312° W',
    capital: 'Santo Domingo',
    body: "Baseball is king here, but football is climbing — the Liga Dominicana de Fútbol is young and Cibao FC have started turning up in the CONCACAF cups. I love a country where the game is still finding its feet.",
    photos: [
      { caption: 'Santo Domingo', scene: 'coast' },
      { caption: 'Zona Colonial', scene: 'street' },
    ],
    facts: [
      { label: 'League', value: 'LDF' },
      { label: 'Club', value: 'CIBAO FC' },
      { label: 'Conf', value: 'CONCACAF' },
    ],
    margin: "football's only growing here ↘",
  },
  GRC: {
    title: 'Athens & the Derby of the Eternal Enemies',
    coords: '37.9838° N, 23.7275° E',
    capital: 'Athens',
    body: "Athens, where Olympiacos and Panathinaikos contest the 'Derby of the Eternal Enemies' — maybe the most ferocious atmosphere in Europe. Ancient ruins on one hill, a football war on the other.",
    photos: [
      { caption: 'Athens', scene: 'skyline' },
      { caption: 'Matchday', scene: 'stadium' },
    ],
    facts: [
      { label: 'Derby', value: 'ETERNAL' },
      { label: 'Clubs', value: 'OSFP · PAO' },
      { label: 'Ground', value: 'KARAISKAKIS' },
    ],
    margin: 'loudest derby in Europe, easily ↗',
  },
  HUN: {
    title: 'Budapest & the ghost of Puskás',
    coords: '47.4979° N, 19.0402° E',
    capital: 'Budapest',
    body: 'Budapest, where Ferencváros carry the torch and the gleaming Puskás Aréna honors the Mighty Magyars — the side that humbled England 6–3 at Wembley and rewrote how the game could be played. History runs deep on the Danube.',
    photos: [
      { caption: 'Puskás Aréna', scene: 'stadium' },
      { caption: 'Budapest', scene: 'skyline' },
    ],
    facts: [
      { label: 'Club', value: 'FERENCVÁROS' },
      { label: 'Ground', value: 'PUSKÁS' },
      { label: 'Era', value: 'MAGYARS' },
    ],
    margin: 'the Mighty Magyars changed the game ↘',
  },
  PAN: {
    title: 'Panama — the canal and a Copa memory',
    coords: '8.9824° N, 79.5199° W',
    capital: 'Panama City',
    body: "Panama City, where the canal splits two oceans and Los Canaleros reached their first World Cup in 2018. Funny enough, the Panama I'll never forget is the one Messi hit a hat-trick against at Soldier Field — but it was special to stand in the country too.",
    photos: [
      { caption: 'Panama City', scene: 'skyline' },
      { caption: 'The canal', scene: 'coast' },
    ],
    facts: [
      { label: 'NT', value: 'CANALEROS' },
      { label: 'Ground', value: 'R. FERNÁNDEZ' },
      { label: 'World Cup', value: '2018' },
    ],
    margin: 'where the oceans meet 🌊',
  },
  PER: {
    title: 'Lima & the Clásico Peruano',
    coords: '12.0464° S, 77.0428° W',
    capital: 'Lima',
    body: 'Lima, home of the Clásico between Alianza Lima and Universitario at the Estadio Nacional — passionate, colorful, and proudly its own. Peru\'s football has real soul, and the Libertadores nights here are something else.',
    photos: [
      { caption: 'Lima', scene: 'skyline' },
      { caption: 'Estadio Nacional', scene: 'stadium' },
    ],
    facts: [
      { label: 'Clásico', value: 'PERUANO' },
      { label: 'Clubs', value: 'ALIANZA · U' },
      { label: 'Cup', value: 'LIBERTADORES' },
    ],
    margin: 'South American football just hits different 🇵🇪',
  },
  SWE: {
    title: "Stockholm's three-way derby",
    coords: '59.3293° N, 18.0686° E',
    capital: 'Stockholm',
    body: 'Stockholm, where AIK, Djurgården and Hammarby share a city and a grudge — a rare three-club derby in the Allsvenskan. Cold, well-run and tactically sharp; Scandinavian football is wildly underrated.',
    photos: [
      { caption: 'Stockholm', scene: 'stadium' },
      { caption: 'Gamla Stan', scene: 'skyline' },
    ],
    facts: [
      { label: 'Derby', value: 'STOCKHOLM' },
      { label: 'Clubs', value: 'AIK · DIF' },
      { label: 'League', value: 'ALLSVENSKAN' },
    ],
    margin: 'three clubs, one city, zero peace ↗',
  },
  CHE: {
    title: 'Switzerland — Basel, Bern & the Alps',
    coords: '46.9480° N, 7.4474° E',
    capital: 'Bern',
    body: 'Switzerland, where FC Basel have punched into the Champions League and Young Boys rule the Super League from the Wankdorf in Bern. Pristine, alpine, and quietly producing players for the biggest stages in Europe.',
    photos: [
      { caption: 'The Alps', scene: 'skyline' },
      { caption: 'Old town', scene: 'street' },
    ],
    facts: [
      { label: 'Club', value: 'FC BASEL' },
      { label: 'League', value: 'SUPER LG' },
      { label: 'Ground', value: 'WANKDORF' },
    ],
    margin: 'the Alps make a hell of a backdrop ⛰',
  },
  VAT: {
    title: 'Vatican City — the smallest country with a league',
    coords: '41.9029° N, 12.4534° E',
    capital: 'Vatican City',
    body: 'The smallest country on earth, and yes, it has football — the Vatican even runs the Clericus Cup for its seminary teams. As a kid I learned every flag and capital; the tiniest state on the map was never going to escape me.',
    photos: [
      { caption: "St. Peter's", scene: 'skyline' },
      { caption: 'Rome', scene: 'street' },
    ],
    facts: [
      { label: 'Rank', value: 'SMALLEST' },
      { label: 'Cup', value: 'CLERICUS' },
      { label: 'Inside', value: 'ROME' },
    ],
    margin: 'smallest flag on the floor, still drawn ✦',
  },
}

/** Visited ISO alpha-3 set — drives the globe highlight and the stat counts. */
export const VISITED_ISO3: ReadonlySet<string> = new Set(Object.keys(STORIES))

/** Deterministic entry for any country clicked that isn't one of the 17. */
export function getStory(country: SelectedCountry): CountryStory {
  const known = country.iso3 ? STORIES[country.iso3] : undefined
  if (known) return known
  return {
    title: 'Not yet — but I know it',
    coords: formatCoords(country.lat, country.lng),
    body: `Haven't made it to ${country.name} yet — but ask me its capital, its flag, or where it sits on the map and I'll have it instantly. It's on the list; the qualifiers I used to simulate on my floor always came back around to places like this.`,
    photos: [
      { caption: `${country.name} · I`, scene: 'skyline' },
      { caption: `${country.name} · II`, scene: 'street' },
    ],
    facts: [
      { label: 'Status', value: 'NOT YET' },
      { label: 'Flag', value: 'KNOWN ✓' },
      { label: 'On the', value: 'LIST' },
    ],
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
