import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repository below /john-portfolio/.
  base: '/john-portfolio/',
})
