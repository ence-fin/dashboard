'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { MenuOptions } from '@/types/invoice'

export function SelectMenu({
  value,
  setValue,
  label,
  options,
  stack = 'z-10',
  disabled
}: {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  label?: string
  options: MenuOptions[]
  stack?: string
  disabled?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between bg-transparent dark:border-zinc-600 border-zinc-400 hover:bg-transparent rounded-md shadow-none font-normal h-10 text-xs'
          size='sm'
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : label}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`p-0 ${stack}`}>
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
