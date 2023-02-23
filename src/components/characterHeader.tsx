import { useEffect } from 'react'

import { useCharacterStore } from '@/stores/characterStore'

import { TextInput } from './inputs'

type CharacterHeaderProps = {
  playbook: string
}

export const CharacterHeader = ({ playbook }: CharacterHeaderProps) => {
  const isEditing = useCharacterStore((state) => state.isEditing)
  const name = useCharacterStore((state) => state.details.name)
  const setIsEditing = useCharacterStore((state) => state.setIsEditing)

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <header className="flex w-full items-center justify-between bg-green-900 py-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-white">
        <div className="flex flex-wrap items-center">
          <div className="mr-3">
            <img src="/assets/profiles/goshawk.jpeg" alt="" width="80" height="80" className="rounded-full" />
          </div>
          <div>
            {!isEditing && <h1 className="text-2xl">{name}</h1>}
            {isEditing && <TextInput placeholder="Your Character Name" className="text-3xl" />}
            <p className="text-lg">{playbook}</p>
          </div>
        </div>
        {/* actions area */}
        <div>
          {!isEditing && (
            <button
              className="border-2 border-white bg-transparent py-1 px-4 hover:bg-white hover:text-gray-800"
              onClick={() => toggleEdit()}
            >
              Edit
            </button>
          )}
          {isEditing && (
            <button
              className="border-2 border-white bg-transparent py-1 px-4 hover:bg-white hover:text-gray-800"
              onClick={() => toggleEdit()}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
