import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // build ke baad stats.html khulti hai — usme dikhta hai kaunsi library
    // bundle me kitni jagah le rahi hai. gzipSize actual transfer size hai.
    visualizer({ open: true, gzipSize: true, filename: 'stats.html' }),
  ],
})