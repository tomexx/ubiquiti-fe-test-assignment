import type { ComponentPropsWithoutRef } from 'react'

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  size?: number | string
  children: React.ReactNode
}

export function Icon({
  size = 24,
  children,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={`inline-block ${className}`}
      role='img'
      {...props}
    >
      {children}
    </svg>
  )
}
