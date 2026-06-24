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
  BEL: {
    title: 'Frites, Trappist & a midweek match',
    coords: '50.8466° N, 4.3528° E',
    routeFrom: 'AMSTERDAM',
    body: 'Bruges by canal, then a floodlit midweek game in Brussels. Frites with too many sauces, a Trappist beer brewed by actual monks, cobblestones the whole way home.',
    photos: [
      { caption: 'Brussels, under lights', date: '10.DEC.2024', scene: 'stadium' },
      { caption: 'Bruges canals', date: '11.DEC.2024', scene: 'street' },
    ],
    stamp: { entry: 'ENTRY · BRU', city: 'BRUSSELS', date: '09 DEC 2024' },
    margin: 'the sauces are a whole menu ↗',
  },
  TUR: {
    title: 'They call it hell',
    coords: '41.0082° N, 28.9784° E',
    routeFrom: 'ATHENS',
    body: 'Galatasaray at home, and the banner that says "welcome to hell" is not joking. The call to prayer over the Bosphorus the next morning brought the volume right back down.',
    photos: [
      { caption: 'Galatasaray, the kop', date: '14.OCT.2024', scene: 'stadium' },
      { caption: 'Bosphorus at dawn', date: '15.OCT.2024', scene: 'coast' },
    ],
    stamp: { entry: 'ENTRY · IST', city: 'ISTANBUL', date: '13 OCT 2024' },
    margin: 'loudest stadium on earth, easily →',
  },
  MAR: {
    title: 'Wydad red, then the souks',
    coords: '33.5731° N, 7.5898° W',
    routeFrom: 'LISBON',
    body: 'Wydad Casablanca turned the whole stand red. Then the train down to Marrakech, mint tea in the square, and a souk you could happily get lost in for a week.',
    photos: [
      { caption: 'Casablanca derby', date: '02.SEP.2024', scene: 'stadium' },
      { caption: 'Marrakech souk', date: '03.SEP.2024', scene: 'street' },
    ],
    stamp: { entry: 'ENTRY · CMN', city: 'CASABLANCA', date: '01 SEP 2024' },
    margin: 'mint tea, three a day ↘',
  },
  URY: {
    title: 'Where it all started',
    coords: '34.8941° S, 56.1626° W',
    routeFrom: 'BUENOS AIRES',
    body: 'The Estadio Centenario, where the very first World Cup was won in 1930. You can feel the history in the concrete. Then a chivito the size of my head on the rambla.',
    photos: [
      { caption: 'Estadio Centenario', date: '16.MAR.2026', scene: 'stadium' },
      { caption: 'The rambla', date: '17.MAR.2026', scene: 'coast' },
    ],
    stamp: { entry: 'ENTRY · MVD', city: 'MONTEVIDEO', date: '16 MAR 2026' },
    margin: 'football started right here ↗',
  },
  COL: {
    title: 'Eternal spring, a sea of yellow',
    coords: '6.2476° N, 75.5658° W',
    routeFrom: 'RIO',
    body: "Medellín really is spring all year. A cable car up the hillside, salsa that doesn't stop, and a sea of yellow shirts at the game that sang from minute one.",
    photos: [
      { caption: 'Medellín hillside', date: '22.JAN.2026', scene: 'skyline' },
      { caption: 'A sea of yellow', date: '23.JAN.2026', scene: 'stadium' },
    ],
    stamp: { entry: 'ENTRY · MDE', city: 'MEDELLÍN', date: '22 JAN 2026' },
    margin: 'the cable cars are the best transit ↘',
  },
  GRC: {
    title: 'Sunset over the Acropolis',
    coords: '37.9755° N, 23.7348° E',
    routeFrom: 'ROME',
    body: 'The Acropolis at golden hour, then a derby that needed a police escort to leave the ground. Souvlaki at midnight, the Aegean blue the next day.',
    photos: [
      { caption: 'Acropolis, golden hour', date: '20.OCT.2025', scene: 'skyline' },
      { caption: 'Derby night', date: '21.OCT.2025', scene: 'stadium' },
    ],
    stamp: { entry: 'ENTRY · ATH', city: 'ATHENS', date: '20 OCT 2025' },
    margin: 'history on every corner →',
  },
  HRV: {
    title: 'The Adriatic & Dinamo in the rain',
    coords: '43.5081° N, 16.4402° E',
    routeFrom: 'MILAN',
    body: 'Split on the Adriatic — swam in the morning, watched Hajduk in the afternoon. The checkerboard everywhere, the sea impossibly clear, the ultras impossibly loud.',
    photos: [
      { caption: 'Split harbour', date: '24.OCT.2025', scene: 'coast' },
      { caption: 'Hajduk, Torcida end', date: '25.OCT.2025', scene: 'stadium' },
    ],
    stamp: { entry: 'ENTRY · SPU', city: 'SPLIT', date: '24 OCT 2025' },
    margin: 'cleanest sea I have ever swum in ↗',
  },
  POL: {
    title: "Kraków's square, a freezing night match",
    coords: '50.0647° N, 19.9450° E',
    routeFrom: 'BERLIN',
    body: "Kraków's old square at night, pierogi by the dozen, and a match so cold I could see my breath singing. The away end didn't seem to notice the temperature at all.",
    photos: [
      { caption: 'Kraków, the square', date: '17.FEB.2025', scene: 'street' },
      { caption: 'Freezing night match', date: '18.FEB.2025', scene: 'stadium' },
    ],
    stamp: { entry: 'ENTRY · KRK', city: 'KRAKÓW', date: '17 FEB 2025' },
    margin: 'pierogi fix everything ↘',
  },
  AUS: {
    title: 'Harbour at dawn, A-League Saturday',
    coords: '33.8688° S, 151.2093° E',
    routeFrom: 'TOKYO',
    body: 'Landed on a red-eye, watched the harbour go pink at dawn, then a Saturday A-League game in the sun. Furthest I have ever been from Madrid and it felt like another planet.',
    photos: [
      { caption: 'Sydney harbour, dawn', date: '26.APR.2025', scene: 'coast' },
      { caption: 'Saturday in the sun', date: '27.APR.2025', scene: 'stadium' },
    ],
    stamp: { entry: 'ENTRY · SYD', city: 'SYDNEY', date: '26 APR 2025' },
    margin: 'the long way round, worth it ↗',
  },
  IRL: {
    title: 'Guinness that tastes different',
    coords: '53.3331° N, 6.2489° W',
    routeFrom: 'LONDON',
    body: 'They are right — the Guinness does taste different here. Ninety minutes at the Aviva in horizontal rain, then a session in a pub with a fiddle going in the corner.',
    photos: [
      { caption: 'Aviva, full house', date: '05.NOV.2025', scene: 'stadium' },
      { caption: 'A proper session', date: '05.NOV.2025', scene: 'street' },
    ],
    stamp: { entry: 'ENTRY · DUB', city: 'DUBLIN', date: '04 NOV 2025' },
    margin: 'the fiddle never stopped →',
  },
  EGY: {
    title: "Al Ahly's red wall, then the pyramids",
    coords: '30.0444° N, 31.2357° E',
    routeFrom: 'ATHENS',
    body: 'Al Ahly painted the stadium red and the noise never dipped. The next morning the pyramids sat right at the edge of the city, like they had always been the suburbs.',
    photos: [
      { caption: 'Al Ahly, red wall', date: '08.OCT.2025', scene: 'stadium' },
      { caption: 'Pyramids at the edge', date: '09.OCT.2025', scene: 'skyline' },
    ],
    stamp: { entry: 'ENTRY · CAI', city: 'CAIRO', date: '07 OCT 2025' },
    margin: 'the pyramids are basically downtown ↘',
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
