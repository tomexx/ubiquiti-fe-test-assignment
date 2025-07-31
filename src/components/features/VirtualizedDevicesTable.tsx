import { Device } from '@/api/types/device'
import { ProductImage } from '@/components/common'
import { Spinner } from '@heroui/react'
import { useNavigate } from '@tanstack/react-router'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

interface VirtualizedDevicesTableProps {
  devices: Device[]
  isLoading?: boolean
}

const columnHelper = createColumnHelper<Device>()

const columns = [
  columnHelper.accessor('id', {
    id: 'image',
    header: '',
    cell: info => (
      <div className='size-[22px] flex items-center justify-center'>
        <ProductImage
          productId={info.getValue()}
          imageId={info.row.original.images.default}
          size={22}
          alt=''
        />
      </div>
    ),
    size: 36,
  }),
  columnHelper.accessor('id', {
    id: 'productLine',
    header: 'Product Line',
    cell: info => <span className='font-mono text-sm'>{info.getValue()}</span>,
  }),
  columnHelper.accessor('id', {
    id: 'name',
    header: 'Name',
    cell: info => <span className='font-mono text-sm'>{info.getValue()}</span>,
  }),
]

export function VirtualizedDevicesTable({
  devices,
  isLoading = false,
}: VirtualizedDevicesTableProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const table = useReactTable({
    data: devices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Estimated row height
    overscan: 10,
  })

  const items = virtualizer.getVirtualItems()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Spinner size='lg' />
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col px-6'>
      {/* Table Header */}
      <div className='bg-gray-50 border-b border-gray-200 flex-shrink-0'>
        {table.getHeaderGroups().map(headerGroup => (
          <div key={headerGroup.id} className='flex'>
            {headerGroup.headers.map(header => (
              <div
                key={header.id}
                className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0'
                style={{ width: header.getSize() }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Virtual Table Body */}
      <div
        ref={parentRef}
        className='overflow-auto flex-1'
        style={{ height: '100%' }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {items.map(virtualItem => {
            const row = rows[virtualItem.index]
            if (!row) return null

            return (
              <div
                key={row.id}
                className='absolute top-0 left-0 w-full flex items-center border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer'
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onClick={() =>
                  navigate({
                    to: '/device/$id',
                    params: { id: row.original.id },
                  })
                }
              >
                {row.getVisibleCells().map(cell => (
                  <div
                    key={cell.id}
                    className='px-4 py-3 border-r border-gray-200 last:border-r-0 flex items-center'
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Table Footer with Row Count */}
      <div className='bg-gray-50 border-t border-gray-200 px-4 py-3 flex-shrink-0 mb-6'>
        <div className='text-sm text-gray-500'>
          Showing {devices.length} devices
        </div>
      </div>
    </div>
  )
}
