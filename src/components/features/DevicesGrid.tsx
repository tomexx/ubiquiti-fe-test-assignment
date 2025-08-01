import type { Device } from '@/api/types/device'
import { EmptyState, LoadingState, ProductImage } from '@/components/common'
import { UI_CONSTANTS } from '@/config'
import { Card, CardBody } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { memo } from 'react'

interface DevicesGridProps {
  devices: Device[]
  isLoading?: boolean
}

interface DeviceGridItemProps {
  device: Device
}

const DeviceGridItem = memo(function DeviceGridItem({
  device,
}: DeviceGridItemProps) {
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
})

export const DevicesGrid = memo(function DevicesGrid({
  devices,
  isLoading,
}: DevicesGridProps) {
  if (isLoading) {
    return <LoadingState variant='grid-skeleton' />
  }

  if (!devices.length) {
    return <EmptyState message='No devices found' />
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
})
