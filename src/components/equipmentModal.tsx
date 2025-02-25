import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

import { EquipmentItem } from './equipmentManager'
import { TextInput } from './inputs'
import { NumberInput } from './inputs/NumberInput'
import { Select, SelectOption } from './inputs/Select'

export const EquipmentModal = (props: { children: JSX.Element }) => {
  const rangeOptions: SelectOption[] = [
    {
      value: 'intimate',
      label: 'Intimate',
    },
    {
      value: 'close',
      label: 'Close',
    },
    {
      value: 'long',
      label: 'Long',
    },
  ]
  const currentEquipment = useState<EquipmentItem>({
    name: '',
    wear: 0,
    currentWear: 0,
    equipmentTags: [],
    weaponMoveTags: [],
    range: ['Close Range'],
    load: 1,
  })
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-90" />
        <Dialog.Content className="fixed top-1/2 left-1/2 h-screen max-h-[85vh] w-screen max-w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 shadow-md">
          <Dialog.Close asChild>
            <button
              className="absolute top-6 right-6 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-600 hover:text-white"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <Dialog.Title className="mb-2 text-2xl">Equipment</Dialog.Title>
          <Dialog.Description className="text-lg opacity-75">
            Use the below to make a new piece of equipment. Give it a name, an amount of wear and select weapon skills
            and equipment tags. The value will automatically get worked out for you.
          </Dialog.Description>
          {/*
          What does it need to work. Give it a name, select the following:
          wear,
          range,
          weapon skill tags,
          equipment tags
          */}
          <div className="flex w-full flex-wrap py-4">
            <div className="w-1/2 pr-6">
              <div className="flex flex-wrap items-center py-2">
                <label htmlFor="">Name:</label>
                <TextInput
                  className={cn(
                    'ml-2 flex-auto border-b-2 border-black border-opacity-30 text-black focus:border-opacity-100'
                  )}
                />
              </div>
              <div className="flex flex-wrap items-center py-2">
                <label htmlFor="">Wear:</label>
                <NumberInput
                  className={cn(
                    'ml-2 w-16 border-b-2 border-black border-opacity-30 text-black focus:border-opacity-100'
                  )}
                />
              </div>
              <div className="flex flex-wrap items-center py-2">
                <label htmlFor="">Range:</label>
                <Select options={rangeOptions} className="ml-2" />
              </div>
              {/* render out the equipment being created */}
              <EquipmentItem />
            </div>
            <div className="w-1/2"> section 2</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
