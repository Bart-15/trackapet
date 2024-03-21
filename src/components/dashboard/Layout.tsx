import SideNavbar from '../navbar/SideNavbar';
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen w-full bg-white text-black'>
      <SideNavbar />
      <div className='flex w-full flex-col gap-5'>
        <div className='w-full p-8'>
          <div className='flex w-full flex-col gap-5'>{children}</div>
        </div>{' '}
      </div>
    </div>
  );
};

export default DashboardLayout;
