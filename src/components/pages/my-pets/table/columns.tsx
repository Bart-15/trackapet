/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { CustomAlertDialog } from '@/components/common/CustomAlertDialog';
import { Icons } from '@/components/Icons';
import { useDeletePet } from '@/hooks/my-pets/useDeletePet';
import { createPetPayload } from '@/validation/createPet.validation';

import UpdatePetForm from '../UpdatePetForm';

export type PetColTypes = {
  petId: string;
  name: string;
  size: string;
  color: string;
  weight: string;
  age: string;
  breed: string;
  fullAddress: string;
  birthDate: string | Date;
  temperament: string;
  species: string;
  owner: string;
  photo: string;
};

export const columnHelper = createColumnHelper<PetColTypes>();

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
    cell: ({ row }) => {
      return <span className='capitalize'>{row.getValue('species')}</span>;
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
      return <span>{row.getValue('birthDate')}</span>;
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
      const pet = row.original;

      const deletePet = useDeletePet();
      const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false);
      const [openUpdateDialog, setUpdateDialog] = useState<boolean>(false);

      async function handleDeletePet(id: string) {
        await deletePet.mutateAsync(id);
      }

      return (
        <>
          <div className='flex flex-row gap-1'>
            <CustomAlertDialog
              title='Delete Pet'
              open={openDeleteDialog}
              setOpen={setDeleteDialog}
              description={`Are you sure you want to delete '${pet.name}'`}
              onProceedCallback={() => handleDeletePet(pet.petId)}
              onCanceledCallback={() => setDeleteDialog(false)}
              customButton={<Icons.trash className='text-red-600' />}
            />
            <Icons.edit
              className='cursor-pointer text-green-600'
              onClick={() => setUpdateDialog(true)}
            />
          </div>

          <UpdatePetForm
            id={pet.petId}
            open={openUpdateDialog}
            setOpen={setUpdateDialog}
            pet={pet}
          />
        </>
      );
    },
  }),
];
