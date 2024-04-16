import { date, object, string, TypeOf, z } from 'zod';

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
  birthDate: date({
    required_error: 'Date of birth is required.',
  }).refine((date) => date !== undefined, {
    message: 'Birth date is required',
  }),
  age: string()
    .min(1, { message: 'Age is required' })
    .refine(
      (value) => {
        const numVal = Number(value);
        return !isNaN(numVal) && numVal > 0 && !value.startsWith('0');
      },
      {
        // Error message if the validation fails
        message: 'Only accepts numeric value',
      },
    ),
  color: string().min(1, { message: 'Color is required' }),
  weight: string()
    .min(1, { message: 'Weight is required' })
    .refine(
      (value) => {
        const numVal = Number(value);
        return !isNaN(numVal) && numVal > 0 && !value.startsWith('0');
      },
      {
        // Error message if the validation fails
        message: 'Only accepts numeric value',
      },
    ),
  size: string().min(1, { message: 'Size is required' }),
  photoFilename: string().optional(),
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
  fullAddress: string().min(1, { message: 'Full address is required' }),
});

export const updatePetValidationSchema = object({
  name: string().min(1, { message: 'Petname is required' }),
  species: string().min(1, { message: 'Species is required' }),
  breed: string().min(1, { message: 'Breed is required' }),
  birthDate: date({
    required_error: 'Date of birth is required.',
  }).refine((date) => date !== undefined, {
    message: 'Birth date is required',
  }),
  age: string()
    .min(1, { message: 'Age is required' })
    .refine(
      (value) => {
        const numVal = Number(value);
        return !isNaN(numVal) && numVal > 0 && !value.startsWith('0');
      },
      {
        // Error message if the validation fails
        message: 'Only accepts numeric value',
      },
    ),
  color: string().min(1, { message: 'Color is required' }),
  weight: string()
    .min(1, { message: 'Weight is required' })
    .refine(
      (value) => {
        const numVal = Number(value);
        return !isNaN(numVal) && numVal > 0 && !value.startsWith('0');
      },
      {
        // Error message if the validation fails
        message: 'Only accepts numeric value',
      },
    ),
  size: string().min(1, { message: 'Size is required' }),
  photoFilename: string().optional(),
  // photo: z
  //   .any()
  //   .refine((files) => files?.length == 1, 'Photo is required.')
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 2MB.`,
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     '.jpg, .jpeg, .png and .webp files are accepted.',
  //   ),
  temperament: string().min(1, { message: 'Temperament' }),
  fullAddress: string().min(1, { message: 'Full address is required' }),
});

export type createPetPayload = TypeOf<typeof createPetValidationSchema>;
