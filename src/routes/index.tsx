import { useDevices } from '@/api/queries/devices'
import { VirtualizedDevicesTable } from '@/components/features'
import { Spinner } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data, isLoading, error } = useDevices()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-64 text-red-500'>
        <p>Failed to load devices: {error.message}</p>
      </div>
    )
  }

  if (!data?.devices?.length) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        <p>No devices found</p>
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-shrink-0 p-6 pb-4 bg-white border-b border-gray-200'>
        <h1 className='text-2xl font-bold mb-2'>Ubiquiti Devices</h1>
        <p className='text-sm text-gray-600'>Version: {data.version}</p>
      </div>

      <div className='flex-1 min-h-0'>
        <VirtualizedDevicesTable devices={data.devices} isLoading={isLoading} />
      </div>
    </div>
  )
}
