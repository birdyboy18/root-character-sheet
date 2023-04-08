import { useState } from 'react'

import { cn } from '@/lib/utils'

const notorietyStepCount = 3
const prestigeStepCount = 5

const notorietySteps = new Array(notorietyStepCount).fill(0)
const notorietyLevels = [3, 2, 1]

const prestigeSteps = new Array(prestigeStepCount).fill(0)
const prestigeLevels = [1, 2, 3]

interface ReputationManagerRowProps {
  faction: FactionReputation
  onChange?: (faction: FactionReputation) => void
}

interface FactionReputation {
  id: string
  name: string
  level: number
  prestigeLevel: number
  prestigeCount: number
  notorietyLevel: number
  notorietyCount: number
}

interface FactionCountAndLevels {
  prestigeLevel: number
  prestigeCount: number
  notorietyLevel: number
  notorietyCount: number
}

// const factions = ['Marquisate', 'Eyrie Dynasty', 'Woodland Alliance', 'Lizard Cult', 'Riverfolk Company', 'Denizens']

const factionsState: FactionReputation[] = [
  {
    id: 'marquisate',
    name: 'Marquisate',
    level: 0,
    prestigeLevel: 0,
    prestigeCount: 0,
    notorietyLevel: 0,
    notorietyCount: 0,
  },
  {
    id: 'eyrie-dynasty',
    name: 'Eyrie Dynasty',
    level: 0,
    prestigeLevel: 0,
    prestigeCount: 0,
    notorietyLevel: 0,
    notorietyCount: 0,
  },
  {
    id: 'woodland-alliance',
    name: 'Woodland Alliance',
    level: 0,
    prestigeLevel: 0,
    prestigeCount: 0,
    notorietyLevel: 0,
    notorietyCount: 0,
  },
]

// next emit an event from the checkbox noting it's index nad faction to lift state back up

