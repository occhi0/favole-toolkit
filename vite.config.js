import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/favole-toolkit/', // 👈 AGGIUNGI QUESTA RIGA
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
