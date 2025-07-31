import { getDevices } from '@/api/services/devices'
import { useQuery } from '@tanstack/react-query'

const DEVICES_QUERY_KEY = ['devices'] as const

export const useDevices = () => {
  return useQuery({
    queryKey: DEVICES_QUERY_KEY,
    queryFn: getDevices,
  })
}

export const useDevice = (id: string) => {
  return useQuery({
    queryKey: DEVICES_QUERY_KEY,
    queryFn: getDevices,
    enabled: !!id,
    select: data => {
      const device = data.devices.find(device => device.id === id)
      if (!device) {
        throw new Error(`Device with ID "${id}" not found`)
      }
      return device
    },
    staleTime: Infinity, // Data is considered fresh indefinitely since we're selecting from the same dataset
  })
}
