import { useEffect } from 'react'
import JsxParser from 'react-jsx-parser'
import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location'

import { TextInput } from '@/components'
import { CharacterHeader } from '@/components/characterHeader'
import { EquipmentManager } from '@/components/equipmentManager'
import { PatternedHeading } from '@/components/patternedHeading'
import { ReputationManager } from '@/components/reputationManager'
import { SheetSection } from '@/components/sheetSection'
import { StatCircle } from '@/components/statCircle'
import type {
  Connection,
  DescriptiveItem,
  Playbook,
  PlaybookId,
  PlaybookMove,
  RoguishFeat,
  StatsKey,
  WeaponSkill,
} from '@/data'
import connectionsJson from '@/data/connections.json'
import drivesJson from '@/data/drives.json'
import movesJson from '@/data/moves.json'
import playbooks from '@/data/playbooks.json'
import roguishFeatsJson from '@/data/roguishFeats.json'
import weaponSkillsJson from '@/data/weaponSkills.json'
import { cn } from '@/lib/utils'
import { useCharacterStore } from '@/stores/characterStore'

type Route = MakeGenerics<{ Params: { playbook: PlaybookId }; LoaderData: { playbook: Playbook } }>

export const Loader: LoaderFn<Route> = ({ params: { playbook: playbookId } }) => {
  const foundPlaybook = playbooks[playbookId]
  return {
    playbook: foundPlaybook ?? null,
  }
}

