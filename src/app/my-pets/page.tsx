'use client';

import DashboardLayout from '@/components/dashboard/Layout';
import Pets from '@/components/pages/my-pets/Pets';
import withAuth from '@/hoc/withAuth';

const MyPetsPage = () => {
  return (
    <DashboardLayout>
      <Pets />
    </DashboardLayout>
  );
};

export default withAuth(MyPetsPage);
