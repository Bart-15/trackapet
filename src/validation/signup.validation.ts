import { object, string, z } from 'zod';

export const SignupValidationSchema = object({
  email: string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  password: string().min(1, { message: 'Password is required' }),
});

export type signupPayload = z.infer<typeof SignupValidationSchema>;
