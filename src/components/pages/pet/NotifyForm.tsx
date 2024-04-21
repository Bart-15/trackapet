import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNotifyOwner } from '@/hooks/my-pets/useNotifyOwner';
import {
  notifyOnwerPayload,
  NotifyOwnerValidationSchema,
} from '@/validation/notifyOwner.validation';
interface NotifyFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const NotifyForm = ({ id, open, setOpen }: NotifyFormProps) => {
  const notify = useNotifyOwner(id);

  const form = useForm<notifyOnwerPayload>({
    mode: 'onChange',
    resolver: zodResolver(NotifyOwnerValidationSchema),
    defaultValues: {
      email: '',
      message: '',
      location: '',
      mobileNumber: '',
    },
  });

  useEffect(() => {
    form.reset();
  }, [open]);

  async function handleNotifyOwner(values: notifyOnwerPayload) {
    const payload = { ...values };
    console.log(payload);

    const response = await notify.mutateAsync(payload);

    if (response.status === 200) {
      setOpen(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-h-[500px] overflow-y-auto sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Notify the owner</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className='flex flex-col gap-2'
            onSubmit={form.handleSubmit(handleNotifyOwner)}
            id='notify-owner-form'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Your Email Address'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='mobileNumber'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Mobile number'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder='Your message' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Your location'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            isLoading={notify.isPending}
            type='submit'
            form='notify-owner-form'
          >
            Notify owner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyForm;
