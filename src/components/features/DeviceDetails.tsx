import type { Device } from '@/api/types/device'

interface DeviceDetailsProps {
  device: Device
  className?: string
}

interface DetailRowProps {
  label: string
  value: string | number | null | undefined
  className?: string
}

function DetailRow({ label, value, className = '' }: DetailRowProps) {
  const displayValue = value ?? 'n/a'

  return (
    <div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 ${className}`}
    >
      <span className='font-medium text-left mb-1 sm:mb-0'>{label}</span>
      <span className='text-left sm:text-right text-sm text-text-03'>
        {displayValue}
      </span>
    </div>
  )
}

export function DeviceDetails({ device, className = '' }: DeviceDetailsProps) {
  const shortNamesValue =
    device.shortnames?.length > 0 ? device.shortnames.join(', ') : undefined
  const numberOfPortsValue = device.unifi?.network?.numberOfPorts

  // Extract values from radios
  const radios = device.unifi?.network?.radios
  const radioEntries = radios ? Object.entries(radios) : []

  const maxPowerValue =
    radioEntries.length > 0
      ? Math.max(...radioEntries.map(([, radio]) => radio.maxPower))
      : undefined

  const speedValue =
    radioEntries.length > 0
      ? Math.max(
          ...radioEntries.map(([, radio]) => radio.maxSpeedMegabitsPerSecond)
        )
      : undefined

  return (
    <div className={`space-y-1 ${className}`}>
      <DetailRow label='Product Line' value={device.line.name} />
      <DetailRow label='ID' value={device.id} />
      <DetailRow label='Name' value={device.product.name} />
      <DetailRow label='Short Name' value={shortNamesValue} />
      <DetailRow label='Max. Power' value={`${maxPowerValue} W`} />
      <DetailRow label='Speed' value={`${speedValue} Mbps`} />
      <DetailRow label='Number of Ports' value={numberOfPortsValue} />
    </div>
  )
}
