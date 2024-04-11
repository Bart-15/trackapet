import { useQuery } from '@tanstack/react-query';

import { keys } from '@/react-query/constants';

import useAxiosPrivate from '../useAxiosPrivate';

export default function usePetList() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [keys.petList],
    queryFn: async () => await axiosPrivate.get('/pets'),
    refetchOnMount: true,
  });
}
