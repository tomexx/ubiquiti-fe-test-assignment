interface DeviceStatsProps {
  totalDevices: number
  filteredDevices: number
  productLineFilteredDevices?: number
  searchTerm: string
  isFilterActive: boolean
}

export function DeviceStats({
  totalDevices,
  filteredDevices,
  productLineFilteredDevices,
  searchTerm,
  isFilterActive,
}: DeviceStatsProps) {
  const getStatsText = () => {
    if (isFilterActive && searchTerm) {
      return `${filteredDevices} of ${productLineFilteredDevices} devices (${totalDevices} total)`
    }
    if (isFilterActive) {
      return `${productLineFilteredDevices} of ${totalDevices} devices`
    }
    if (searchTerm) {
      return `${filteredDevices} of ${totalDevices} devices`
    }
    return `${totalDevices} devices`
  }

  return <span className='text-sm text-gray-04'>{getStatsText()}</span>
}
