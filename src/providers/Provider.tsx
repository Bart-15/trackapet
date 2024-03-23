'use client';

import '@/lib/Amplify';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/ui/sonner';
import AuthCognitoProvider from '@/context/CognitoProvider';
import { queryClient } from '@/react-query/queryClient';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCognitoProvider>{children}</AuthCognitoProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default Provider;
