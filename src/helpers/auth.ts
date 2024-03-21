import type { CognitoUserSession } from 'amazon-cognito-identity-js';

import { userPool } from '@/config/cognitoConfig';

export function getSession() {
  const cognitoUser = userPool.getCurrentUser();

  return new Promise((resolve, reject) => {
    if (!cognitoUser) {
      reject(new Error('No user found'));
      return;
    }
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session);
    });
  });
}
