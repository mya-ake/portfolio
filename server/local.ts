import { app } from './app';
import { nuxt, config } from './core/nuxt';
// @ts-ignore
import { Builder } from 'nuxt';
import consola from 'consola';
import { HOST, PORT } from './env/config';

const start = async () => {
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.listen(Number(PORT), HOST, () => {
    consola.ready({
      message: `Server listening on http://${HOST}:${PORT}`,
      badge: true,
    });
  });
};

start();
