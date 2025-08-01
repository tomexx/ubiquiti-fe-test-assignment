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
      className={`focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ublue-06 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-ublue-06 focus-visible:ring-offset-2 rounded ${className}`}
    >
      <Button
        variant='light'
        size='sm'
        className='bg-white shadow-sm text-text-03 hover:text-text-03 hover:shadow-md transition-shadow focus:outline-none focus-visible:outline-none pointer-events-none'
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
