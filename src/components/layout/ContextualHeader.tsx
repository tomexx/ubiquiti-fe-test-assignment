import { ReactNode } from 'react'

interface ContextualHeaderProps {
  leftContent?: ReactNode
  rightContent?: ReactNode
  className?: string
}

export function ContextualHeader({
  leftContent,
  rightContent,
  className = '',
}: ContextualHeaderProps) {
  return (
    <div className={`w-full px-2 sm:px-8 py-4 ${className}`}>
      <div className='mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0'>
        <div className='flex items-center'>{leftContent}</div>
        <div className='flex items-center justify-end'>{rightContent}</div>
      </div>
    </div>
  )
}
