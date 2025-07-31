import { Button } from '@heroui/react'

interface BackButtonProps {
  onBack: () => void
  label?: string
  className?: string
}

export function BackButton({
  onBack,
  label = 'Back',
  className = '',
}: BackButtonProps) {
  return (
    <Button
      variant='light'
      onPress={onBack}
      className={`text-gray-600 hover:text-gray-900 ${className}`}
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
  )
}
