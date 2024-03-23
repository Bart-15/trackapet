/** @format */
'use client';

import { useContext, useState } from 'react';

import { Nav } from '../ui/nav';

type Props = {};

import { AuthCognitoContext } from '@/context/CognitoProvider';
import { useWindowWidth } from '@/hooks/useWindowWidth';

import { Icons } from '../Icons';
import { Button } from '../ui/button';

export default function SideNavbar({}: Props) {
  const cognito = useContext(AuthCognitoContext);
  if (!cognito) throw new Error('Cognito context is undefined');

  const { handleSignout } = cognito;

  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className='relative min-w-[80px] border-r px-3  pb-10 pt-24 '>
      {!mobileWidth && (
        <div className='absolute right-[-20px] top-7'>
          <Button
            onClick={toggleSidebar}
            variant='secondary'
            className=' rounded-full p-2'
          >
            <Icons.ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: 'Dashboard',
            href: '/home',
            icon: Icons.LayoutDashboard,
            variant: 'default',
          },
          {
            title: 'My Pets',
            href: '/my-pets',
            icon: Icons.PawPrint,
            variant: 'ghost',
          },
          {
            title: 'Settings',
            href: '/settings',
            icon: Icons.settings,
            variant: 'ghost',
          },
          {
            title: 'Logout',
            href: '',
            icon: Icons.LogOut,
            variant: 'ghost',
            clickAction: handleSignout,
          },
        ]}
      />
    </div>
  );
}
