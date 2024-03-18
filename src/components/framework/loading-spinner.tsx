import { Icons } from '@/components/Icons';

export const LoadingSpinnerWithBackDrop = () => (
  <div className='z-40 h-full'>
    <div className='fixed inset-0 bg-background/80' />
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-white'>
      <Icons.spinner className='mr-2 h-40 w-40 animate-spin text-black' />
    </div>
  </div>
);

export const LoadingSpinner = () => (
  <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-white'>
    <Icons.spinner className='mr-2 h-40 w-40 animate-spin text-black' />
  </div>
);
