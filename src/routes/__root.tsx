// src/routes/__root.tsx
/// <reference types="vite/client" />
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

import Header from '@/components/layout/Header'
import appCss from '@/styles/app.css?url'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  let router = useRouter()
  return (
    <RootDocument>
      <QueryClientProvider client={router.options.context.queryClient}>
        <HeroUIProvider
          navigate={(to, options) =>
            router.navigate({ to, ...(options || {}) })
          }
          useHref={to => router.buildLocation({ to }).href}
        >
          <ToastProvider />
          <Outlet />
        </HeroUIProvider>
      </QueryClientProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className='text-sm h-screen'>
        <div className='h-full flex flex-col'>
          <Header />
          <div className='flex-1 min-h-0'>{children}</div>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
