import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { errorToast, successToast } from '@/components/framework/toast';
import { axiosPublic } from '@/lib/axios';
import { keys } from '@/react-query/constants';
import { notifyOnwerPayload } from '@/validation/notifyOwner.validation';

export function useNotifyOwner(id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: notifyOnwerPayload) =>
      await axiosPublic.post(`/pet/alertOwner/${id}`, payload),
    onSuccess: () => {
      successToast({
        message: 'Owner notified successfully!',
      });

      queryClient.invalidateQueries({ queryKey: [keys.pet] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        errorToast({
          message: `${error?.response?.data.message}`,
        });
      }
    },
  });

  return mutation;
}
