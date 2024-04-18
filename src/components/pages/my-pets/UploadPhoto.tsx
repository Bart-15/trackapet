import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Icons } from '@/components/Icons';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { base64encode } from '@/helpers/base64Encoder';
import { useUploadPhoto } from '@/hooks/my-pets/useUploadPhoto';
import {
  ACCEPTED_IMAGE_TYPES,
  createPetPayload,
  MAX_FILE_SIZE,
} from '@/validation/createPet.validation';

interface UploadPhotoProps {
  form: UseFormReturn<createPetPayload, any, undefined>;
  placeholder: string;
  setPlaceholder: Dispatch<SetStateAction<string>>;
}

const UploadPhoto = ({
  form,
  placeholder,
  setPlaceholder,
}: UploadPhotoProps) => {
  const mutation = useUploadPhoto();

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;

    const file = e.target.files?.[0];

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type) || MAX_FILE_SIZE <= file.size)
      return;

    const base64 = (await base64encode(file)) as string;

    const response = await mutation.mutateAsync({
      photo: base64,
    });

    console.log(response);
    if (response.status === 200) {
      setPlaceholder(response.data?.presignedURL);
      form.setValue('photo', e.target.files, {
        shouldValidate: true,
      });

      form.setValue('photoFilename', response.data?.fileName, {
        shouldValidate: true,
      });
    }
  }

  return (
    <FormField
      control={form.control}
      name='photo'
      render={({ field }) => {
        return (
          <FormItem>
            <div className='mb-2 flex justify-center'>
              <div className='w-full rounded-lg'>
                <div className=''>
                  <Label
                    htmlFor='photo'
                    className='mb-2 inline-block text-gray-500'
                  >
                    Photo
                  </Label>
                  <FormControl>
                    <div className='flex w-full items-center justify-center'>
                      {placeholder ? (
                        <div className='relative flex h-64 w-full'>
                          <Image
                            src={placeholder}
                            alt='pre-upload-photo'
                            width='50'
                            height='50'
                            className='mb-2 aspect-square w-full rounded-sm object-cover'
                            unoptimized
                          />
                          <Button
                            type='button'
                            className={buttonVariants({
                              variant: 'destructive',
                              className: 'absolute bottom-0 right-0 top-0 m-1',
                            })}
                            onClick={() => {
                              form.setValue('photo', '', {
                                shouldValidate: true,
                              });
                              form.setValue('photoFilename', '', {
                                shouldValidate: true,
                              });
                              setPlaceholder('');
                            }}
                          >
                            <Icons.trash className='h-8 w-8 text-white' />{' '}
                          </Button>
                        </div>
                      ) : (
                        <Label
                          htmlFor='image'
                          className='flex h-32 w-full flex-col border-4 border-dashed border-blue-200 hover:border-gray-300 hover:bg-gray-100'
                        >
                          <div className='flex flex-col items-center justify-center pt-7'>
                            {mutation.isPending ? (
                              <Loader2 className='mt-2 h-12 w-12 animate-spin' />
                            ) : (
                              <>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-8 w-8 text-gray-400 group-hover:text-gray-600'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                                  />
                                </svg>
                                <p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
                                  Attach a file
                                </p>
                              </>
                            )}
                          </div>
                          <Input
                            type='file'
                            className='opacity-0'
                            {...field}
                            value={field.value || ''}
                            onChange={(event) => {
                              handleUpload(event), field.onChange(event);
                            }}
                          />
                        </Label>
                      )}
                    </div>
                  </FormControl>
                </div>
              </div>
            </div>
            <FormMessage className='text-xs' />
          </FormItem>
        );
      }}
    />
  );
};

export default UploadPhoto;
