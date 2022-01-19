import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const getUserPool = (poolData) => new CognitoUserPool(poolData);
