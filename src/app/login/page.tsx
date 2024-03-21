'use client';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import Login from '@/components/pages/login/Login';
import { AuthCognitoContext } from '@/context/AuthCognitoProvider';

const LoginPage = () => {
  const router = useRouter();

  const cognito = useContext(AuthCognitoContext);
  if (!cognito) throw new Error('Cognito context is undefined');

  const { user, isLoading } = cognito;

  useEffect(() => {
    const loginRedirect = async () => {
      if (user !== null) {
        router.push('/home');
      }
    };

    loginRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  return <Login />;
};

export default LoginPage;
