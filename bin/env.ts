import { envTask } from './../scripts/configs';
import consola from 'consola';

envTask().catch(err => {
  consola.error(err);
  process.exit(1);
});
