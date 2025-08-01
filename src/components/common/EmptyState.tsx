interface EmptyStateProps {
  message: string
  className?: string
  icon?: React.ReactNode
}

export function EmptyState({ message, className = '', icon }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center h-64 text-neutral-08 ${className}`}
    >
      {icon && <div className='mb-2'>{icon}</div>}
      <p>{message}</p>
    </div>
  )
}
