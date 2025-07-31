import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'

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
  const isFilterActive = selectedProductLines.length > 0

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button size='sm' variant='bordered'>
          Filter {isFilterActive && `(${selectedProductLines.length})`}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Product line filter'
        closeOnSelect={false}
        className='max-h-60'
        items={[
          ...productLines.map(line => ({ key: line, name: line })),
          { key: 'reset', name: 'Reset' },
        ]}
      >
        {item => {
          if (item.key === 'reset') {
            return (
              <DropdownItem
                key='reset'
                className='border-t border-gray-200 mt-1'
              >
                <Button
                  size='sm'
                  variant='light'
                  onPress={onResetFilters}
                  isDisabled={!isFilterActive}
                  className='w-full'
                >
                  Reset
                </Button>
              </DropdownItem>
            )
          }

          return (
            <DropdownItem key={item.key} className='p-0' textValue={item.name}>
              <Checkbox
                isSelected={selectedProductLines.includes(item.name)}
                onValueChange={isSelected =>
                  onProductLineChange(item.name, isSelected)
                }
                className='w-full p-2'
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
