import { getDevices } from '@/api/services/devices'
import { useQuery } from '@tanstack/react-query'

const QUERY_KEY = Symbol('devices')

export const useDevices = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getDevices,
  })
}
