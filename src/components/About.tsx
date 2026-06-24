import { Reveal } from './Reveal'
import { Polaroid } from './Polaroid'

/** Agustin's full bio, his exact words (BIO.txt) — rendered as spaced, readable prose. */
const BIO_PARAGRAPHS: string[] = [
  `My passion for football extends far beyond simply watching matches. As an American and Argentinian dual citizen, I grew up surrounded by the sport. The first World Cup I vividly remember was the 2010 tournament held in South Africa, when I was seven years old. That tournament sparked not only my love for football, but also my curiosity about the countries competing in it. I began by drawing and coloring the flags of all 32 participating nations, and when the World Cup ended, I decided to continue until I had completed every country's flag. After finishing them, I would spread the flags across the floor of my house and use them to simulate the entire World Cup qualifiers for each confederation and then the World Cup. What started as just drawing some flags turned into my fascination with geography. Recognizing my growing interest, my parents gave me a book that featured every country in the world, and I made it a goal of mine to read about a different country each night before bed. As I got older, I expanded my knowledge by learning the locations of countries on a map, their cultures, and their capital cities. To this day, I can identify every country's flag, name its capital, and locate it on a map.`,
  `My interest in geography naturally expanded the way I followed football. Rather than limiting myself to the world's most popular leagues, I became interested in the sport on a more global scale. While I closely follow Europe's top five leagues, I also keep up with the English Championship as a Blackburn Rovers supporter, Spain's La Liga 2, and the top three divisions of Argentine football. Beyond that, I regularly follow leagues across South America as well as major continental competitions such as the Copa Libertadores, Copa Sudamericana, CONCACAF Champions Cup, UEFA Champions League, UEFA Europa League, and UEFA Conference League. Following football across different countries, cultures, and levels of competition has given me a broader appreciation for the sport and the unique role it plays around the world. I wanted to keep learning, so I spent my free time following league standings from across Europe and South America and researching clubs I had never heard of before. What began as just a combination of boredom and curiosity turned into a deep interest in football clubs and their histories. As a result, I can now recognize the logos of countless clubs, including many obscure teams from leagues throughout Europe and South American nations, especially Argentina.`,
  `I have also developed a very big appreciation for analytics and ranking systems. Ever since I was young, I was fascinated by the FIFA Coca-Cola Rankings and how teams were compared to one another. That interest grew during my time playing high school and club soccer in Kentucky, where I noticed that there were many different ranking systems that often had conflicting rankings. Different websites frequently ranked the same teams in different positions, which made me curious about how rankings were actually created. That curiosity followed me to college, where I played for Miami University's club soccer team. During the season, I closely followed the rankings released by US College Club Soccer and became interested in the methodology behind them. After the season concluded, I challenged myself to create my own ranking system to see how accurately I could rank teams. I based my rankings on head-to-head results, conference standings, regional tournament results, and performances at the national tournament. I assigned greater weight to matches played in the later stages of competition to reward teams who advanced in higher stake games into the post-season. I also included overall records and strength of schedule to account for differences in competition levels. I first developed rankings for each of the six regions before creating a national top 200. When US College Club Soccer later released its own "Top 20 Rankings", I found that my model shared the same 20 teams, differing only in their order. The project strengthened my interest in analytics and demonstrated how using certain data approaches can be used to evaluate teams in a structured way.`,
  `I have been fortunate enough to experience the game across multiple countries, leagues, and cultures. From El Clásico at the Camp Nou, where I watched arguably one of the greatest attacking trios in football history, Lionel Messi, Luis Suárez, and Neymar Jr., take on a Real Madrid side that would later win three consecutive UEFA Champions League titles, to witnessing a UEFA Champions League quarterfinal between Barcelona and Atlético de Madrid and hearing the iconic anthem in person for the first time, I have been fortunate to experience some incredible matches. I have also attended the Tucumán Derby, the biggest rivalry in northern Argentina, featuring Atlético Tucumán and San Martín de Tucumán, where I enjoyed the best stadium food I have ever had: panchuques and choripán. Closer to home, I have supported Louisville City FC through multiple USL Championship seasons, with my most memorable experience being a ball boy during the championship match when Louisville hosted Didier Drogba's Phoenix Rising. Another highlight was attending a Serie A match between Roma and Salernitana at the iconic Stadio Olimpico in Rome, where I sat right by the traveling Salernitana supporters as they sang, chanted, and waved flags throughout the entire match, creating an electric atmosphere. I followed Argentina's journey through the Copa América Centenario; watching Messi score a second-half hat trick against Panama at Chicago's Soldier Field, seeing him score one the best free kicks of his career against the United States in the semifinal at Houston's NRG Stadium, and witnessing the heartbreaking final against Chile, where Argentina fell in a second consecutive Copa América final after Messi missed his penalty in the shootout, a moment that nearly led him to retire from international football. Most recently, I attended an Icelandic top-flight match between KR Reykjavík and Valur, two of the country's most historic clubs.`,
  `These experiences sparked my fascination with how football connects people, cities, and cultures around the world. I have also had the opportunity to visit several iconic football stadiums, including the Santiago Bernabéu, home of Real Madrid; the Parc des Princes, home of Paris Saint Germain; and La Bombonera, the home of Boca Juniors, one half of the Superclásico. The Superclásico in Argentina is widely regarded as the greatest rivalry on the planet and attending the match is one of the top items on my bucket list, alongside visiting the Maracanã and the San Siro before its planned demolition.`,
  `Some of the other rivalries that have helped shape football culture around the world that I feel like I need to mention include the Old Firm derby between Celtic and Rangers in Scotland, the Intercontinental Derby between Galatasaray and Fenerbahçe in Turkey, and the Eternal Derby between Red Star Belgrade and Partizan Belgrade in Serbia. While much of the global spotlight is focused on Europe's top five leagues and the Champions League, these rivalries often do not receive the recognition they deserve and have the most intense and culturally significant atmospheres.`,
]

