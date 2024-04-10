/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { createColumnHelper } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';

export type Pet = {
  petId: string;
  name: string;
  size: string;
  color: string;
  weight: string;
  age: number;
  breed: string;
  location: string;
  birthDate: string;
  temperament: string;
  species: string;
  owner: string;
};

export const columnHelper = createColumnHelper<Pet>();

export const defaultColumns = [
  // Display Columns
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer justify-start gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <Icons.arrowUpDown className='ml-2 h-4 w-4' />
        </span>
      );
    },
  }),
  columnHelper.accessor('owner', {
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer justify-start gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Owner
          <Icons.arrowUpDown className='ml-2 h-4 w-4' />
        </span>
      );
    },
  }),
  columnHelper.accessor('species', {
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer justify-start gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Species
          <Icons.arrowUpDown className='ml-2 h-4 w-4' />
        </span>
      );
    },
  }),
  columnHelper.accessor('breed', {
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer justify-start gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Breed
          <Icons.arrowUpDown className='ml-2 h-4 w-4' />
        </span>
      );
    },
  }),
  columnHelper.accessor('size', {
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer justify-start gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Size
          <Icons.arrowUpDown className='ml-2 h-4 w-4' />
        </span>
      );
    },
    cell: ({ row }) => {
      return <span className='capitalize'>{row.getValue('size')}</span>;
    },
  }),
  columnHelper.accessor('birthDate', {
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer justify-start gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Birth Day
          <Icons.arrowUpDown className='ml-2 h-4 w-4' />
        </span>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('birthDate'));
      const formatted = date.toLocaleString();
      return <span>{formatted}</span>;
    },
  }),
  columnHelper.accessor('weight', {
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer justify-start gap-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Weight
          <Icons.arrowUpDown className='ml-2 h-4 w-4' />
        </span>
      );
    },
    cell: ({ row }) => {
      return <span>{row.getValue('weight') + ' kg'}</span>;
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: ({ column }) => {
      return (
        <span className='flex cursor-pointer justify-start gap-1'>Actions</span>
      );
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='cursor-pointer rounded-sm border bg-slate-50 px-2 py-3 shadow-sm	'
            align='end'
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update Pet</DropdownMenuItem>
            <DropdownMenuItem>Delete Pet</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
