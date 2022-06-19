import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS(), VitePWA({
    srcDir: 'public',
    filename: 'sw.js',
    registerType: 'autoUpdate',
    build: {
      sourcemap: true
    },
    workbox: {
      cleanupOutdatedCaches: false,
      sourcemap: true
    },
    strategies: 'injectManifest',
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Notes',
        short_name: 'Notes',
        description: 'App for taking notes',
        theme_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
  })]
})
