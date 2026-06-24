/** @type {import('tailwindcss').Config} */

// Mirror of src/lib/theme.ts `palette` — keep both in sync. THREE materials read
// from theme.ts; CSS/Tailwind components read from these tokens. One palette,
// two consumers, no ad-hoc hex in components.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a1422',
        surface: '#0f1d30',
        ocean: '#14598c',
        atmosphere: '#5aa9e6',
        land: '#3ea96b',
        'land-hover': '#6fe3a0',
        stroke: '#1c3247',
        ink: '#eef4f2',
        muted: '#9bb0c2',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
