import { useEffect, useState } from 'react'

import { cn, toTitleCase } from '@/lib/utils'

type StatCircleProps = {
  name: string
  value: number
  sentenceCase?: boolean
  className?: string | string[]
  isEditing?: boolean
  onChange?: (data: { key: string; value: number }) => void
}

const btnClasses =
  'mb-2 flex aspect-square items-center justify-center rounded bg-slate-700 text-xl text-white cursor-pointer hover:bg-slate-900'

export const StatCircle = ({
  name,
  value: initialValue,
  sentenceCase,
  className,
  isEditing,
  onChange,
}: StatCircleProps) => {
  const [value, setValue] = useState(initialValue)
  const increment = (amount: number) => {
    setValue((state) => {
      return state + amount
    })
  }

  useEffect(() => {
    if (onChange) {
      onChange({
        key: name,
        value,
      })
    }
  }, [value])
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {isEditing && (
          <span
            className={btnClasses}
            onClick={() => {
              increment(1)
            }}
          >
            +
          </span>
        )}
        <div
          className={cn(
            'mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-cream-100 font-mono text-2xl',
            className
          )}
        >
          {value}
        </div>
        {isEditing && (
          <span
            className={btnClasses}
            onClick={() => {
              increment(-1)
            }}
          >
            -
          </span>
        )}
      </div>
      <span className={cn('text-xl', { 'mt-2': isEditing })}>{sentenceCase ? toTitleCase(name) : name}</span>
    </div>
  )
}
