import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // react-globe.gl bundles three transitively; force a single physical copy so
  // we never hit "Multiple instances of Three.js" / a blank globe. The install
  // is already deduped, but @vitejs/plugin-react no longer auto-dedupes — pin it.
  resolve: { dedupe: ['three', 'three-globe'] },
})
