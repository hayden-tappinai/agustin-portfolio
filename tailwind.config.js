/** @type {import('tailwindcss').Config} */

// Mirror of the design tokens in src/index.css (:root) and the globe palette in
// src/lib/theme.ts. THREE materials read theme.ts; CSS/Tailwind components read
// these. One token set, three consumers, no ad-hoc hex in components.
// See design-system/SPEC.md §1–2, §7.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // paper / surface
        paper: '#f2e8cf',
        'paper-2': '#e8d9b5',
        'paper-edge': '#cdb789',
        'paper-line': '#c7b488',
        // ink / structure
        ink: '#1c1712',
        'ink-2': '#4a4034',
        'ink-faint': '#8a7e68',
        navy: '#0a1422',
        'navy-2': '#14233a',
        // fusion accents
        pitch: '#1e7a46',
        'globe-green': '#3ea96b',
        ocean: '#14598c',
        'stamp-red': '#c0362c',
        gold: '#c8992f',
        // electric — the single spark
        volt: '#cdff3d',
        'volt-deep': '#a6d400',
      },
      fontFamily: {
        display: ['Anton', '"Arial Narrow"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        marker: ['"Permanent Marker"', 'cursive'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        paper: '0 12px 26px rgba(58,42,18,0.18)',
        'paper-lg': '0 22px 48px rgba(58,42,18,0.18)',
        'paper-edge': '0 18px 40px rgba(58,42,18,0.18), 0 2px 0 #cdb789',
        board: '0 28px 60px rgba(10,20,34,0.45), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 0 1px rgba(110,227,160,0.06)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        thunk: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
        paper: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
        draw: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
}
