import { Device } from '@/api/types/device'
import { ProductImage } from '@/components/common'
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import { useNavigate } from '@tanstack/react-router'

interface DevicesTableProps {
  devices: Device[]
  isLoading?: boolean
}

export function DevicesTable({
  devices,
  isLoading = false,
}: DevicesTableProps) {
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Spinner size='lg' />
      </div>
    )
  }

  const handleRowAction = (deviceId: string) => {
    navigate({
      to: '/device/$id',
      params: { id: deviceId },
    })
  }

  return (
    <div className='w-full h-full px-6'>
      <Table
        aria-label='Ubiquiti devices table'
        onRowAction={key => handleRowAction(key as string)}
        classNames={{
          table: 'min-h-[400px]',
          th: 'w-1/2',
        }}
      >
        <TableHeader>
          <TableColumn>Product Line</TableColumn>
          <TableColumn>Name</TableColumn>
        </TableHeader>
        <TableBody>
          {devices.map(device => (
            <TableRow
              key={device.id}
              className='cursor-pointer hover:bg-gray-50 transition-colors'
            >
              <TableCell>
                <div className='flex items-center gap-3'>
                  <div className='flex-shrink-0'>
                    <ProductImage
                      productId={device.id}
                      imageId={device.images.default}
                      size={32}
                      alt={`${device.line.name} product line image`}
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='font-mono text-sm font-medium text-gray-900 truncate'>
                      {device.line.name}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className='font-mono text-sm text-gray-500'>
                  {device.product.name}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
