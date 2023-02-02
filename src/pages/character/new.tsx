import { PatternedHeading } from '@/components/patternedHeading'

export default function NewCharacter() {
  const classes = new Array(6).fill(1)

  return (
    <>
      <div className="container mx-auto flex flex-wrap items-center">
        {/* header part */}
        <div className="mx-auto flex w-2/3 flex-wrap justify-center border-b-2 border-black border-opacity-10">
          <p className="translate-y-1/2 bg-cream-100 px-6 py-2 text-center text-3xl">Pick a Playbook</p>
        </div>
        {/* class container */}
        <div className="-mx-4 mt-12 flex w-full flex-wrap">
          {classes.length > 0 &&
            classes.map((item, idx) => {
              return (
                <div className="w-1/2 p-4" key={idx}>
                  <div className="w-full">
                    <PatternedHeading w="full" text="The Arbiter" />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