const ReputationManagerRow = ({ faction, onChange }: ReputationManagerRowProps) => {
  // const notorietyThreshold = faction.level < 0 ? (faction.level * -1 + 1) * notorietyStepCount : notorietyStepCount
  // const prestigeThreshold = faction.level > 0 ? (faction.level + 1) * prestigeStepCount : prestigeStepCount
  const notorietyThreshold =
    faction.notorietyLevel < 0 ? (faction.notorietyLevel * -1 + 1) * notorietyStepCount : notorietyStepCount
  const prestigeThreshold =
    faction.prestigeLevel > 0 ? (faction.prestigeLevel + 1) * prestigeStepCount : prestigeStepCount

  // make this a recursive function that will keep calculating until correct levels and thresholds are balanced
  const calculateReputationLevels = (
    notorietyLevel: number,
    prestigeLevel: number,
    notorietyCount: number,
    prestigeCount: number
  ): FactionCountAndLevels => {
    const notorietyThreshold = notorietyLevel < 0 ? (notorietyLevel * -1 + 1) * notorietyStepCount : notorietyStepCount
    const prestigeThreshold = prestigeLevel > 0 ? (prestigeLevel + 1) * prestigeStepCount : prestigeStepCount

    if (prestigeCount >= prestigeThreshold || notorietyCount >= notorietyThreshold) {
      // handles left over values from our count into the threshold
      const newNotoriety = notorietyCount % notorietyThreshold
      const newPrestige = prestigeCount % prestigeThreshold
      const notorietyLevel = Math.floor(notorietyCount / notorietyStepCount) * -1
      const prestigeLevel = Math.floor(prestigeCount / prestigeStepCount)

      return calculateReputationLevels(notorietyLevel, prestigeLevel, newNotoriety, newPrestige)
    } else {
      return {
        notorietyLevel,
        prestigeLevel,
        notorietyCount,
        prestigeCount,
      }
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    const name = e.target.name
    const checked = e.target.checked

    let newValue = value

    if (checked) {
      newValue = value
    }
    if (!checked && value !== 0) {
      newValue = value - 1
    }

    const prestigeCount = name === 'prestigeCount' ? newValue : faction.prestigeCount
    const notorietyCount = name === 'notorietyCount' ? newValue : faction.notorietyCount

    // Could never get this logic to work automatically like I wanted to. Have choose o only do this stuff manually and revist it at a later date
    // const newLevels = calculateReputationLevels(
    //   faction.notorietyLevel,
    //   faction.prestigeLevel,
    //   notorietyCount,
    //   prestigeCount
    // )

    if (onChange) {
      onChange({
        ...faction,
        prestigeCount,
        notorietyCount,
      })
    }
  }

  const handleLevelChange = ({ level, key }: { level: number; key: 'notorietyLevel' | 'prestigeLevel' }) => {
    if (onChange) {
      onChange({
        ...(faction as FactionReputation),
        [key]: faction[key] === level ? 0 : level,
      })
    }
  }

  return (
    <div className="flex w-full flex-wrap items-center" key={faction.id}>
      <div className="flex w-1/2 flex-wrap items-center pr-4">
        <div className="w-1/3 text-lg">
          {faction.name} <span className="pl-2 text-xl opacity-40">({faction.level})</span>
        </div>
        <div className="w-2/3">
          <div className="flex w-full flex-wrap">
            {notorietyLevels.map((level) => {
              return (
                <div className="flex w-1/3 flex-wrap items-center justify-between px-6 text-lg" key={`level-${level}`}>
                  <p
                    className={cn('flex h-6 w-6 cursor-pointer items-center justify-center', {
                      'bg-yellow-200': faction.notorietyLevel === level * -1,
                    })}
                    onClick={() => {
                      handleLevelChange({
                        level: level * -1,
                        key: 'notorietyLevel',
                      })
                    }}
                  >
                    -{level}
                  </p>
                  {notorietySteps.map((_, index) => {
                    const modifiedIndex = notorietySteps.length - index + (level - 1) * notorietyStepCount
                    const isChecked = modifiedIndex <= faction.notorietyCount
                    return (
                      <input
                        type="checkbox"
                        name="notorietyCount"
                        id={String(modifiedIndex)}
                        value={modifiedIndex}
                        key={index}
                        checked={isChecked}
                        onChange={handleOnChange}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-wrap">
          {prestigeLevels.map((level) => {
            return (
              <div className="flex w-1/3 flex-wrap items-center justify-between px-8 text-lg" key={`level-${level}`}>
                {prestigeSteps.map((_, index) => {
                  const modifiedIndex = index + 1 + (level - 1) * prestigeStepCount
                  const isChecked = modifiedIndex <= faction.prestigeCount
                  return (
                    <input
                      type="checkbox"
                      name="prestigeCount"
                      id={String(modifiedIndex)}
                      value={modifiedIndex}
                      key={index}
                      checked={isChecked}
                      onChange={handleOnChange}
                    />
                  )
                })}
                <p
                  className={cn('flex h-6 w-6 cursor-pointer items-center justify-center rounded', {
                    'bg-yellow-200': faction.prestigeLevel === level,
                  })}
                  onClick={() => {
                    handleLevelChange({
                      level: level,
                      key: 'prestigeLevel',
                    })
                  }}
                >
                  +{level}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const ReputationManager = () => {
  const [factions, setFactions] = useState(factionsState)

  const handleReputationChange = (rep: FactionReputation) => {
    setFactions((state) => {
      const index = state.map((faction) => faction.id).indexOf(rep.id)
      const newState = [...state]
      newState[index] = rep
      return newState
    })
  }

  return (
    <div className="flex w-full flex-wrap">
      {/* row for one faction */}
      {factions.map((faction) => {
        return <ReputationManagerRow faction={faction} key={faction.id} onChange={handleReputationChange} />
      })}

      {/* bottom row for labels */}
      <div className="flex w-full flex-wrap">
        <div className="flex w-1/2 flex-wrap justify-end pr-4">
          <div className="w-2/3">
            <div className="flex w-full items-center justify-center border-b border-red-600 text-center">
              <span className="translate-y-1/2 bg-white px-4 uppercase tracking-wide text-red-600">Notoriety</span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex w-full items-center justify-center border-b border-green-800 text-center">
            <span className="translate-y-1/2 bg-white px-4 uppercase tracking-wide text-green-800">Prestige</span>
          </div>
        </div>
      </div>
    </div>
  )
}
