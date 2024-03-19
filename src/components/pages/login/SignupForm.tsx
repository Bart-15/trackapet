import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputPassword } from '@/components/framework/forms/input-password';
import { errorToast, successToast } from '@/components/framework/toast';
import { Text } from '@/components/framework/typography';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { userPool } from '@/config/cognitoConfig';
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
    const { email, password } = formData;
    setUserEmail(email);

    userPool.signUp(email, password, [], [], (error) => {
      if (error) {
        return errorToast({
          message: error.message,
        });
      }

      successToast({
        message: 'User successfully registered!',
        description: 'Please check your email address for confirmation code.',
      });

      setUserVerifyDialog(true);
    });
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
          form='signup-form'
          type='submit'
          className={buttonVariants({
            variant: 'default',
            className: 'w-full	',
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
