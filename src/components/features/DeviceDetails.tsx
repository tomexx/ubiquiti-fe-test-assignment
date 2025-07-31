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
      <span className='font-medium text-left mb-1 sm:mb-0'>{label}:</span>
      <span className='text-left sm:text-right text-sm text-text-03'>
        {displayValue}
      </span>
    </div>
  )
}

export function DeviceDetails({ device, className = '' }: DeviceDetailsProps) {
  // Extract shortnames as a comma-separated string
  const shortNamesValue =
    device.shortnames?.length > 0 ? device.shortnames.join(', ') : undefined

  return (
    <div className={`space-y-1 ${className}`}>
      <DetailRow label='Product Line' value={device.line.name} />
      <DetailRow label='ID' value={device.id} />
      <DetailRow label='Name' value={device.product.name} />
      <DetailRow label='Short Name' value={shortNamesValue} />
      <DetailRow label='Max. Power' value={device.maxPower} />
      <DetailRow label='Speed' value={device.speed} />
      <DetailRow label='Number of Ports' value={device.numberOfPorts} />
    </div>
  )
}
