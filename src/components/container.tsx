import { useMatch } from '@tanstack/react-location'

import { Header } from '@/components'

type Props = {
  children: JSX.Element
}

export const Container = ({ children }: Props) => {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-cream-100">
        <Header />
        <main className="flex flex-col items-center justify-center">{children}</main>
      </div>
    </>
  )
}
