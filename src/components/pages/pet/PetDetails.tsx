import { format } from 'date-fns';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { LoadingSpinner } from '@/components/framework/loading-spinner';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useGetPet from '@/hooks/my-pets/useGetPet';

import NotifyForm from './NotifyForm';

const PetDetails = () => {
  const [openNotifyForm, setNotifyForm] = useState<boolean>(false);
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = useGetPet(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const pet = data?.data;

  return (
    <>
      <div className='my-5 flex flex-col items-center justify-center'>
        <Card className='w-[600px]'>
          <CardHeader>
            <CardTitle>Pet Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col items-center justify-center'>
                <div className='h-56 w-56 items-center overflow-hidden rounded-full shadow-lg'>
                  <Image
                    src={pet?.photo}
                    alt={pet?.name}
                    width='224'
                    height='224'
                    objectFit='contain'
                  />
                </div>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  placeholder='Name'
                  value={pet?.name}
                  disabled={true}
                  className='disabled:opacity-90'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='species'>Species</Label>
                <Input
                  id='species'
                  placeholder='Species'
                  value={pet?.species}
                  disabled={true}
                  className='capitalize disabled:opacity-90'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='breed'>Breed</Label>
                <Input
                  id='breed'
                  placeholder='Breed'
                  value={pet?.breed}
                  disabled={true}
                  className='disabled:opacity-90'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='breed'>Color</Label>
                <Input
                  id='color'
                  placeholder='Color'
                  value={pet?.color}
                  disabled={true}
                  className='disabled:opacity-90'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='breed'>Age</Label>
                <Input
                  id='age'
                  placeholder='Age'
                  value={
                    pet?.age == 1 ? pet?.age + ' yr old' : pet?.age + ' yrs old'
                  }
                  disabled={true}
                  className='disabled:opacity-90'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='breed'>Weight</Label>
                <Input
                  id='weight'
                  placeholder='Weight'
                  value={pet?.weight + ' kg'}
                  disabled={true}
                  className='disabled:opacity-90'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='breed'>Birthday</Label>
                <Input
                  id='birthday'
                  placeholder='Birthday'
                  value={format(pet?.birthDate, 'MMMM dd, yyyy')}
                  disabled={true}
                  className='disabled:opacity-90'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='breed'>Full Address</Label>
                <Input
                  id='fullAddress'
                  placeholder='FullAddress'
                  value={pet?.fullAddress}
                  disabled={true}
                  className='disabled:opacity-90'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='breed'>Temperament</Label>
                <Textarea
                  id='temperament'
                  placeholder='Temperament'
                  value={pet?.temperament}
                  disabled={true}
                  className='disabled:opacity-90'
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col justify-center'>
            {' '}
            <Button
              variant='destructive'
              onClick={() => setNotifyForm(true)}
              disabled={pet?.notifiedCount === 3}
            >
              <Icons.bellRing className='mr-1 h-4 w-4' />
              Notify the owner
            </Button>
          </CardFooter>
        </Card>
      </div>

      <NotifyForm
        open={openNotifyForm}
        setOpen={setNotifyForm}
        id={pet?.petId}
      />
    </>
  );
};

export default PetDetails;
