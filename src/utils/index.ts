import { API_BASE_URL } from '@/config'

export const getApiUrl = ({ path }: { path: string }) =>
  `${API_BASE_URL}${path}`

export const generateId = (prefix = 'id'): string =>
  `${prefix}-${Math.random().toString(36).substr(2, 9)}`
