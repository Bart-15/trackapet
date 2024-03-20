import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { userPool } from '@/config/cognitoConfig';

const Home = () => {
  const router = useRouter();

  function signOut() {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.globalSignOut({
        onSuccess: () => {
          router.push('/login');
        },
        onFailure: () => {},
      });
    }
  }

  return (
    <div className='container'>
      <Button onClick={signOut}>Signout</Button>
    </div>
  );
};

export default Home;