export default function NewCharacter() {
  const {
    data: { playbook },
  } = useMatch<Route>()
  const isEditing = useCharacterStore((state) => state.isEditing)
  const setIsEditing = useCharacterStore((state) => state.setIsEditing)

  useEffect(() => {
    setIsEditing(true)
  }, [])
  if (!playbook) {
    return null
  }
  const statKeys = Object.keys(playbook.stats) as StatsKey[]
  const exhaustionTrack = new Array(4).fill(0)
  const drives = drivesJson as { [key: string]: DescriptiveItem }
  const roguishFeats: RoguishFeat[] = Object.values(roguishFeatsJson)
  const weaponSkills: [string, WeaponSkill][] = Object.entries(weaponSkillsJson)
  const moves = movesJson as { [key: string]: PlaybookMove }
  const connections = connectionsJson as { [key: string]: Connection }
  return (
    <>
      <CharacterHeader playbook={playbook.name} />
      <div className="container mx-auto flex w-full flex-wrap py-8">
        {/* stats */}
        <SheetSection name="Stats" hint="add +1 to a stat of your choice, to a max of +2">
          <div className="flex flex-wrap justify-between bg-white p-6">
            {statKeys.map((attr) => {
              const value = playbook.stats[attr]
              return <StatCircle name={attr} value={value} key={attr} sentenceCase={true} isEditing={isEditing} />
            })}
          </div>
        </SheetSection>
        {/* exhaustion  */}
        <SheetSection name="Exhaustion">
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            <div>
              {exhaustionTrack.map((_, index) => {
                return <input type="checkbox" className="mr-2" key={index} />
              })}
              <span className="ml-4 text-2xl">Injury</span>
            </div>
            <div>
              {exhaustionTrack.map((_, index) => {
                return <input type="checkbox" className="mr-2" key={index} />
              })}
              <span className="ml-4 text-2xl">Exhaustion</span>
            </div>
            <div>
              {exhaustionTrack.map((_, index) => {
                return <input type="checkbox" className="mr-2" key={index} />
              })}
              <span className="ml-4 text-2xl">Depletion</span>
            </div>
          </div>
        </SheetSection>
        {/* Reputation Manager  */}
        <SheetSection name="Reputation" className="w-full" hint="See background for starting reputation options">
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            <ReputationManager />
          </div>
        </SheetSection>
        {/* Equipment Manager  */}
        <SheetSection name="Equipment" className="w-full">
          <div className="flex flex-col flex-wrap justify-between bg-white px-6 py-2">
            <EquipmentManager value={10} might={playbook.stats.might} />
          </div>
        </SheetSection>
        {/* Nature */}
        <SheetSection name="Nature" hint="Choose one">
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            <div className="flex flex-wrap">
              {playbook.nature.map((nature) => {
                return (
                  <div className="mb-6 w-full px-4" key={nature.name}>
                    <PatternedHeading text={nature.name} className="mb-2" />
                    <p className="px-2 text-xl text-gray-500">{nature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </SheetSection>
        {/* Drives */}
        <SheetSection name="Drives" hint="Choose two">
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            <div className="flex flex-wrap">
              {playbook.drives.map((driveKey: string, index) => {
                const drive = drives[driveKey] as DescriptiveItem
                return (
                  <label
                    className={cn('mb-4 w-full px-4 pb-4', { 'border-b': index !== playbook.drives.length - 1 })}
                    key={driveKey}
                    htmlFor={driveKey}
                  >
                    <div className="flex flex-wrap">
                      <input type="checkbox" name={driveKey} id={driveKey} className="mr-2" />
                      <p className="text-3xl">{drive.name}</p>
                    </div>
                    <p className="px-2 text-xl text-gray-500">{drive.description}</p>
                  </label>
                )
              })}
            </div>
          </div>
        </SheetSection>
        {/* Roguish Feats */}
        <SheetSection
          name="Roguish Feats"
          hint={
            playbook.roguishFeats.choose === 0 ? 'Start with Marked Feats' : `Choose ${playbook.roguishFeats.choose}`
          }
        >
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            <ul className="columns-2">
              {roguishFeats.map((feat) => {
                const isDisabled =
                  playbook.roguishFeats.presets.length > 0 &&
                  playbook.roguishFeats.choose === 0 &&
                  !playbook.roguishFeats.presets.includes(feat.id)
                const isChecked =
                  playbook.roguishFeats.presets.length > 0 && playbook.roguishFeats.presets.includes(feat.id)
                return (
                  <li key={feat.name}>
                    <label
                      htmlFor={feat.name}
                      className={cn('flex py-1 px-2 text-lg hover:bg-slate-100', { 'opacity-40': isDisabled })}
                    >
                      <input
                        type="checkbox"
                        name={feat.name}
                        id={feat.name}
                        className="mr-2"
                        disabled={isDisabled}
                        defaultChecked={isChecked}
                      />
                      <span>{feat.name}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        </SheetSection>
        {/* Weapon Skills */}
        <SheetSection name="Weapon Skills" hint="Choose one bolded weapon skill to start">
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            <ul className="columns-2">
              {weaponSkills.map(([id, skill]) => {
                const isDisabled = !playbook.weaponSkills.allowed.includes(id)
                return (
                  <li key={skill.name}>
                    <label
                      htmlFor={skill.name}
                      className={cn('flex py-1 px-2 text-lg hover:bg-slate-100', { 'opacity-40': isDisabled })}
                    >
                      <input
                        type="radio"
                        name="weapon-skill"
                        id={skill.name}
                        className="mr-2"
                        disabled={isDisabled}
                        // defaultChecked={isChecked}
                      />
                      <span>{skill.name}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        </SheetSection>
        {/* Playbook Moves */}
        <SheetSection name="Your Moves" hint="Choose three">
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            <div className="flex flex-wrap">
              {playbook.moves.allowed.map((moveKey: string, index: number) => {
                const move = moves[moveKey] as PlaybookMove
                if (!move) {
                  console.log(moveKey)
                }
                return (
                  <label
                    className={cn('mb-4 w-full px-4 pb-4', { 'border-b': index !== playbook.moves.allowed.length - 1 })}
                    key={moveKey}
                    htmlFor={moveKey}
                  >
                    <div className="flex flex-wrap">
                      <input type="checkbox" name={moveKey} id={moveKey} className="mr-2" />
                      <p className="text-3xl">{move.name}</p>
                    </div>
                    <p className="px-2 text-xl text-gray-500">{move.description}</p>
                  </label>
                )
              })}
            </div>
          </div>
        </SheetSection>
        {/* Background */}
        <SheetSection name="Background">
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            <p className="mb-2 text-xl">Details</p>
            <ul className="mb-4 text-lg">
              {playbook.details.map((item) => {
                return (
                  <li className="px-2 pb-2" key={item}>
                    {item}
                  </li>
                )
              })}
            </ul>
            <p className="mb-2 text-xl">Demeanor</p>
            <ul className="mb-4 text-lg">
              {playbook.demeanor.map((item) => {
                return (
                  <li className="px-2 pb-2" key={item}>
                    {item}
                  </li>
                )
              })}
            </ul>
            <p className="mb-2 text-xl">Where do you call home?</p>
            <ul className="mb-4">
              {playbook.background.where.map((item) => {
                return (
                  <label htmlFor={item} key={item} className="flex w-full px-2 pb-2">
                    <input type="radio" name="where" id={item} className="mr-2" />
                    {item !== 'custom' && <p className="text-lg">{item}</p>}
                    {item === 'custom' && (
                      <TextInput
                        placeholder="name of your home clearing?"
                        className="w-full border-b-black text-gray-700"
                      />
                    )}
                  </label>
                )
              })}
            </ul>
            <p className="mb-2 text-xl">Why are you a vagabond?</p>
            <ul className="mb-4">
              {playbook.background.why.map((item) => {
                return (
                  <label htmlFor={item} key={item} className="flex w-full px-2 pb-2">
                    <input type="radio" name="why" id={item} className="mr-2" />
                    <p className="text-lg">{item}</p>
                  </label>
                )
              })}
            </ul>
            <p className="mb-2 text-xl">Whom have you left behind?</p>
            <ul className="mb-4">
              {playbook.background.whom.map((item) => {
                return (
                  <label htmlFor={item} key={item} className="flex w-full px-2 pb-2">
                    <input type="radio" name="whom" id={item} className="mr-2" />
                    <p className="text-lg">{item}</p>
                  </label>
                )
              })}
            </ul>
            <p className="mb-4 text-xl">
              Which faction have you served the most?{' '}
              <span className="text-lg text-gray-500">(mark two prestige for appropriate group)</span>
            </p>
            <p className="mb-2 text-xl">
              With which faction have you earned a special enmity?{' '}
              <span className="text-lg text-gray-500">(mark one notoriety for appropriate group)</span>
            </p>
          </div>
        </SheetSection>
        {/* connections */}
        <SheetSection name="Connections">
          <div className="flex flex-col flex-wrap justify-between bg-white p-6">
            {playbook.connections.map((connectionName) => {
              const connection = connections[connectionName]
              const x = () => {
                return <TextInput placeholder="Character's Name" className="border-b-black text-gray-700" />
              }
              return (
                <div key={connectionName} className="mb-6 text-xl">
                  <p className="mb-2 text-3xl">{connection.name}</p>
                  {/* eslint-disable-next-line  */}
                  {/* @ts-ignore */}
                  <JsxParser jsx={connection.description} components={{ x }} className="mb-4" />
                  <p className="border-l-2 border-dashed border-gray-500 px-2 italic text-gray-500">
                    {connection.benefit}
                  </p>
                </div>
              )
            })}
          </div>
        </SheetSection>
      </div>
    </>
  )
}
