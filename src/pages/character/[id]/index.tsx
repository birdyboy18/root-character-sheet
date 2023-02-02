import { MakeGenerics, useMatch, useNavigate } from '@tanstack/react-location'

type Page = MakeGenerics<{ Params: { id: string } }>

export default function GetCharacter() {
  const { params } = useMatch<Page>()

  return (
    <>
      <p>Get character from url: {params.id}</p>
    </>
  )
}
