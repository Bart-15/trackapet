import { object, string, z } from 'zod';

export const NotifyOwnerValidationSchema = object({
  email: string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Invalid email address' }),
  location: string().min(1, { message: 'Location is required' }),
  mobileNumber: string()
    .regex(/^[0-9]+$/, 'Mobile number must contain only numbers')
    .min(1, { message: 'Mobile number is required' }),
  message: string().min(1, { message: 'Message is required' }),
});

export type notifyOnwerPayload = z.infer<typeof NotifyOwnerValidationSchema>;
