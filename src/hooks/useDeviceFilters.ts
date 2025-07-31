import { Device } from '@/api/types/device'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useMemo, useState } from 'react'

interface UseDeviceFiltersOptions {
  initialSearch?: string
  initialProductLines?: string[]
}

export function useDeviceFilters(
  devices: Device[] | undefined,
  options: UseDeviceFiltersOptions = {}
) {
  const navigate = useNavigate()
  const { initialSearch = '', initialProductLines = [] } = options

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedProductLines, setSelectedProductLines] =
    useState<string[]>(initialProductLines)

  // Get unique product lines from all devices
  const productLines = useMemo(() => {
    if (!devices) return []
    const lines = Array.from(
      new Set(devices.map(device => device.line.name))
    ).sort()
    return lines
  }, [devices])

  // First, filter by product lines
  const productLineFilteredDevices = useMemo(() => {
    if (!devices) return []

    return selectedProductLines.length === 0
      ? devices
      : devices.filter(device =>
          selectedProductLines.includes(device.line.name)
        )
  }, [devices, selectedProductLines])

  // Then apply search filter to the product line filtered results
  const filteredDevices = useMemo(() => {
    if (!productLineFilteredDevices) return []

    if (!searchTerm.trim()) return productLineFilteredDevices

    return productLineFilteredDevices.filter(device =>
      device.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [productLineFilteredDevices, searchTerm])

  // Update URL when filters change
  const updateUrl = useCallback(
    (newSearchTerm: string, newProductLines: string[]) => {
      const searchParams: Record<string, string> = {}

      if (newSearchTerm.trim()) {
        searchParams.search = newSearchTerm.trim()
      }

      if (newProductLines.length > 0) {
        searchParams.productLines = newProductLines.join(',')
      }

      navigate({
        to: '/',
        search: searchParams,
        replace: true,
      })
    },
    [navigate]
  )

  const handleProductLineChange = (
    productLine: string,
    isSelected: boolean
  ) => {
    const newProductLines = isSelected
      ? [...selectedProductLines, productLine]
      : selectedProductLines.filter(line => line !== productLine)

    setSelectedProductLines(newProductLines)
    updateUrl(searchTerm, newProductLines)
  }

  const handleResetFilters = () => {
    setSelectedProductLines([])
    updateUrl(searchTerm, [])
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    updateUrl(value, selectedProductLines)
  }

  const isFilterActive = selectedProductLines.length > 0

  return {
    searchTerm,
    selectedProductLines,
    productLines,
    productLineFilteredDevices,
    filteredDevices,
    isFilterActive,
    handleProductLineChange,
    handleResetFilters,
    handleSearchChange,
  }
}
