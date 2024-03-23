import { AuthUser, getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { successToast } from '@/components/framework/toast';

interface IAuthCognitoProviderProps {
  children: React.ReactNode;
}

interface AuthCognitoContextProps {
  isAuth: boolean;
  loading: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  handleSignout: () => void;
  getAuthUser: () => void;
}

export const AuthCognitoContext = createContext<
  AuthCognitoContextProps | undefined
>(undefined);

const AuthCognitoProvider = ({ children }: IAuthCognitoProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function getAuthUser() {
    try {
      const authUser = await getCurrentUser();
      setUser(authUser);
    } catch (error) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuthUser();
  }, []);

  async function handleSignout() {
    setIsAuth(false);

    await signOut();
    successToast({
      message: 'Successfully Logout',
    });
    setUser(null);

    router.push('/login');
  }

  // return values
  const authValues = {
    isAuth,
    setIsAuth,
    user,
    setUser,
    handleSignout,
    getAuthUser,
    loading,
  };

  return (
    <AuthCognitoContext.Provider value={authValues}>
      {children}
    </AuthCognitoContext.Provider>
  );
};

export default AuthCognitoProvider;
