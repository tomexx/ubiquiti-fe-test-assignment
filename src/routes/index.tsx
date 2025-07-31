import { useDevices } from '@/api/queries/devices'
import { Device } from '@/api/types/device'
import { VirtualizedDevicesTable } from '@/components/features'
import { ContextualHeader } from '@/components/layout'
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
} from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

type ViewMode = 'table' | 'grid'

interface SearchSuggestion extends Device {
  highlightedName: string
}

function Home() {
  const { data, isLoading, error } = useDevices()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProductLines, setSelectedProductLines] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Get unique product lines from all devices
  const productLines = useMemo(() => {
    if (!data?.devices) return []
    const lines = Array.from(
      new Set(data.devices.map(device => device.line.name))
    ).sort()
    return lines
  }, [data?.devices])

  // Helper function to highlight matching text
  const highlightMatch = useCallback((text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi'
    )
    return text.replace(
      regex,
      '<mark class="font-bold underline bg-transparent">$1</mark>'
    )
  }, [])

  // First, filter by product lines
  const productLineFilteredDevices = useMemo(() => {
    if (!data?.devices) return []

    return selectedProductLines.length === 0
      ? data.devices
      : data.devices.filter(device =>
          selectedProductLines.includes(device.line.name)
        )
  }, [data?.devices, selectedProductLines])

  // Get search suggestions from already filtered devices
  const searchSuggestions = useMemo((): SearchSuggestion[] => {
    if (!productLineFilteredDevices || !searchTerm.trim()) return []

    const suggestions = productLineFilteredDevices
      .filter(device =>
        device.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 10) // Limit to 10 suggestions
      .map(device => ({
        ...device,
        highlightedName: highlightMatch(device.product.name, searchTerm),
      }))

    return suggestions
  }, [productLineFilteredDevices, searchTerm, highlightMatch])

  // Then apply search filter to the product line filtered results
  const filteredDevices = useMemo(() => {
    if (!productLineFilteredDevices) return []

    if (!searchTerm.trim()) return productLineFilteredDevices

    return productLineFilteredDevices.filter(device =>
      device.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [productLineFilteredDevices, searchTerm])

  const handleProductLineChange = (
    productLine: string,
    isSelected: boolean
  ) => {
    setSelectedProductLines(prev =>
      isSelected
        ? [...prev, productLine]
        : prev.filter(line => line !== productLine)
    )
  }

  const handleResetFilters = () => {
    setSelectedProductLines([])
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setShowSuggestions(value.trim().length > 0)
    setSelectedSuggestionIndex(-1)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchTerm(suggestion.product.name)
    setShowSuggestions(false)
    setSelectedSuggestionIndex(-1)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || searchSuggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestionIndex(prev =>
          prev < searchSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedSuggestionIndex >= 0) {
          const selectedSuggestion = searchSuggestions[selectedSuggestionIndex]
          if (selectedSuggestion) {
            handleSuggestionClick(selectedSuggestion)
          }
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        break
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isFilterActive = selectedProductLines.length > 0

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
      <div className='relative w-80'>
        <Input
          ref={searchInputRef}
          placeholder='Search devices by name...'
          value={searchTerm}
          onValueChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onFocus={() => setShowSuggestions(searchTerm.trim().length > 0)}
          className='w-full'
          size='sm'
          startContent={
            <svg
              className='w-4 h-4 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          }
        />

        {/* Search Suggestions Dropdown */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto'
          >
            {searchSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                  index === selectedSuggestionIndex
                    ? 'bg-blue-50 border-l-2 border-l-blue-500'
                    : 'hover:bg-gray-50'
                } ${
                  index !== searchSuggestions.length - 1
                    ? 'border-b border-gray-100'
                    : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className='text-sm text-gray-600 font-medium'>
                  {suggestion.line.name}
                </span>
                <span
                  className='text-sm'
                  dangerouslySetInnerHTML={{
                    __html: suggestion.highlightedName,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <span className='text-sm text-gray-600'>
        {isFilterActive && searchTerm
          ? `${filteredDevices.length} of ${productLineFilteredDevices.length} devices (${data.devices.length} total)`
          : isFilterActive
          ? `${productLineFilteredDevices.length} of ${data.devices.length} devices`
          : searchTerm
          ? `${filteredDevices.length} of ${data.devices.length} devices`
          : `${data.devices.length} devices`}
      </span>
    </div>
  )

  const rightContent = (
    <div className='flex items-center gap-2'>
      {/* View Toggle Buttons */}
      <div className='flex border border-gray-300 rounded-lg overflow-hidden'>
        <Button
          size='sm'
          variant={viewMode === 'table' ? 'solid' : 'light'}
          className='rounded-none border-0'
          onPress={() => setViewMode('table')}
        >
          Table
        </Button>
        <Button
          size='sm'
          variant={viewMode === 'grid' ? 'solid' : 'light'}
          className='rounded-none border-0'
          onPress={() => setViewMode('grid')}
        >
          Grid
        </Button>
      </div>

      {/* Filter Dropdown */}
      <Dropdown>
        <DropdownTrigger>
          <Button size='sm' variant='bordered'>
            Filter {isFilterActive && `(${selectedProductLines.length})`}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Product line filter'
          closeOnSelect={false}
          className='max-h-60'
          items={[
            ...productLines.map(line => ({ key: line, name: line })),
            { key: 'reset', name: 'Reset' },
          ]}
        >
          {item => {
            if (item.key === 'reset') {
              return (
                <DropdownItem
                  key='reset'
                  className='border-t border-gray-200 mt-1'
                >
                  <Button
                    size='sm'
                    variant='light'
                    onPress={handleResetFilters}
                    isDisabled={!isFilterActive}
                    className='w-full'
                  >
                    Reset
                  </Button>
                </DropdownItem>
              )
            }

            return (
              <DropdownItem
                key={item.key}
                className='p-0'
                textValue={item.name}
              >
                <Checkbox
                  isSelected={selectedProductLines.includes(item.name)}
                  onValueChange={isSelected =>
                    handleProductLineChange(item.name, isSelected)
                  }
                  className='w-full p-2'
                >
                  {item.name}
                </Checkbox>
              </DropdownItem>
            )
          }}
        </DropdownMenu>
      </Dropdown>
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
