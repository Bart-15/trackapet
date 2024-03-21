import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import { AuthCognitoContext } from '@/context/AuthCognitoProvider';

const Home = () => {
  const cognito = useContext(AuthCognitoContext);
  if (!cognito) throw new Error('Cognito context is undefined');

  const { signOut } = cognito;

  return (
    <div className='container'>
      <Button onClick={signOut}>Signout</Button>
    </div>
  );
};

export default Home;
