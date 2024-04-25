import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    external: ['@prisma/client', '@prisma/adapter-d1'],
  },
  build: {
    minify: true,
    outDir: './pages',
  },
  plugins: [react()],
})
