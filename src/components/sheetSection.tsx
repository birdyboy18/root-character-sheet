import { cn } from '@/lib/utils'

interface SheetSectionProps {
  name?: string
  hint?: string
  children: JSX.Element
  className?: string | string[]
}

export const SheetSection = ({ name, children, className, hint }: SheetSectionProps) => {
  return (
    <div className={cn('mb-8 w-1/2 px-4', className)}>
      <div className="flex w-full flex-col shadow-lg">
        <div className="w-full rounded-t bg-slate-900 px-4 py-1 text-white">
          {name} {hint && <span className="ml-1 opacity-60">({hint})</span>}
        </div>
        {children}
      </div>
    </div>
  )
}
