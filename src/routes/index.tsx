import { DevicesPageContent } from '@/components/features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <DevicesPageContent />
}
