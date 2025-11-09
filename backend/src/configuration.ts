export const getSecret = () => ({
  port: process.env.PORT || 8000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/walletwise',
});
