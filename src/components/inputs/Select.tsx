import { cn } from '@/lib/utils'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'

export interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  options: SelectOption[]
  className?: string
}

export const Select = ({ options, className }: SelectInputProps) => {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger
        className={cn(
          'inline-flex h-9 items-center justify-center rounded-md border border-black px-4 shadow-sm',
          className
        )}
      >
        <SelectPrimitive.Value placeholder="Select range..." />
        <SelectPrimitive.Icon>
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content>
          <SelectPrimitive.Viewport
            className={cn('rounded-md border border-black border-opacity-10 bg-white px-1 py-2 shadow-sm')}
          >
            {options.map((option) => {
              return (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn('flex h-6 items-center justify-center rounded-md hover:bg-blue-500 hover:text-white')}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              )
            })}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
