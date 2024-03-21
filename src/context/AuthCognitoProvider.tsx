import type { CognitoUser } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { userPool } from '@/config/cognitoConfig';

interface IAuthCognitoProviderProps {
  children: React.ReactNode;
}

interface AuthCognitoContextProps {
  user: CognitoUser | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<CognitoUser | null>>;
  signOut: () => void;
}

export const AuthCognitoContext = createContext<
  AuthCognitoContextProps | undefined
>(undefined);

const AuthCognitoProvider = ({ children }: IAuthCognitoProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<CognitoUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getCurrentUser() {
    try {
      setIsLoading(true);
      const user = await userPool.getCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      await getCurrentUser();
    }

    init();
  }, []);

  async function signOut() {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      await cognitoUser.signOut();
      setUser(null);
      router.push('/login');
    }
  }

  // return values
  const authValues = {
    user,
    isLoading,
    setUser,
    signOut,
  };

  return (
    <AuthCognitoContext.Provider value={authValues}>
      {children}
    </AuthCognitoContext.Provider>
  );
};

export default AuthCognitoProvider;
