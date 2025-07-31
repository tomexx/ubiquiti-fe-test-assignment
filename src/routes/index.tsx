import { useDevices } from '@/api/queries/devices'
import { DeviceFilters } from '@/components/features/DeviceFilters'
import { DeviceSearch } from '@/components/features/DeviceSearch'
import { DeviceStats } from '@/components/features/DeviceStats'
import { DevicesGrid } from '@/components/features/DevicesGrid'
import { DevicesTable } from '@/components/features/DevicesTable'
import { ViewMode, ViewToggle } from '@/components/features/ViewToggle'
import { ContextualHeader } from '@/components/layout'
import { useDeviceFilters } from '@/hooks/useDeviceFilters'
import { Spinner } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

interface SearchParams {
  search?: string | undefined
  productLines?: string | undefined
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      search:
        typeof search.search === 'string' && search.search
          ? search.search
          : undefined,
      productLines:
        typeof search.productLines === 'string' && search.productLines
          ? search.productLines
          : undefined,
    }
  },
  component: Index,
})

export function Index() {
  const { data, isLoading, error } = useDevices()
  const { search, productLines: urlProductLinesString } = Route.useSearch()
  const [viewMode, setViewMode] = useState<ViewMode>('table')

  // Parse productLines from URL string
  const urlProductLines = urlProductLinesString
    ? urlProductLinesString.split(',').filter(Boolean)
    : []

  const {
    searchTerm,
    selectedProductLines,
    productLines,
    productLineFilteredDevices,
    filteredDevices,
    isFilterActive,
    handleProductLineChange,
    handleResetFilters,
    handleSearchChange,
  } = useDeviceFilters(data?.devices, {
    initialSearch: search || '',
    initialProductLines: urlProductLines,
  })

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

  const leftContent = (
    <div className='flex items-center gap-4'>
      <DeviceSearch
        devices={productLineFilteredDevices}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        className='w-80'
      />
      <DeviceStats
        totalDevices={data.devices.length}
        filteredDevices={filteredDevices.length}
        productLineFilteredDevices={productLineFilteredDevices.length}
        searchTerm={searchTerm}
        isFilterActive={isFilterActive}
      />
    </div>
  )

  const rightContent = (
    <div className='flex items-center gap-2'>
      <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      <DeviceFilters
        productLines={productLines}
        selectedProductLines={selectedProductLines}
        onProductLineChange={handleProductLineChange}
        onResetFilters={handleResetFilters}
      />
    </div>
  )

  return (
    <>
      <ContextualHeader leftContent={leftContent} rightContent={rightContent} />
      <div className='h-full flex flex-col'>
        <div className='flex-1 max-h-80 h-80'>
          {viewMode === 'table' ? (
            <DevicesTable devices={filteredDevices} isLoading={isLoading} />
          ) : (
            <DevicesGrid devices={filteredDevices} isLoading={isLoading} />
          )}
        </div>
      </div>
    </>
  )
}
