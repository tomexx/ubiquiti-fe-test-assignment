import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { useState } from 'react'

interface DeviceFiltersProps {
  productLines: string[]
  selectedProductLines: string[]
  onProductLineChange: (productLine: string, isSelected: boolean) => void
  onResetFilters: () => void
}

export function DeviceFilters({
  productLines,
  selectedProductLines,
  onProductLineChange,
  onResetFilters,
}: DeviceFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isFilterActive = selectedProductLines.length > 0

  return (
    <Dropdown
      className='px-4 dropdown-small-radius'
      placement='bottom-end'
      onOpenChange={setIsOpen}
    >
      <DropdownTrigger>
        <Button
          size='sm'
          variant='light'
          radius='sm'
          className={`text-neutral-10 ${
            isOpen || isFilterActive ? 'text-ublue-06 bg-neutral-02' : ''
          }`}
        >
          Filter {isFilterActive && `(${selectedProductLines.length})`}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Product line filter'
        closeOnSelect={false}
        className='max-h-[60vh] overflow-y-auto p-1'
        items={[
          { key: 'label', name: 'Product Lines' },
          ...productLines.map(line => ({ key: line, name: line })),
          { key: 'reset', name: 'Reset' },
        ]}
      >
        {item => {
          if (item.key === 'label') {
            return (
              <DropdownItem
                key='label'
                className='p-0 py-2 cursor-default [&[data-hover=true]]:bg-transparent'
                textValue='Product Line'
                isReadOnly
              >
                <div className='text-sm font-semibold'>Product Line</div>
              </DropdownItem>
            )
          }

          if (item.key === 'reset') {
            return (
              <DropdownItem
                key='reset'
                className='p-0 py-2 pt-3 [&[data-hover=true]]:bg-transparent focus:outline-none focus-visible:outline-none [&[data-focus-visible=true]]:ring-2 [&[data-focus-visible=true]]:ring-ublue-06 [&[data-focus-visible=true]]:ring-offset-1'
                textValue='Reset'
                onAction={() => {
                  if (isFilterActive) {
                    onResetFilters()
                  }
                }}
              >
                <span
                  className={`text-left text-sm ${
                    isFilterActive
                      ? 'text-destructive cursor-pointer'
                      : 'text-destructive/50 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  Reset
                </span>
              </DropdownItem>
            )
          }

          return (
            <DropdownItem
              key={item.key}
              className='p-0 py-0.5 [&[data-hover=true]]:bg-transparent focus:outline-none focus-visible:outline-none [&[data-focus-visible=true]]:ring-2 [&[data-focus-visible=true]]:ring-ublue-06 [&[data-focus-visible=true]]:ring-offset-1'
              textValue={item.name}
              onAction={() => {
                const isCurrentlySelected = selectedProductLines.includes(
                  item.name
                )
                onProductLineChange(item.name, !isCurrentlySelected)
              }}
            >
              <Checkbox
                size='sm'
                isSelected={selectedProductLines.includes(item.name)}
                className='w-full p-1.5 text-sm pointer-events-none [&_*]:focus:outline-none [&_*]:focus:ring-0 [&_*]:focus-visible:outline-none'
                classNames={{
                  label: 'text-neutral-10',
                  wrapper:
                    '!outline-none !ring-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none',
                  base: '!outline-none focus:!outline-none focus-visible:!outline-none',
                }}
                tabIndex={-1}
              >
                {item.name}
              </Checkbox>
            </DropdownItem>
          )
        }}
      </DropdownMenu>
    </Dropdown>
  )
}
