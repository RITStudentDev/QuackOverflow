import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/static/',
  plugins: [react()],
  build: {
    outDir: '../frontend_build',  // ensure it's outside /frontend
    emptyOutDir: true,
  },
})