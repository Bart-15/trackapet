import { zodResolver } from '@hookform/resolvers/zod';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { Dispatch, SetStateAction, useState } from 'react';
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
  loginPayload,
  LoginValidationSchema,
} from '@/validation/login.validation';

import VerifyUserDialog from './VerifyUserDialog';

const initFormVal = {
  email: '',
  password: '',
};

interface ILoginForm {
  setNoAccount: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setNoAccount }: ILoginForm) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userVerifyDialog, setUserVerifyDialog] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginPayload>({
    mode: 'onBlur',
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: initFormVal,
  });

  async function handleLogin(formData: loginPayload) {
    setLoading(true);
    const { email, password } = formData;

    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

    const authPayload = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    cognitoUser.authenticateUser(authPayload, {
      onSuccess: (data) => {
        successToast({
          message: 'Successfully logged in!',
        });
        setLoading(false);
      },
      onFailure: (error) => {
        if (error.message == 'User is not confirmed.') {
          setUserEmail(email);
          setLoading(false);
          setUserVerifyDialog(true);
        }

        errorToast({
          message: error.message,
        });
      },
    });
  }

  return (
    <>
      <CardHeader>
        <CardTitle className='text-center'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className='flex flex-col gap-2'
          onSubmit={handleSubmit(handleLogin)}
          id='login-form'
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
          Don&apos;t have an account?{' '}
          <Text
            as='a'
            className='cursor-pointer text-xs text-blue-700 underline'
            onClick={() => setNoAccount(true)}
          >
            Signup
          </Text>
        </Text>
        <Button
          form='login-form'
          type='submit'
          isLoading={loading}
          className={buttonVariants({
            variant: 'default',
            className: 'w-full	',
          })}
        >
          Login
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

export default LoginForm;
