import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // ... resto della configurazione PWA
    })
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      // ... resto della configurazione
    }
  }
})
