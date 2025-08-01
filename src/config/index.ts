// Use the proxy path for both development and production
export const API_BASE_URL = '/api'

// API Constants
export const API_CONSTANTS = {
  BASE_URLS: {
    STATIC: 'https://static.ui.com/fingerprint/ui/images',
    IMAGE_SERVICE: 'https://images.svc.ui.com/',
  },
  ENDPOINTS: {
    DEVICES: '/fingerprint/ui/public.json',
  },
} as const

// UI Constants
export const UI_CONSTANTS = {
  // Image sizes
  IMAGE_SIZES: {
    THUMBNAIL: 32,
    SMALL: 85,
    MEDIUM: 150,
    LARGE: 300,
  },

  // Grid breakpoints
  GRID_COLUMNS: {
    MOBILE: 2,
    TABLET: 3,
    DESKTOP: 4,
    LARGE: 5,
    XLARGE: 6,
  },

  // Virtual scrolling
  VIRTUAL_SCROLL: {
    ESTIMATED_ROW_HEIGHT: 48,
    OVERSCAN: 5,
  },

  // Search
  SEARCH: {
    INITIAL_SUGGESTIONS_LIMIT: 10,
    INTERSECTION_ROOT_MARGIN: '50px',
    INTERSECTION_THRESHOLD: 0.1,
  },

  // Animation durations
  ANIMATION: {
    FADE_DURATION: 200,
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  DEVICE_NOT_FOUND: (id: string) => `Device with ID "${id}" not found`,
  LOAD_DEVICES_FAILED: 'Failed to load devices',
  LOAD_DEVICE_FAILED: 'Failed to load device',
  CLIPBOARD_COPY_FAILED: 'Failed to copy to clipboard',
  HTTP_ERROR: (status: number) => `HTTP error! Status: ${status}`,
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  CLIPBOARD_COPIED: 'JSON copied to clipboard',
} as const
