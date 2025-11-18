export const getSecret = () => ({
  port: process.env.PORT || 8000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/walletwise',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
});
