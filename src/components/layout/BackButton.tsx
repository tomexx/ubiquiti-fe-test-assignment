import { Button } from '@heroui/react'
import { Link } from '@tanstack/react-router'

interface BackButtonProps {
  to?: string
  label?: string
  className?: string
}

export function BackButton({
  to = '/',
  label = 'Back',
  className = '',
}: BackButtonProps) {
  return (
    <Link
      to={to}
      className={`focus:outline-ublue-06 focus:outline-1 ${className}`}
    >
      <Button
        variant='light'
        className='text-gray-600 hover:text-gray-900'
        startContent={
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        }
      >
        {label}
      </Button>
    </Link>
  )
}
