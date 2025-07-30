import { api } from '@/api/client'
import { Devices } from '@/api/types/device'
import { getApiUrl } from '@/api/utils'

export const getDevices = async (): Promise<Devices> => {
  const url = getApiUrl({ path: '/fingerprint/ui/public.json' })
  return api.get(url)
}
