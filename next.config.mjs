/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  },
};

export default nextConfig;
