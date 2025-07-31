import { Button } from '@heroui/react'

export type ViewMode = 'table' | 'grid'

interface ViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className='flex border border-gray-300 rounded-lg overflow-hidden'>
      <Button
        size='sm'
        variant={viewMode === 'table' ? 'solid' : 'light'}
        className='rounded-none border-0'
        onPress={() => onViewModeChange('table')}
      >
        Table
      </Button>
      <Button
        size='sm'
        variant={viewMode === 'grid' ? 'solid' : 'light'}
        className='rounded-none border-0'
        onPress={() => onViewModeChange('grid')}
      >
        Grid
      </Button>
    </div>
  )
}
