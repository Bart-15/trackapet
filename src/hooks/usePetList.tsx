import { useQuery } from '@tanstack/react-query';

import { keys } from '@/react-query/constants';

import useAxiosPrivate from './useAxiosPrivate';

export default function usePetList() {
  const privateRequest = useAxiosPrivate();

  return useQuery({
    queryKey: [keys.petList],
    queryFn: async () => await privateRequest.get('/pets'),
    refetchOnMount: true,
  });
}
