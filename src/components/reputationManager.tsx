import { useState } from 'react'

const notorietyStepCount = 3
const prestigeStepCount = 5

const notorietySteps = new Array(notorietyStepCount).fill(0)
const notorietyLevels = [3, 2, 1]

const prestigeSteps = new Array(prestigeStepCount).fill(0)
const prestigeLevels = [1, 2, 3]

interface ReputationState {
  level: number
  prestigeCount: number
  notorietyCount: number
}

interface ReputationManagerRowProps {
  faction: FactionReputation
}

interface FactionReputation {
  id: string
  name: string
  level: number
  prestigeCount: number
  notorietyCount: number
}

// const factions = ['Marquisate', 'Eyrie Dynasty', 'Woodland Alliance', 'Lizard Cult', 'Riverfolk Company', 'Denizens']

const factions: FactionReputation[] = [
  {
    id: 'marquisate',
    name: 'Marquisate',
    level: 0,
    prestigeCount: 0,
    notorietyCount: 0,
  },
  {
    id: 'eyrie-dynasty',
    name: 'Eyrie Dynasty',
    level: 0,
    prestigeCount: 0,
    notorietyCount: 0,
  },
  {
    id: 'woodland-alliance',
    name: 'Woodland Alliance',
    level: 0,
    prestigeCount: 0,
    notorietyCount: 0,
  },
]

const ReputationManagerRow = ({ faction }: ReputationManagerRowProps) => {
  return (
    <div className="flex w-full flex-wrap" key={faction.id}>
      <div className="flex w-1/2 flex-wrap items-center pr-4">
        <div className="w-1/3 text-lg">
          {faction.name} <span className="pl-2 text-xl opacity-40">({faction.level})</span>
        </div>
        <div className="w-2/3">
          <div className="flex w-full flex-wrap">
            {notorietyLevels.map((level) => {
              return (
                <div className="flex w-1/3 flex-wrap items-center justify-between px-6 text-lg" key={`level-${level}`}>
                  <p>-{level}</p>
                  {notorietySteps.map((_, index) => {
                    const modifiedIndex = notorietySteps.length - index + (level - 1) * notorietyStepCount
                    const isChecked = modifiedIndex <= faction.notorietyCount
                    return (
                      <input
                        type="checkbox"
                        name={String(modifiedIndex)}
                        id={String(modifiedIndex)}
                        key={index}
                        defaultChecked={isChecked}
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
                      name={String(modifiedIndex)}
                      id={String(modifiedIndex)}
                      key={index}
                      defaultChecked={isChecked}
                    />
                  )
                })}
                <p>+{level}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const ReputationManager = () => {
  return (
    <div className="flex w-full flex-wrap">
      {/* row for one faction */}
      {factions.map((faction) => {
        return <ReputationManagerRow faction={faction} key={faction.id} />
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
