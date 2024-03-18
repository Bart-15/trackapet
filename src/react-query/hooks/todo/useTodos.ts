import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

async function fetchTodos() {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/todos/',
  );

  return data;
}

function useTodos(): UseQueryResult {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  });

  return result;
}

export default useTodos;
