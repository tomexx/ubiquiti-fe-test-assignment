import type { Device } from '@/api/types/device'
import { ProductImage } from '@/components/common'
import { Card, CardBody } from '@heroui/react'
import { Link } from '@tanstack/react-router'

interface DevicesGridProps {
  devices: Device[]
  isLoading?: boolean
}

interface DeviceGridItemProps {
  device: Device
}

function DeviceGridItem({ device }: DeviceGridItemProps) {
  const shortNamesText =
    device.shortnames?.length > 0 ? device.shortnames.join(', ') : ''

  return (
    <Card className='group hover:shadow-lg transition-shadow duration-200 relative'>
      <CardBody className='p-0'>
        <Link
          to='/device/$id'
          params={{ id: device.id }}
          className='block focus:outline-ublue-06 focus:outline-1 rounded-lg'
        >
          {/* Image container with overlay */}
          <div className='relative aspect-square overflow-hidden rounded-t-lg bg-gray-50'>
            <ProductImage
              productId={device.id}
              imageId={device.images.default}
              size={300}
              alt={device.product.name}
              className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-200'
            />

            {/* Product line overlay */}
            <div className='absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm'>
              {device.line.name}
            </div>
          </div>

          {/* Content section */}
          <div className='p-4'>
            <div className='space-y-1'>
              {/* Product name */}
              <h3 className='font-semibold text-sm leading-tight text-gray-900 overflow-hidden'>
                <span className='block overflow-hidden text-ellipsis whitespace-nowrap'>
                  {device.product.name}
                </span>
              </h3>

              {/* Short names */}
              {shortNamesText && (
                <p className='text-xs text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap'>
                  {shortNamesText}
                </p>
              )}
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  )
}

export function DevicesGrid({ devices, isLoading }: DevicesGridProps) {
  if (isLoading) {
    return (
      <div className='p-6'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className='animate-pulse'>
              <CardBody className='p-0'>
                <div className='aspect-square bg-gray-200 rounded-t-lg' />
                <div className='p-4 space-y-2'>
                  <div className='h-4 bg-gray-200 rounded' />
                  <div className='h-3 bg-gray-200 rounded w-3/4' />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!devices.length) {
    return (
      <div className='flex justify-center items-center h-64 text-gray-500'>
        <p>No devices found</p>
      </div>
    )
  }

  return (
    <div className='p-6 overflow-auto h-full'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {devices.map(device => (
          <DeviceGridItem key={device.id} device={device} />
        ))}
      </div>
    </div>
  )
}
