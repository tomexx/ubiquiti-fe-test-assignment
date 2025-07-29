import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
