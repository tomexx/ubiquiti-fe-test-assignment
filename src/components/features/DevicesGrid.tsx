import type { Device } from '@/api/types/device'
import { ProductImage } from '@/components/common'
import { UI_CONSTANTS } from '@/config'
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
    <Link
      to='/device/$id'
      params={{ id: device.id }}
      className='block focus:outline-2 focus:outline-offset-2 focus:outline-[#006fff] rounded-lg'
    >
      <Card
        className='group relative border-1 border-neutral-03 bg-white hover:bg-neutral-01 h-full transition-colors'
        shadow='none'
      >
        <CardBody className='p-0'>
          {/* Image container with overlay */}
          <div className='relative aspect-video overflow-hidden rounded-t-lg bg-neutral-01 group-hover:bg-neutral-02 transition-colors flex items-center justify-center'>
            <ProductImage
              productId={device.id}
              imageId={device.images.default}
              size={UI_CONSTANTS.IMAGE_SIZES.SMALL}
              alt={device.product.name}
              className='w-full h-full object-contain'
            />

            {/* Product line overlay */}
            <div className='absolute top-[3px] right-[3px] bg-white text-ublue-06 text-xs px-2 py-1 rounded-md z-10'>
              {device.line.name}
            </div>
          </div>

          {/* Content section */}
          <div className='p-4'>
            <div className='space-y-1'>
              {/* Product name */}
              <h3 className='text-sm leading-tight overflow-hidden h-8 flex items-start'>
                <span className='block overflow-hidden line-clamp-2'>
                  {device.product.name}
                </span>
              </h3>

              {/* Short names */}
              {shortNamesText && (
                <p className='text-xs text-text-03 overflow-hidden text-ellipsis whitespace-nowrap'>
                  {shortNamesText}
                </p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

export function DevicesGrid({ devices, isLoading }: DevicesGridProps) {
  if (isLoading) {
    return (
      <div className='p-6'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className='animate-pulse' shadow='none'>
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
