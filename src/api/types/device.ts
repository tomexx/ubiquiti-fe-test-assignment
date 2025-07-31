export interface RadioSpec {
  gain: number
  maxPower: number
  maxSpeedMegabitsPerSecond: number
}

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
  unifi: {
    network: {
      numberOfPorts: number
      radios: Record<string, RadioSpec>
    }
  }
}

export interface Devices {
  devices: Device[]
  version: string
}
