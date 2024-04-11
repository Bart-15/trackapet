import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { errorToast, successToast } from '@/components/framework/toast';
import { keys } from '@/react-query/constants';

import useAxiosPrivate from '../useAxiosPrivate';

type RequestPayload = {
  name: string;
  species: string;
  breed: string;
  size: string;
  color: string;
  age: number;
  weight: number;
  temperament: string;
  fullAddress: string;
  birthDate: string;
  photo: string;
  notifiedCount: number;
};

export function useCreatePet() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (payload: RequestPayload) =>
      await axiosPrivate.post('/pet', payload),
    onSuccess: () => {
      successToast({
        message: 'Pet successfully created',
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
