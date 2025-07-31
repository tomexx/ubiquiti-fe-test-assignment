export interface Device {
  id: string
  images: {
    default: string
    nopadding: string
    topology: string
  }
  line: {
    id: string
    name: string
  }
  product: {
    abbrev: string
    name: string
  }
  shortnames: string[]
  // Optional fields that may be available in future API versions
  maxPower?: string | number
  speed?: string | number
  numberOfPorts?: number
}

export interface Devices {
  devices: Device[]
  version: string
}
