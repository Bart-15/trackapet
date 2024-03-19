import { object, string, z } from 'zod';

export const SignupValidationSchema = object({
  username: string().min(1, { message: 'Username is required' }),
  email: string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  password: string().min(1, { message: 'Password is required' }),
});

export type signupPayload = z.infer<typeof SignupValidationSchema>;
