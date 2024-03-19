import type { ICognitoUserPoolData } from 'amazon-cognito-identity-js';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const userPoolData: ICognitoUserPoolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID as string,
  ClientId: process.env.COGNITO_CLIENT_ID as string,
};

export const userPool = new CognitoUserPool(userPoolData);
