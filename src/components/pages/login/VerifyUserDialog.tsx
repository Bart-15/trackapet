import { zodResolver } from '@hookform/resolvers/zod';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { errorToast, successToast } from '@/components/framework/toast';
import { Text } from '@/components/framework/typography';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { userPool } from '@/config/cognitoConfig';
import {
  verifyUserPayload,
  VerifyUserValidationSchema,
} from '@/validation/verify-user.validation';

interface IVerifyUserForm {
  setNoAccount: Dispatch<SetStateAction<boolean>>;
  email?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const VerifyUserDialog = ({
  email,
  open,
  setOpen,
  setNoAccount,
}: IVerifyUserForm) => {
  const initFormVal = {
    email: '',
    confirmationCode: '',
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<verifyUserPayload>({
    mode: 'onBlur',
    resolver: zodResolver(VerifyUserValidationSchema),
    defaultValues: initFormVal,
  });

  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  }, [email]);

  async function handleUserVerify(formData: verifyUserPayload) {
    const { email, confirmationCode } = formData;
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

    cognitoUser.confirmRegistration(confirmationCode, true, (error) => {
      if (error) {
        return errorToast({
          message: 'Invalid confirmation code',
        });
      }

      successToast({
        message: 'Account successfully verified!',
      });
      setOpen(false);
      setNoAccount(false);
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify your account</DialogTitle>
          </DialogHeader>
          <form
            className='flex flex-col gap-2'
            onSubmit={handleSubmit(handleUserVerify)}
            id='user-verify-form'
          >
            <Input
              id='email'
              type='text'
              placeholder='Email'
              autoComplete='off'
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id='confirmationCode'
              type='text'
              placeholder='Confirmation Code'
              autoComplete='off'
              error={errors.confirmationCode?.message}
              {...register('confirmationCode')}
            />
          </form>
          <Text as='small'>
            Didn&apos;t received the verfication code?{' '}
            <Text
              as='a'
              className='cursor-pointer text-xs text-blue-700 underline'
              onClick={() => alert('sending ...')}
            >
              Resend Code
            </Text>
          </Text>
          <DialogFooter>
            <Button
              form='user-verify-form'
              type='submit'
              className={buttonVariants({
                variant: 'default',
                className: 'w-full	',
              })}
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerifyUserDialog;
