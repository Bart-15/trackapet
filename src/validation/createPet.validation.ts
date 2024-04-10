import { coerce, number, object, string, TypeOf, z } from 'zod';

export const MAX_FILE_SIZE = 2000000;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const createPetValidationSchema = object({
  name: string().min(1, { message: 'Petname is required' }),
  species: string().min(1, { message: 'Species is required' }),
  breed: string().min(1, { message: 'Breed is required' }),
  birthDate: string().min(1, { message: 'Birth date is required' }),
  age: number().min(1, { message: 'Age is required' }).positive(),
  color: string().min(1, { message: 'Color is required' }),
  weight: number().min(1, { message: 'Weight is required' }),
  size: string().min(1, { message: 'Size is required' }),
  notifiedCount: number(),
  photo: z
    .any()
    .refine((files) => files?.length == 1, 'Photo is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 2MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  temperament: string().min(1, { message: 'Temperament' }),
  location: string().min(1, { message: 'Location is required' }),
});

export type createPetPayload = TypeOf<typeof createPetValidationSchema>;
