import { create } from 'zustand'

interface CharacterStore {
  isEditing: boolean
  details: {
    name: string
    playbook: string
  }
  setIsEditing: (val: boolean) => void
}

export const useCharacterStore = create<CharacterStore>()((set) => ({
  isEditing: false,
  details: {
    name: '',
    playbook: '',
  },
  setIsEditing: (val: boolean) => set(() => ({ isEditing: val })),
}))
