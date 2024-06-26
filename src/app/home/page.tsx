'use client';

import DashboardLayout from '@/components/dashboard/Layout';
import Home from '@/components/pages/home/Home';
import withAuth from '@/hoc/withAuth';

const HompePage = () => {
  return (
    <DashboardLayout>
      <Home />
    </DashboardLayout>
  );
};

export default withAuth(HompePage);
