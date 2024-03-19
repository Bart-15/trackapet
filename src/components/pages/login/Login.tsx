import { useState } from 'react';

import Container from './Container';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
const Login = () => {
  const [noAccount, setNoAccount] = useState<boolean>(false);

  return (
    <div className='flex h-screen items-center justify-center'>
      <Container>
        {noAccount ? (
          <SignupForm setNoAccount={setNoAccount} />
        ) : (
          <LoginForm setNoAccount={setNoAccount} />
        )}
      </Container>
    </div>
  );
};

export default Login;
