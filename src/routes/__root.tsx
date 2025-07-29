// src/routes/__root.tsx
/// <reference types="vite/client" />
import { HeroUIProvider } from '@heroui/react'
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

import Header from '@/components/layout/Header'
import appCss from '@/styles/app.css?url'

export const Route = createRootRoute({
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
      <HeroUIProvider
        navigate={(to, options) => router.navigate({ to, ...(options || {}) })}
        useHref={to => router.buildLocation({ to }).href}
      >
        <Outlet />
      </HeroUIProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className='text-sm'>
        <Header />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
