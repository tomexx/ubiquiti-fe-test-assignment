import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
} from "@heroui/react";

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <>
    <button
      type="button"
      onClick={() => {
        updateCount({ data: 1 }).then(() => {
          router.invalidate()
        })
      }}
    >
      Add 1 to {state}?
    </button>
    <Button>Press me</Button>
    <Dropdown>
        <DropdownTrigger>
          <Button>Open</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Navigation">
          <DropdownItem key="home" href="/home">
            Home
          </DropdownItem>
          <DropdownItem key="about" href="/about">
            About
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
