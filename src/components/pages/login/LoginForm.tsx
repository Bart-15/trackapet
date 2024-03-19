import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { InputPassword } from '@/components/framework/forms/input-password';
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
  loginPayload,
  LoginValidationSchema,
} from '@/validation/login.validation';

const initFormVal = {
  email: '',
  password: '',
};

interface ILoginForm {
  setNoAccount: Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setNoAccount }: ILoginForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginPayload>({
    mode: 'onBlur',
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: initFormVal,
  });

  async function handleLogin(data: loginPayload) {
    const payload = {
      email: data.email,
      password: data.password,
    };

    console.log('payload');
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
          className={buttonVariants({
            variant: 'default',
            className: 'w-full	',
          })}
        >
          Login
        </Button>
      </CardFooter>
    </>
  );
};

export default LoginForm;
