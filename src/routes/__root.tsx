// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { HeroUIProvider } from "@heroui/react";
import {useRouter} from '@tanstack/react-router';

import appCss from '../styles/app.css?url'

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
  let router = useRouter();
  return (
    <RootDocument>
      <HeroUIProvider
       navigate={(to, options) => router.navigate({to, ...(options || {})})}
       useHref={(to) => router.buildLocation({to}).href}
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
      <body>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
