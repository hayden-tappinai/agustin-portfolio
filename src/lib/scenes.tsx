import type { ReactElement } from 'react'
import type { PhotoScene } from '../types/country'

/**
 * Tasteful vector photo placeholders (SPEC §4.4) — layered SVG scenes drawn in
 * the brand palette, used inside Polaroids until Agustin's real photos arrive
 * from `photo-map.json`. Never a broken `<img>`. Each fills its 1:1 frame.
 */

const COMMON = {
  viewBox: '0 0 300 300',
  preserveAspectRatio: 'xMidYMid slice',
  width: '100%',
  height: '100%',
  style: { display: 'block' as const },
}

function Stadium() {
  return (
    <svg {...COMMON} aria-hidden role="img">
      <defs>
        <linearGradient id="sc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1422" />
          <stop offset="100%" stopColor="#1a2c45" />
        </linearGradient>
        <radialGradient id="sc-flood" cx="50%" cy="14%" r="70%">
          <stop offset="0%" stopColor="rgba(220,235,255,0.55)" />
          <stop offset="100%" stopColor="rgba(220,235,255,0)" />
        </radialGradient>
        <linearGradient id="sc-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c9456" />
          <stop offset="100%" stopColor="#176336" />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#sc-sky)" />
      <rect x="0" y="78" width="300" height="10" fill="#0c1727" />
      <rect x="0" y="86" width="300" height="64" fill="#0f1d31" />
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={i} cx={12 + i * 16} cy={104 + (i % 3) * 9} r="1.3" fill="rgba(235,241,236,0.5)" />
      ))}
      <rect x="44" y="20" width="3" height="40" fill="#26384f" />
      <circle cx="45.5" cy="20" r="6" fill="rgba(255,255,255,0.9)" />
      <rect x="252" y="20" width="3" height="40" fill="#26384f" />
      <circle cx="253.5" cy="20" r="6" fill="rgba(255,255,255,0.9)" />
      <ellipse cx="150" cy="150" rx="180" ry="60" fill="url(#sc-flood)" />
      <polygon points="0,150 300,150 300,300 0,300" fill="url(#sc-grass)" />
      <rect x="0" y="170" width="300" height="2" fill="rgba(255,255,255,0.05)" />
      <rect x="0" y="220" width="300" height="2" fill="rgba(255,255,255,0.05)" />
      <rect x="0" y="270" width="300" height="2" fill="rgba(255,255,255,0.05)" />
      <g stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" fill="none">
        <line x1="0" y1="150" x2="300" y2="150" />
        <ellipse cx="150" cy="150" rx="34" ry="11" />
        <line x1="150" y1="150" x2="150" y2="300" />
        <circle cx="150" cy="150" r="2" fill="rgba(255,255,255,0.85)" stroke="none" />
      </g>
    </svg>
  )
}

function Skyline() {
  return (
    <svg {...COMMON} aria-hidden role="img">
      <defs>
        <linearGradient id="sc-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2c47" />
          <stop offset="60%" stopColor="#3a4d6b" />
          <stop offset="100%" stopColor="#9a6a48" />
        </linearGradient>
        <radialGradient id="sc-sun" cx="74%" cy="70%" r="34%">
          <stop offset="0%" stopColor="rgba(244,233,192,0.85)" />
          <stop offset="100%" stopColor="rgba(244,233,192,0)" />
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill="url(#sc-dusk)" />
      <rect width="300" height="300" fill="url(#sc-sun)" />
      <circle cx="222" cy="210" r="20" fill="#f4d98a" opacity="0.8" />
      {[
        [10, 150, 34, 150, '#13243d'],
        [44, 110, 30, 190, '#1a2c47'],
        [74, 168, 26, 132, '#0f1f34'],
        [100, 92, 36, 208, '#1a2c47'],
        [136, 140, 24, 160, '#13243d'],
        [160, 116, 34, 184, '#1a2c47'],
        [194, 176, 28, 124, '#0f1f34'],
        [222, 132, 30, 168, '#13243d'],
        [252, 100, 38, 200, '#1a2c47'],
      ].map(([x, y, w, h, c], i) => (
        <g key={i}>
          <rect x={x as number} y={y as number} width={w as number} height={h as number} fill={c as string} />
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 2 }).map((_, col) => {
              const lit = (i + r + col) % 3 === 0
              return (
                <rect
                  key={`${r}-${col}`}
                  x={(x as number) + 5 + col * ((w as number) - 14) / 1}
                  y={(y as number) + 10 + r * 18}
                  width="5"
                  height="7"
                  fill={lit ? '#f4d98a' : 'rgba(255,255,255,0.06)'}
                />
              )
            }),
          )}
        </g>
      ))}
    </svg>
  )
}

