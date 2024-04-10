/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/named
import { ColumnDef } from '@tanstack/react-table';
import { type Table } from '@tanstack/react-table';
import { ChangeEvent, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Option } from '@/types/global.types';

interface DataTableFilterOptionsProps<TData, TValue> {
  table: Table<TData>;
  column?: ColumnDef<TData, TValue>[];
  title?: string;
  clear: () => void;
  globalFilter: string;
  setGlobalFilter: (value: SetStateAction<string>) => void;
}
export function DataTableFilterOptions<TData, TValue>({
  table,
  globalFilter,
  setGlobalFilter,
}: DataTableFilterOptionsProps<TData, TValue>) {
  return (
    <div className='flex items-center py-4'>
      <div className='flex items-center gap-2'>
        <Input
          placeholder='Search ...'
          value={globalFilter}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setGlobalFilter(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-auto'>
            Hide Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
