import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { InputPassword } from '@/components/framework/forms/input-password';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
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
const LoginForm = () => {
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
      id: data.id,
      password: data.password,
    };

    console.log('payload');
  }

  return (
    <Card className='w-[500px]'>
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
      <CardFooter className='flex flex-col'>
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
    </Card>
  );
};

export default LoginForm;
