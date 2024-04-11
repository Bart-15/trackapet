import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

import {
  errorToast,
  infoToast,
  successToast,
} from '@/components/framework/toast';

import useAxiosPrivate from '../useAxiosPrivate';

export function useUploadPhoto() {
  const [presignedUrl, setPresignedUrl] = useState<string>('');

  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (payload: { photo: string }) =>
      await axiosPrivate.post('/pet/uploadPetPhoto', payload),
    onMutate: () => {
      infoToast({
        message: 'Please wait, processing upload ...',
      });
    },
    onSuccess: (data) => {
      setPresignedUrl(data.data?.presignedURL);
      successToast({
        message: 'Pet photo sucessfully uploaded to s3 bucket',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        errorToast({
          message: `${error?.response?.data.errorMessage}`,
        });
      }
    },
  });

  return {
    mutation,
    presignedUrl,
    setPresignedUrl,
  };
}
