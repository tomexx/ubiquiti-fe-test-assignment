import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  const apiBaseUrl = env.VITE_API_BASE_URL
  const isDevelopment = mode === 'development'

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
            configure: (proxy, _options) => {
              proxy.on('error', (err, _req, _res) => {
                console.log('🚨 Proxy error:', err)
              })
              proxy.on('proxyReq', (proxyReq, req, _res) => {
                console.log('📤 Proxying request:', req.method, req.url, '→', proxyReq.path)
              })
              proxy.on('proxyRes', (proxyRes, req, _res) => {
                console.log('📥 Proxy response:', req.url, '→', proxyRes.statusCode)
              })
            },
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
