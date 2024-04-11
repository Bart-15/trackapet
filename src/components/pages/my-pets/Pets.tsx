import PageTitle from '@/components/common/PageTitle';
import { LoadingSpinner } from '@/components/framework/loading-spinner';
import usePetList from '@/hooks/my-pets/usePetList';

import { defaultColumns } from './table/columns';
import { DataTable as PetsTable } from './table/data-table';
const Pets = () => {
  const { data, isLoading } = usePetList();

  return (
    <>
      <PageTitle title='My Pets' className='font-semibold' />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <PetsTable columns={defaultColumns} data={data?.data.pets} />
      )}
    </>
  );
};

export default Pets;