function FactsCard() {
  return (
    <div className="relative rounded-lg bg-paper-2 p-5" style={{ border: '1px solid var(--paper-edge)', boxShadow: '0 14px 30px var(--paper-shadow)' }}>
      <span className="washi tape-ocean" style={{ top: '-13px', left: '24px', transform: 'rotate(-5deg)' }} />
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">Passport · The Facts</p>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-[34px] leading-none" aria-hidden>🇦🇷</span>
        <span className="text-[34px] leading-none" aria-hidden>🇺🇸</span>
        <span className="font-display text-[clamp(20px,3vw,26px)] uppercase leading-none tracking-[0.02em] text-ink">Dual Citizen</span>
      </div>

      <dl className="mt-5 space-y-3 border-t border-dashed border-paper-edge pt-4">
        <Row label="Citizenship" value="Argentina + United States" />
        <Row label="Languages" value="English · Spanish" />
        <Row label="Degree" value="B.S. Kinesiology — Miami University" />
        <Row label="Supports" value="Blackburn Rovers · Louisville City FC" />
      </dl>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className="mt-[2px] font-sans text-[14px] font-semibold leading-snug text-ink">{value}</dd>
    </div>
  )
}

/**
 * The About / The Story section — Agustin's full bio in his own words, set as
 * clean, well-spaced editorial prose, alongside a passport facts card and the
 * two photos that bookend the story (the kid who drew the flags; the graduate).
 */
export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <Reveal>
        <div>
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[8px] w-[8px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
            The Story · Est. 2010
          </p>
          <h2 className="mt-3 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
            How It Started
          </h2>
        </div>
      </Reveal>

      <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* the essay */}
        <Reveal className="order-2 lg:order-1">
          <div className="max-w-[680px]">
            {BIO_PARAGRAPHS.map((para, i) => (
              <p
                key={i}
                className={[
                  'font-sans text-[17px] leading-[1.75] text-ink-2',
                  i === 0
                    ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.72] first-letter:text-pitch'
                    : 'mt-6',
                ].join(' ')}
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/* the side rail — facts + the two real photos */}
        <Reveal className="order-1 lg:order-2" x={18}>
          <div className="flex flex-col items-center gap-8 lg:items-stretch">
            <FactsCard />
            <Polaroid
              photo={{ file: 'scrap_B4C72CA6.webp', caption: '2010 — where it started' }}
              rotate={-3}
              fixing="washi"
              tape="tape-gold"
              width="min(260px, 80%)"
              className="self-center"
            />
            <Polaroid
              photo={{ file: 'IMG_9139.webp', caption: 'NIRSA nationals · Miami' }}
              rotate={2}
              fixing="washi"
              tape="tape-ocean"
              width="min(260px, 80%)"
              className="self-center"
            />
            <Polaroid
              photo={{ file: 'IMG_0091.webp', caption: 'Kinesiology, Miami U.' }}
              rotate={-2.5}
              fixing="pushpin"
              width="min(260px, 80%)"
              className="self-center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
