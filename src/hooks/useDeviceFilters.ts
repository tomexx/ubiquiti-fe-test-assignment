import { Device } from '@/api/types/device'
import { useMemo, useState } from 'react'

export function useDeviceFilters(devices: Device[] | undefined) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProductLines, setSelectedProductLines] = useState<string[]>([])

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
