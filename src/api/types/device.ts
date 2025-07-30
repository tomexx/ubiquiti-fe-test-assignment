export interface Device {
  id: string
  images: {
    default: string
    nopadding: string
    topology: string
  }
}

export interface Devices {
  devices: Device[]
  version: string
}
