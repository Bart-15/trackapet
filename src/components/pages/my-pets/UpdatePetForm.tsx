import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { LoadingSpinner } from '@/components/framework/loading-spinner';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { animalSpecies, sizes } from '@/data/const';
import { useCreatePet } from '@/hooks/my-pets/useCreatePet';
import useGetPet from '@/hooks/my-pets/useGetPet';
import { cn } from '@/lib/utils';
import {
  createPetPayload,
  createPetValidationSchema,
} from '@/validation/createPet.validation';

import { PetColTypes } from './table/columns';
import UploadPhoto from './UploadPhoto';

interface AddPetProps {
  id: string;
  open: boolean;
  pet: PetColTypes;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const initFormValues = {
  name: '',
  species: '',
  breed: '',
  size: '',
  color: '',
  age: '',
  weight: '',
  temperament: '',
  fullAddress: '',
  birthDate: undefined,
  photo: null,
};

// This component handles the Add pet functionality
const UpdatePetForm = ({ id, open, setOpen, pet }: AddPetProps) => {
  const { data, isLoading, isFetching } = useGetPet(id);

  const createPet = useCreatePet();

  const form = useForm<createPetPayload>({
    mode: 'onChange',
    resolver: zodResolver(createPetValidationSchema),
    defaultValues: {
      name: pet?.name,
      species: 'cat',
      breed: pet?.breed,
      age: pet?.age,
      weight: pet?.weight,
      fullAddress: pet?.fullAddress,
      size: pet?.size,
      birthDate: new Date(pet?.birthDate),
      temperament: pet?.temperament,
    },
  });

  async function handleAddPet(values: createPetPayload) {
    const formattedDate = format(values.birthDate, 'yyyy-MM-dd');
    const payload = {
      ...values,
      birthDate: formattedDate,
      photo: values.photoFilename!,
      age: parseInt(values.age),
      weight: parseInt(values.weight),
      notifiedCount: 0,
    };

    delete payload?.photoFilename;
    const response = await createPet.mutateAsync(payload);

    if (response.status === 200) {
      setOpen(false);
    }
  }

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  console.log(pet);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-h-[500px] overflow-y-auto sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Update Pet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className='flex flex-col gap-2'
            onSubmit={form.handleSubmit(handleAddPet)}
            id='add-pet-form'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Name' type='text' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='species'
              render={({ field }) => {
                return (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select species' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {animalSpecies.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='breed'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Breed' type='text' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='color'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Color' type='text' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='age'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Age' type='number' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='weight'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Weight' type='number' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='size'
              render={({ field }) => {
                return (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select size' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='temperament'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder='Temperament' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='fullAddress'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Full address'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='birthDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-xs'>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            <UploadPhoto form={form} />
            <DialogFooter>
              <Button
                isLoading={createPet.isPending}
                type='submit'
                form='add-pet-form'
              >
                Create Pet
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePetForm;
