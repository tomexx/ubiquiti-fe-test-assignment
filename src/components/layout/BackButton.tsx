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
        size='sm'
        className='bg-white shadow-sm text-text-03 hover:text-text-03 hover:shadow-md transition-shadow'
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
