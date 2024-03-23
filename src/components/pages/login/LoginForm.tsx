import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
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
import { AuthCognitoContext } from '@/context/CognitoProvider';
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
  const cognito = useContext(AuthCognitoContext);
  if (!cognito) throw new Error('Cognito context is undefined');

  const { getAuthUser } = cognito;

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [userVerifyDialog, setUserVerifyDialog] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginPayload>({
    mode: 'onBlur',
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: initFormVal,
  });

  async function handleLogin(formData: loginPayload) {
    setLoading(true);
    const payload = {
      username: formData.email,
      password: formData.password,
      attributes: {
        'custom:role': 'user',
      },
    };

    try {
      const { nextStep } = await signIn(payload);
      const checkStep = nextStep.signInStep;

      switch (checkStep) {
        case 'DONE':
          await getAuthUser();
          router.push('/home');
          reset();
          break;
        case 'CONFIRM_SIGN_UP':
          setUserEmail(payload.username);
          setUserVerifyDialog(true);
          successToast({
            message: 'Successfully logged in!',
          });
          break;
        default:
      }
    } catch (error) {
      if (error instanceof Error) {
        errorToast({
          message: error.message,
        });
      }
      // eslint-disable-next-line no-console
    } finally {
      setLoading(false);
    }
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
