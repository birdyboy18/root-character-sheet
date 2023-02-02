type PatternedHeadingProps = {
  text: string
  w: string
  // pattern?: string
}

export const PatternedHeading = ({ w: width, text }: PatternedHeadingProps) => {
  return (
    <div className={`pattern mb-8 bg-repeat p-2 text-center text-white w-${width}`}>
      <div className="border-4 border-white bg-black bg-opacity-20 py-3 px-6">
        <p className="text-4xl">{text}</p>
      </div>
    </div>
  )
}
