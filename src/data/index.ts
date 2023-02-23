export type FeatureSet = {
  allowed: string[]
  presets: string[]
}

export type DescriptiveItem = {
  name: string
  description: string
}

export interface RoguishFeat extends DescriptiveItem {
  id: string
  risks: string
}

export interface WeaponSkill extends DescriptiveItem {
  range: string[]
}

export interface PlaybookMove extends DescriptiveItem {
  playbook: string
  attributeModifiers: {
    charm: number
    cunning: number
    finesse: number
    luck: number
    might: number
    injury: number
  }
}

export type StatsKey = keyof Playbook['stats']

export type Playbook = {
  id: string
  name: string
  description: string
  details: string[]
  demeanor: string[]
  nature: DescriptiveItem[]
  drives: string[]
  background: {
    where: string[]
    why: string[]
    whom: string[]
  }
  stats: {
    charm: number
    cunning: number
    finesse: number
    luck: number
    might: number
  }
  roguishFeats: FeatureSet & { choose: number }
  weaponSkills: FeatureSet
  moves: FeatureSet
  equipment: {
    startValue: number
  }
}

export type PlaybookId =
  | 'arbiter'
  | 'adventurer'
  | 'harrier'
  | 'ranger'
  | 'ronin'
  | 'scoundrel'
  | 'thief'
  | 'tinker'
  | 'vagrant'
