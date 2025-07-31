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
    <div className={`w-full px-8 py-4 ${className}`}>
      <div className='mx-auto flex items-center justify-between'>
        <div className='flex items-center'>{leftContent}</div>
        <div className='flex items-center'>{rightContent}</div>
      </div>
    </div>
  )
}
