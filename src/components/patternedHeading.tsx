import { cn } from '@/lib/utils'

type PatternedHeadingProps = {
  text: string
  // pattern?: string
  className?: string | string[]
}

export const PatternedHeading = ({ className, text }: PatternedHeadingProps) => {
  return (
    <div className={cn('pattern mb-8 w-full bg-repeat p-2 text-center text-white', className)}>
      <div className="border-4 border-white bg-black bg-opacity-20 py-3 px-6">
        <p className="text-4xl">{text}</p>
      </div>
    </div>
  )
}
