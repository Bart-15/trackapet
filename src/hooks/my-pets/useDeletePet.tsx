import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { errorToast, successToast } from '@/components/framework/toast';
import { keys } from '@/react-query/constants';

import useAxiosPrivate from '../useAxiosPrivate';

export function useDeletePet() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (id: string) => await axiosPrivate.delete(`/pet/${id}`),
    onSuccess: () => {
      successToast({
        message: 'Pet successfully deleted',
      });

      queryClient.invalidateQueries({ queryKey: [keys.petList] });
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
