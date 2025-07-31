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
}

export interface Devices {
  devices: Device[]
  version: string
}
