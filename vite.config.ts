import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBaseUrl = env.VITE_API_BASE_URL

  return {
    server: {
      port: 3000,
      ...(apiBaseUrl && {
        proxy: {
          '/api': {
            target: apiBaseUrl,
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            secure: true,
          },
        },
      }),
    },
    plugins: [
      tsConfigPaths(),
      tanstackStart({
        customViteReactPlugin: true,
        target: 'vercel',
      }),
      viteReact(),
      tailwindcss(),
      mkcert(),
    ],
  }
})
