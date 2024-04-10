import { fetchAuthSession } from 'aws-amplify/auth';
import { useContext, useEffect } from 'react';

import { AuthCognitoContext } from '@/context/CognitoProvider';
import { axiosPrivate } from '@/lib/axios';

const useAxiosPrivate = () => {
  const cognito = useContext(AuthCognitoContext);
  if (!cognito) throw new Error('Cognito context is undefined');

  const { idToken, user } = cognito;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers?.['Authorization']) {
          config.headers['Authorization'] = `Bearer ${idToken}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;
        if (error?.response?.status === 401 && !prevReq?.sent) {
          prevReq.sent = true;
          const { tokens } = await fetchAuthSession({ forceRefresh: true });
          const newIdToken = tokens?.idToken?.toString();

          prevReq.headers['Authorization'] = `Bearer ${newIdToken}`;
          return axiosPrivate(prevReq);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.request.eject(responseIntercept);
    };
  }, [user]);

  return axiosPrivate;
};

export default useAxiosPrivate;
