import { cn } from '@/lib/utils'

type NumberInputProps = {
  label?: string
  className?: string | string[]
  min?: number
  max?: number
}

export const NumberInput = ({ className, min, max }: NumberInputProps) => {
  return (
    <input
      type="number"
      min={min}
      max={max}
      className={cn('mb-1 border-b bg-transparent p-1 text-black outline-none', className)}
    ></input>
  )
}
