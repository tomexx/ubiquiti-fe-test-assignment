import { Device } from '@/api/types/device'
import { ProductImage } from '@/components/common'
import { Spinner } from '@heroui/react'
import { UI_CONSTANTS } from '@/config'
import { useNavigate } from '@tanstack/react-router'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

interface DevicesTableProps {
  devices: Device[]
  isLoading?: boolean
}

export function DevicesTable({
  devices,
  isLoading = false,
}: DevicesTableProps) {
  const navigate = useNavigate()
  const parentRef = useRef<HTMLDivElement>(null)

  // Estimated row height - matching original HeroUI table row height
  const ESTIMATED_ROW_HEIGHT = UI_CONSTANTS.VIRTUAL_SCROLL.ESTIMATED_ROW_HEIGHT

  const virtualizer = useVirtualizer({
    count: devices.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: UI_CONSTANTS.VIRTUAL_SCROLL.OVERSCAN, // Render extra items outside the visible area
  })

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

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div className='w-full h-full px-2 sm:px-8'>
      {/* Table Header */}
      <div className='w-full border-separate border-spacing-0 sticky top-0 z-10 bg-white/50 backdrop-blur-xs'>
        <div className='flex border-b border-neutral-03'>
          <div className='w-1/2 px-2 py-2 text-sm font-bold text-neutral-10'>
            Product Line
          </div>
          <div className='w-1/2 px-2 py-2 text-sm font-bold text-neutral-10'>
            Name
          </div>
        </div>
      </div>

      {/* Virtualized Table Body */}
      <div
        ref={parentRef}
        className='h-full overflow-auto'
        style={{
          height: 'calc(100% - 40px)', // Account for header height
          padding: '4px', // Add padding to prevent focus outline clipping
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
            padding: '4px', // Add padding for focus outline space
          }}
        >
          {virtualItems.map(virtualItem => {
            const device = devices[virtualItem.index]
            if (!device) return null

            return (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div
                  className='flex items-center cursor-pointer hover:bg-neutral-01 transition-colors border-b border-neutral-03 h-full focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ublue-06 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-ublue-06 focus-visible:ring-offset-2'
                  onClick={() => handleRowAction(device.id)}
                  role='row'
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleRowAction(device.id)
                    }
                  }}
                >
                  {/* Product Line Cell */}
                  <div className='w-1/2 px-2 py-0.5'>
                    <div className='flex items-center gap-3'>
                      <div className='flex-shrink-0'>
                        <ProductImage
                          productId={device.id}
                          imageId={device.images.default}
                          size={UI_CONSTANTS.IMAGE_SIZES.THUMBNAIL}
                          alt={`${device.line.name} product line image`}
                        />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-sm text-neutral-10 truncate'>
                          {device.line.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Name Cell */}
                  <div className='w-1/2 px-2 py-0.5'>
                    <span className='text-sm text-neutral-08'>
                      {device.product.name}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
