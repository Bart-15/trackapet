'use client';

import DashboardLayout from '@/components/dashboard/Layout';
import Settings from '@/components/pages/settings/Settings';
import withAuth from '@/hoc/withAuth';
const SettingsPage = () => {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  );
};

export default withAuth(SettingsPage);
