import { Link } from '@/components'
import { useAuth } from '@/context'

export const Header = () => {
  const auth = useAuth()

  return (
    <header className="flex w-full items-center justify-between bg-slate-900 py-2">
      <div className="container mx-auto flex flex-wrap justify-between text-white">
        <Link to="/">Root Character Sheet</Link>
        <ul className="flex flex-wrap space-x-4">
          <li>
            <Link to="/about">About</Link>
          </li>
          {/* make a dropdown to import multiple things */}
          <li>
            <Link to="/import">Import</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
