import { memo } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

/**
 * The Pitch (SPEC §8 — "a soccer field element somewhere"). A top-down park
 * drawn in chalk, taped onto the kraft like a tactics sheet from the kit bag.
 * Mowed stripes underneath; every line draws itself in on scroll. Pure inline
 * SVG, on-brand: pitch-green panel, chalk-white markings, washi-tape corners.
 */

// House draw-in: lines paint left-to-right as the diagram scrolls into frame.
const draw = {
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: '-80px' },
} as const

const LINE = '#eef3ec'
const LW = 3.2

// memo'd so the globe's country-select state changes in App don't re-render the pitch.
export const SoccerField = memo(function SoccerField() {
  return (
    <section id="pitch" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <Reveal>
        <div>
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[8px] w-[8px] rounded-full bg-pitch" style={{ boxShadow: '0 0 0 3px rgba(30,122,70,0.18)' }} />
            The Park · 105 × 68
          </p>
          <h2 className="mt-3 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
            Marking Out
            <br className="hidden sm:block" /> The Pitch
          </h2>
        </div>
      </Reveal>

      <Reveal y={36} delay={0.05}>
        <div className="relative mt-9" style={{ transform: 'rotate(-0.5deg)' }}>
          <span className="washi tape-volt" style={{ top: '-16px', left: '6%', transform: 'rotate(-5deg)', zIndex: 20 }} />
          <span className="washi tape-ocean" style={{ top: '-16px', right: '7%', transform: 'rotate(6deg)', zIndex: 20 }} />

          <div
            className="relative overflow-hidden rounded-[14px] p-[14px] sm:p-6"
            style={{
              background: 'linear-gradient(180deg, #1f8049 0%, #186b3c 100%)',
              boxShadow: '0 28px 60px rgba(10,20,34,0.32), inset 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* mowed stripes */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 9%, transparent 9% 18%)',
              }}
            />
            {/* faint turf grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
              }}
            />

            <svg viewBox="0 0 1050 680" className="relative block w-full" role="img" aria-label="A top-down diagram of an association football pitch with all markings.">
              <g fill="none" stroke={LINE} strokeWidth={LW} strokeLinecap="round" strokeLinejoin="round">
                {/* touchlines + goal lines */}
                <motion.rect x="20" y="20" width="1010" height="640" rx="2" {...draw} transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }} />
                {/* halfway line */}
                <motion.line x1="525" y1="20" x2="525" y2="660" {...draw} transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.25 }} />
                {/* centre circle + spot */}
                <motion.circle cx="525" cy="340" r="91.5" {...draw} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.4 }} />
                <motion.circle cx="525" cy="340" r="3" fill={LINE} stroke="none" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.3, delay: 0.5 }} />

                {/* left penalty + goal area */}
                <motion.rect x="20" y="170" width="165" height="340" {...draw} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.55 }} />
                <motion.rect x="20" y="250" width="55" height="180" {...draw} transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.7 }} />
                <motion.circle cx="130" cy="340" r="3" fill={LINE} stroke="none" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.3, delay: 0.8 }} />
                {/* left D arc */}
                <motion.path d="M185 270 A 91.5 91.5 0 0 1 185 410" {...draw} transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.85 }} />

                {/* right penalty + goal area */}
                <motion.rect x="865" y="170" width="165" height="340" {...draw} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.55 }} />
                <motion.rect x="975" y="250" width="55" height="180" {...draw} transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.7 }} />
                <motion.circle cx="920" cy="340" r="3" fill={LINE} stroke="none" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.3, delay: 0.8 }} />
                {/* right D arc */}
                <motion.path d="M865 270 A 91.5 91.5 0 0 0 865 410" {...draw} transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.85 }} />

                {/* corner arcs */}
                <motion.path d="M20 32 A 12 12 0 0 1 32 20" {...draw} transition={{ duration: 0.4, delay: 0.95 }} />
                <motion.path d="M1018 20 A 12 12 0 0 1 1030 32" {...draw} transition={{ duration: 0.4, delay: 0.95 }} />
                <motion.path d="M32 660 A 12 12 0 0 1 20 648" {...draw} transition={{ duration: 0.4, delay: 0.95 }} />
                <motion.path d="M1030 648 A 12 12 0 0 1 1018 660" {...draw} transition={{ duration: 0.4, delay: 0.95 }} />

                {/* goals */}
                <motion.rect x="8" y="300" width="12" height="80" {...draw} transition={{ duration: 0.4, delay: 1.0 }} />
                <motion.rect x="1030" y="300" width="12" height="80" {...draw} transition={{ duration: 0.4, delay: 1.0 }} />
              </g>

              {/* the marker's one touch — a chalked No. 10 at the centre spot */}
              <motion.text
                x="560" y="318" fill="rgba(255,255,255,0.5)"
                style={{ font: '700 38px var(--font-marker)' }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 1.15 }}
              >
                10
              </motion.text>
            </svg>
          </div>

          <p className="mt-5 font-hand text-[24px] text-ink-faint" style={{ transform: 'rotate(-1.2deg)' }}>
            every story on this page started on one of these <span aria-hidden="true">⚽</span>
          </p>
        </div>
      </Reveal>
    </section>
  )
})
