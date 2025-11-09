import { config } from 'dotenv';
import { finishApp, createAnApp } from './app';
import { getSecret } from './configuration';
import { connectMongo } from './utils/connect-db';

(async () => {
  config({ path: '.env' });
  connectMongo();

  const { port } = getSecret();
  const app = createAnApp();

  app.get('/health-check', (req, res) => {
    res.send('App is healthy 💚');
  });

  finishApp(app);

  try {
    await app.listen(port, () => {
      console.log(`Yes, the app is up and running at ${port} 🎉`);
    });
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
})();
