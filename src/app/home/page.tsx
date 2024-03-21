'use client';

import Home from '@/components/pages/home/Home';
import withAuth from '@/hoc/withAuth';

const HompePage = () => {
  return <Home />;
};

export default withAuth(HompePage);
