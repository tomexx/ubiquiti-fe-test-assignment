import { useDevices } from '@/api/queries/devices'
import { ContextualHeader } from '@/components/layout'
import { Spinner } from '@heroui/react'
import { useState } from 'react'
import { useDeviceFilters } from '../../hooks/useDeviceFilters'
import { DeviceFilters } from './DeviceFilters'
import { DeviceSearch } from './DeviceSearch'
import { DeviceStats } from './DeviceStats'
import { ViewMode, ViewToggle } from './ViewToggle'
import { VirtualizedDevicesTable } from './VirtualizedDevicesTable'

export function DevicesPageContent() {
  const { data, isLoading, error } = useDevices()
  const [viewMode, setViewMode] = useState<ViewMode>('table')

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
  } = useDeviceFilters(data?.devices)

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
        <div className='flex-shrink-0 p-6 pb-4 bg-white border-b border-gray-200'>
          <h1 className='text-2xl font-bold mb-2'>Ubiquiti Devices</h1>
          <p className='text-sm text-gray-600'>Version: {data.version}</p>
        </div>

        <div className='flex-1 max-h-80 h-80'>
          {viewMode === 'table' ? (
            <VirtualizedDevicesTable
              devices={filteredDevices}
              isLoading={isLoading}
            />
          ) : (
            <div className='flex justify-center items-center h-full text-gray-500'>
              <p>Grid view - Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
