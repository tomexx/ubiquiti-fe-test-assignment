import { Card, CardBody, Spinner } from '@heroui/react'

interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'grid-skeleton'
  size?: 'sm' | 'md' | 'lg'
  itemCount?: number
  className?: string
}

export function LoadingState({
  variant = 'spinner',
  size = 'lg',
  itemCount = 12,
  className = '',
}: LoadingStateProps) {
  if (variant === 'spinner') {
    return (
      <div className={`flex justify-center items-center h-64 ${className}`}>
        <Spinner size={size} />
      </div>
    )
  }

  if (variant === 'grid-skeleton') {
    return (
      <div className={`p-6 ${className}`}>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {Array.from({ length: itemCount }).map((_, i) => (
            <Card key={i} className='animate-pulse' shadow='none'>
              <CardBody className='p-0'>
                <div className='aspect-square bg-neutral-03 rounded-t-lg' />
                <div className='p-4 space-y-2'>
                  <div className='h-4 bg-neutral-03 rounded' />
                  <div className='h-3 bg-neutral-03 rounded w-3/4' />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`animate-pulse ${className}`}>
      <div className='h-4 bg-neutral-03 rounded mb-2' />
      <div className='h-4 bg-neutral-03 rounded w-3/4' />
    </div>
  )
}
