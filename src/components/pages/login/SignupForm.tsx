import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from 'aws-amplify/auth';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputPassword } from '@/components/framework/forms/input-password';
import { errorToast, warningToast } from '@/components/framework/toast';
import { Text } from '@/components/framework/typography';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  signupPayload,
  SignupValidationSchema,
} from '@/validation/signup.validation';

import VerifyUserDialog from './VerifyUserDialog';

const initFormVal = {
  email: '',
  password: '',
};

interface ISignupForm {
  setNoAccount: Dispatch<SetStateAction<boolean>>;
}

const SignupForm = ({ setNoAccount }: ISignupForm) => {
  const [userVerifyDialog, setUserVerifyDialog] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupPayload>({
    mode: 'onBlur',
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: initFormVal,
  });

  async function handleSignup(formData: signupPayload) {
    setSubmitting(true);
    const payload = {
      username: formData.email,
      password: formData.password,
      attributes: {
        'custom:role': 'user',
      },
    };

    try {
      const { nextStep } = await signUp(payload);
      const checkStep = nextStep.signUpStep;

      switch (checkStep) {
        case 'DONE':
          setUserVerifyDialog(false);
          break;
        case 'CONFIRM_SIGN_UP':
          setUserEmail(formData.email);
          warningToast({
            message: 'Your account is not verified',
            description: 'Please check your email for verification code',
          });
          setUserVerifyDialog(true);
          break;
        default:
      }
    } catch (error) {
      if (error instanceof Error) {
        errorToast({
          message: error.message,
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className='text-center'>Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className='flex flex-col gap-2'
          onSubmit={handleSubmit(handleSignup)}
          id='signup-form'
        >
          <Input
            id='email'
            type='text'
            placeholder='Email'
            autoComplete='off'
            error={errors.email?.message}
            {...register('email')}
          />

          <InputPassword
            id='password'
            placeholder='Password'
            error={errors.password?.message}
            {...register('password')}
          />
        </form>
      </CardContent>
      <CardFooter className='flex flex-col items-center justify-center gap-4'>
        <Text as='small'>
          Already have an account?{' '}
          <Text
            as='a'
            className='cursor-pointer text-xs text-blue-700 underline'
            onClick={() => setNoAccount(false)}
          >
            Login
          </Text>
        </Text>
        <Button
          isLoading={submitting}
          form='signup-form'
          type='submit'
          className={buttonVariants({
            variant: 'default',
            className: 'w-full',
          })}
        >
          Signup
        </Button>
      </CardFooter>

      <VerifyUserDialog
        email={userEmail}
        open={userVerifyDialog}
        setOpen={setUserVerifyDialog}
        setNoAccount={setNoAccount}
      />
    </>
  );
};

export default SignupForm;
