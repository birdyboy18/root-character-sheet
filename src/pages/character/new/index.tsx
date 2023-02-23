import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location'

import { Link } from '@/components'
import { PatternedHeading } from '@/components/patternedHeading'
import { StatCircle } from '@/components/statCircle'
import type { Playbook, StatsKey } from '@/data'
import playbooks from '@/data/playbooks.json'

type Route = MakeGenerics<{
  LoaderData: {
    playbooks: Playbook[]
  }
}>

export const Loader: LoaderFn<Route> = async () => {
  return {
    playbooks: Object.values(playbooks) ?? [],
  }
}

export default function NewCharacterIndex() {
  const {
    data: { playbooks },
  } = useMatch<Route>()
  const attributes: StatsKey[] = ['charm', 'cunning', 'finesse', 'luck', 'might']
  return (
    <>
      <div className="container mx-auto mt-8 mb-12 flex flex-wrap items-center">
        {/* header part */}
        <div className="mx-auto flex w-2/3 flex-wrap justify-center border-b-2 border-black border-opacity-10">
          <p className="translate-y-1/2 bg-cream-100 px-6 py-2 text-center text-3xl">Pick a Playbook</p>
        </div>
        {/* class container */}
        <div className="-mx-4 mt-12 flex w-full flex-wrap">
          {playbooks &&
            playbooks.length > 0 &&
            playbooks.map((playbook) => {
              return (
                <div className="w-1/2 p-4" key={playbook.id}>
                  <Link
                    to={playbook.id}
                    className="relative block h-full bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl"
                  >
                    <div className="w-full">
                      <PatternedHeading text={playbook.name} className="mb-0 rounded-t" />
                    </div>
                    <div className="w-full px-4 py-6">
                      <div className="mb-4 flex flex-wrap justify-between px-4">
                        {attributes.map((attr) => {
                          const value = playbook.stats[attr]
                          return <StatCircle name={attr} value={value} key={attr} />
                        })}
                      </div>
                      <p className="px-4 text-2xl leading-normal">{playbook.description}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
