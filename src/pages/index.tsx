import { Link, LoaderFn, MakeGenerics } from '@tanstack/react-location'

import { getRepo, Repo } from '@/api'
import { PatternedHeading } from '@/components/patternedHeading'

type Route = MakeGenerics<{ LoaderData: Repo }>

export const loader: LoaderFn<Route> = () => {
  return getRepo('render')
}

export default function Home() {
  // const { data } = useMatch<Route>()

  return (
    <>
      <PatternedHeading w="1/3" text="Your Characters" />
      <p className="text-2xl opacity-50">You haven&rsquo;t made any characters yet</p>
      <Link to="/character/new" className="mt-6 bg-green-700 px-6 py-3 text-2xl text-white">
        Create New Character
      </Link>
    </>
  )
}
