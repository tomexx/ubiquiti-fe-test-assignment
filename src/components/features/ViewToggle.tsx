import { GridIcon, TableIcon } from '@/components/icons'
import { Button } from '@heroui/react'

export type ViewMode = 'table' | 'grid'

interface ViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className='flex gap-2'>
      <Button
        size='sm'
        variant='light'
        isIconOnly
        onPress={() => onViewModeChange('table')}
        aria-label='Switch to table view'
        className={
          viewMode === 'table'
            ? 'bg-neutral-02 text-blue-600'
            : 'text-neutral-08'
        }
      >
        <TableIcon className='w-[20px] h-[20px]' />
      </Button>
      <Button
        size='sm'
        variant='light'
        isIconOnly
        onPress={() => onViewModeChange('grid')}
        aria-label='Switch to grid view'
        className={
          viewMode === 'grid'
            ? 'bg-neutral-02 text-blue-600'
            : 'text-neutral-08'
        }
      >
        <GridIcon className='w-[20px] h-[20px]' />
      </Button>
    </div>
  )
}