function Pitch() {
  return (
    <svg {...COMMON} aria-hidden role="img">
      <defs>
        <linearGradient id="sc-pitch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e7a46" />
          <stop offset="100%" stopColor="#155c34" />
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#sc-pitch)" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={i * 50} y="0" width="25" height="300" fill="rgba(255,255,255,0.05)" />
      ))}
      <g stroke="rgba(255,255,255,0.85)" strokeWidth="2" fill="none">
        <rect x="24" y="24" width="252" height="252" />
        <line x1="24" y1="150" x2="276" y2="150" />
        <circle cx="150" cy="150" r="44" />
        <circle cx="150" cy="150" r="3" fill="rgba(255,255,255,0.85)" stroke="none" />
        <rect x="96" y="24" width="108" height="40" />
        <rect x="96" y="236" width="108" height="40" />
      </g>
    </svg>
  )
}

function Coast() {
  return (
    <svg {...COMMON} aria-hidden role="img">
      <defs>
        <linearGradient id="sc-csky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fc0e8" />
          <stop offset="100%" stopColor="#cfe6da" />
        </linearGradient>
        <linearGradient id="sc-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14598c" />
          <stop offset="100%" stopColor="#1c7fb0" />
        </linearGradient>
      </defs>
      <rect width="300" height="170" fill="url(#sc-csky)" />
      <radialGradient id="sc-csun" cx="78%" cy="26%" r="26%">
        <stop offset="0%" stopColor="rgba(255,247,214,0.95)" />
        <stop offset="100%" stopColor="rgba(255,247,214,0)" />
      </radialGradient>
      <rect width="300" height="170" fill="url(#sc-csun)" />
      <circle cx="234" cy="78" r="18" fill="#fff7d6" opacity="0.9" />
      <rect y="150" width="300" height="74" fill="url(#sc-sea)" />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1="0" y1={166 + i * 12} x2="300" y2={166 + i * 12} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      ))}
      <rect y="224" width="300" height="76" fill="#e7d3a4" />
      <rect y="224" width="300" height="76" fill="rgba(200,153,47,0.12)" />
      <circle cx="60" cy="260" r="2" fill="#1c1712" opacity="0.5" />
      <circle cx="120" cy="276" r="2.4" fill="#1c1712" opacity="0.5" />
      <circle cx="210" cy="252" r="2" fill="#1c1712" opacity="0.5" />
    </svg>
  )
}

function Street() {
  const facades = [
    [0, '#c0362c'],
    [60, '#c8992f'],
    [120, '#1e7a46'],
    [180, '#14598c'],
    [240, '#b5532a'],
  ] as const
  return (
    <svg {...COMMON} aria-hidden role="img">
      <rect width="300" height="300" fill="#e8d9b5" />
      <rect y="0" width="300" height="64" fill="#cbe0ea" />
      {facades.map(([x, c], i) => (
        <g key={i}>
          <rect x={x} y="48" width="60" height="252" fill={c} />
          <rect x={x} y="48" width="60" height="6" fill="rgba(0,0,0,0.18)" />
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 2 }).map((_, col) => (
              <rect
                key={`${r}-${col}`}
                x={x + 10 + col * 26}
                y={64 + r * 52}
                width="16"
                height="30"
                fill="#f2e8cf"
                stroke="#1c1712"
                strokeWidth="1"
                opacity="0.92"
              />
            )),
          )}
        </g>
      ))}
      <rect y="288" width="300" height="12" fill="#1c1712" opacity="0.18" />
    </svg>
  )
}

const SCENES: Record<PhotoScene, () => ReactElement> = {
  stadium: Stadium,
  skyline: Skyline,
  pitch: Pitch,
  coast: Coast,
  street: Street,
}

export function SceneArt({ scene }: { scene: PhotoScene }) {
  const Art = SCENES[scene] ?? Stadium
  return <Art />
}
