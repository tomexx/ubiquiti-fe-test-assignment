import { useDevices } from '@/api/queries/devices'
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
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
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Ubiquiti Devices</h1>
      <p className='text-sm text-gray-600 mb-4'>Version: {data.version}</p>

      <Table aria-label='Ubiquiti devices table'>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Default Image</TableColumn>
          <TableColumn>No Padding Image</TableColumn>
          <TableColumn>Topology Image</TableColumn>
        </TableHeader>
        <TableBody>
          {data.devices.map(device => (
            <TableRow key={device.id}>
              <TableCell className='font-mono text-sm'>{device.id}</TableCell>
              <TableCell>
                {/* <Image
                  src={device.images.default}
                  alt={`${device.id} default`}
                  width={100}
                  height={60}
                  className='object-contain'
                /> */}
              </TableCell>
              <TableCell>
                {/* <Image
                  src={device.images.nopadding}
                  alt={`${device.id} no padding`}
                  width={100}
                  height={60}
                  className='object-contain'
                /> */}
              </TableCell>
              <TableCell>
                {/* <Image
                  src={device.images.topology}
                  alt={`${device.id} topology`}
                  width={100}
                  height={60}
                  className='object-contain'
                /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
