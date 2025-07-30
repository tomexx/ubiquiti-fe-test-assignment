import { API_BASE_URL } from '@/config'

export const getApiUrl = ({ path }: { path: string }) =>
  `${API_BASE_URL}${path}`
