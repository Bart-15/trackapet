/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,

    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_COGNITO_POOL_ID: process.env.AWS_COGNITO_POOL_ID,
    AWS_COGNITO_APP_CLIENT_ID: process.env.AWS_COGNITO_APP_CLIENT_ID,
    AWS_COGNITO_IDENTITY_POOL_ID: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
