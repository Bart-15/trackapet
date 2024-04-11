/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */

'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Option } from '@/types/global.types';

/**
 *
 * @param options - dropdown options
 * @param placeholder - string
 * @param setSelectedValues - selectedValues setter
 * @param selectedValue - Total selected values
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorBorder?: boolean;
  options: Option[];
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
}

const MultiSelectCombobox = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      errorBorder = false,
      options,
      selectedValues,
      setSelectedValues,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const toggleValue = (value: string) => {
      const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(updatedValues);
    };

    const isSelected = (value: string) => selectedValues.includes(value);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-auto justify-between'
          >
            {selectedValues.length > 0
              ? selectedValues
                  .map(
                    (value) =>
                      options.find((framework) => framework.value === value)
                        ?.label,
                  )
                  .join(', ')
              : placeholder}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Command>
            <CommandInput placeholder='Search framework...' ref={ref} />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => toggleValue(framework.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      isSelected(framework.value) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelectCombobox.displayName = 'MultiSelectCombobox';

export { MultiSelectCombobox };
