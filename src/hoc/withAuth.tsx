'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { LoadingSpinner } from '@/components/framework/loading-spinner';
import { AuthCognitoContext } from '@/context/CognitoProvider';

interface ProtectedComponentProps {
  // Define any specific props for your wrapped component here
}
export function withAuth<P>(
  Component: React.ComponentType<P>,
): React.FC<P & ProtectedComponentProps> {
  return function ProtectedComponent(props: P & ProtectedComponentProps) {
    const pathname = usePathname();
    const router = useRouter();

    const cognito = useContext(AuthCognitoContext);
    if (!cognito) throw new Error('Cognito context is undefined');

    const { user, loading } = cognito;

    useEffect(() => {
      const loginRedirect = async () => {
        if (!user && !loading) {
          localStorage.setItem('redirectTo', pathname);
          router.push('/');

          return;
        }
      };

      loginRedirect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (loading) {
      return <LoadingSpinner />;
    }

    return user && <Component {...props} />;
  };
}

export default withAuth;
