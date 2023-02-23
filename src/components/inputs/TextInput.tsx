import { cn } from '@/lib/utils'

type TextInputProps = {
  placeholder?: string
  label?: string
  className?: string | string[]
}

export const TextInput = ({ placeholder, className }: TextInputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={cn('mb-1 border-b border-b-white bg-transparent p-1 text-white outline-none', className)}
    ></input>
  )
}
