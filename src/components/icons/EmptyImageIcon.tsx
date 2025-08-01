import { Icon } from './Icon'

interface EmptyImageIconProps {
  size?: number | string
  className?: string
}

export function EmptyImageIcon({ size = 24, className }: EmptyImageIconProps) {
  return (
    <Icon size={size} className={`text-neutral-300 ${className || ''}`}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4 4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H4zm16 2H4v8l4-4 4 4 4-4 4 4V6zm0 12H4v-2l4-4 4 4 4-4 4 4v2z'
      />
      <circle cx='8.5' cy='8.5' r='1.5' />
    </Icon>
  )
}
