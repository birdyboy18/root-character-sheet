import { MakeGenerics, useMatch } from '@tanstack/react-location'

type Page = MakeGenerics<{ Params: { id: string } }>

export default function EditCharacter() {
  const { params } = useMatch<Page>()
  return (
    <>
      <p>Edit character {params.id}</p>
    </>
  )
}
