import { object, string, z } from 'zod';

export const VerifyUserValidationSchema = object({
  confirmationCode: string().min(1, {
    message: 'Confirmation Code is required',
  }),
  email: string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
});

export type verifyUserPayload = z.infer<typeof VerifyUserValidationSchema>;
