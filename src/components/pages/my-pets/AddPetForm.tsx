import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  createPetPayload,
  createPetValidationSchema,
} from '@/validation/createPet.validation';

interface AddPetProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const initFormValues = {
  name: '',
  species: '',
  breed: '',
  size: '',
  color: '',
  age: 0,
  weight: 0,
  temperament: '',
  location: '',
  birthDate: '',
  photo: null,
};

// This component handles the Add pet functionality
const AddPetDialog = ({ open, setOpen }: AddPetProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createPetPayload>({
    mode: 'onBlur',
    resolver: zodResolver(createPetValidationSchema),
    defaultValues: initFormValues,
  });

  async function handleAddPet(data: defaultValues) {}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Add Pet</DialogTitle>
        </DialogHeader>
        <form
          className='flex flex-col gap-2'
          onSubmit={handleSubmit(handleAddPet)}
          id='add-pet-form'
        >
          <Input
            id='name'
            type='text'
            placeholder='Pet Name'
            autoComplete='off'
            error={errors.name?.message}
            {...register('name')}
          />
        </form>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPetDialog;
