import { cn } from '@/lib/utils'

import equipmentTags from '../data/equipmentTags.json'
import weaponSkills from '../data/weaponSkills.json'

interface EquipmentManagerProps {
  value: number
  might: number
  equipment?: EquipmentItem[]
}

type WeaponRange = 'Intimate Range' | 'Close Range' | 'Far Range'

type WeaponMoveKey = keyof typeof weaponSkills
type EquipmentTagKey = keyof typeof equipmentTags

interface EquipmentItem {
  name: string
  wear: number
  currentWear: number
  weaponMoveTags: WeaponMoveKey[]
  equipmentTags: EquipmentTagKey[]
  range: WeaponRange[]
  load: number
}

interface EquipmentItemProps {
  equipment: EquipmentItem
}

const plateArmour: EquipmentItem = {
  name: 'Plate Armour',
  wear: 4,
  currentWear: 0,
  weaponMoveTags: [],
  equipmentTags: ['arrow-proof', 'cumbersome', 'weighty'],
  range: [],
  load: 2,
}

const greatSword: EquipmentItem = {
  name: 'Greatsword',
  wear: 4,
  currentWear: 0,
  weaponMoveTags: ['cleave'],
  equipmentTags: ['sharp', 'large', 'bulky', 'eaglecraft'],
  range: ['Close Range'],
  load: 2,
}

const calculateEquipmentValue = (equipment: EquipmentItem) => {
  let value = equipment.wear + equipment.weaponMoveTags.length
  const positiveSkills = equipment.equipmentTags.filter((tagId) => {
    const skill = equipmentTags[tagId]
    return skill.positive
  })
  const negativeSkills = equipment.equipmentTags.filter((tagId) => {
    const skill = equipmentTags[tagId]
    return !skill.positive
  })
  value = value + (positiveSkills.length - negativeSkills.length)
  if (equipment.range.length > 1) {
    value = value + (equipment.range.length - 1)
  }
  return value
}

const EquipmentItem = ({ equipment }: EquipmentItemProps) => {
  const wearArray = new Array(equipment.wear).fill(0)
  const value = calculateEquipmentValue(equipment)
  return (
    <div className="h-full w-full rounded-sm border p-4">
      {/* wear + value + load */}
      <div className="flex w-full flex-wrap items-center">
        <p className="mr-4 text-xl">{equipment.name}</p>
        <div>
          {wearArray.map((_, index) => {
            return <input type="checkbox" className="mr-2" key={index} />
          })}
        </div>
        <div className="mr-2 border-l-2 pl-2">Value: {value}</div>
        <div className="border-l-2 pl-2">Load: {equipment.load}</div>
      </div>
      {/* range + weapon skills */}
      {(equipment.range || equipment.weaponMoveTags) && (
        <div className="flex w-full flex-wrap items-center py-1">
          {equipment.range.length > 0 && (
            <div className={cn('flex flex-wrap items-center')}>
              <span className="mr-2">Range</span>
              {equipment.range.map((range) => {
                return (
                  <span className={cn('mr-2 rounded-md bg-zinc-800 py-1 px-4 text-xs text-white')} key={range}>
                    {range}
                  </span>
                )
              })}
            </div>
          )}
          {equipment.weaponMoveTags.length > 0 && (
            <div className={cn('flex flex-wrap items-center', { 'ml-2': equipment.range.length > 0 })}>
              <span className="mr-2">Weapon Skills</span>
              {equipment.weaponMoveTags.map((moveId) => {
                const skill = weaponSkills[moveId]
                return (
                  <span className={cn('mr-2 rounded-md bg-zinc-800 py-1 px-4 text-xs text-white')} key={moveId}>
                    {skill.name}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      )}
      {/* equipment tags */}
      {equipment.equipmentTags.length > 0 && (
        <div className="flex w-full flex-wrap items-center">
          <div className="mt-1">
            {equipment.equipmentTags.map((tagId) => {
              const tag = equipmentTags[tagId]
              return (
                <span
                  className={cn('mr-2 rounded-full px-4 py-1 text-sm text-white', {
                    'bg-lime-700': tag.positive,
                    'bg-red-800': !tag.positive,
                  })}
                  key={tagId}
                >
                  {tag.name}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export const EquipmentManager = ({ value, might }: EquipmentManagerProps) => {
  const maxCapacity = 4 + might
  const equipment: EquipmentItem[] = [plateArmour, greatSword]
  const capacity = equipment.reduce((total, item) => {
    return total + item.load
  }, 0)

  return (
    <div>
      <div className="flex flex-wrap items-center border-b-2 pb-2 text-lg">
        <p className="mr-4 px-2">Value: {value}</p>
        <p className="px-2">
          Carrying: {capacity}/{maxCapacity}
        </p>
      </div>
      <div className="flex flex-wrap py-2">
        {equipment &&
          equipment.map((item) => {
            return (
              <div key={item.name} className="w-1/2 p-4">
                <EquipmentItem equipment={item} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
