import { useQuery } from '@tanstack/react-query';

import { axiosPublic } from '@/lib/axios';
import { keys } from '@/react-query/constants';
export default function useGetPet(id: string) {
  return useQuery({
    queryKey: [keys.pet],
    queryFn: async () => await axiosPublic.get(`/pet/${id}`),
    refetchOnMount: true,
    enabled: !!id,
  });
}
