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
                className='p-0 py-2 pt-3 [&[data-hover=true]]:bg-transparent'
                textValue='Reset'
              >
                <a
                  href='#'
                  onClick={e => {
                    e.preventDefault()
                    if (isFilterActive) {
                      onResetFilters()
                    }
                  }}
                  className={`text-left text-sm ${
                    isFilterActive
                      ? 'text-destructive cursor-pointer'
                      : 'text-destructive/50 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  Reset
                </a>
              </DropdownItem>
            )
          }

          return (
            <DropdownItem
              key={item.key}
              className='p-0 py-0.5 [&[data-hover=true]]:bg-transparent '
              textValue={item.name}
            >
              <Checkbox
                size='sm'
                isSelected={selectedProductLines.includes(item.name)}
                onValueChange={isSelected =>
                  onProductLineChange(item.name, isSelected)
                }
                className='w-full p-1.5 text-sm'
                classNames={{
                  label: 'text-neutral-10',
                }}
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
