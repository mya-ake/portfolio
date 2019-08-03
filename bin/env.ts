import { envTask, deployConfigTask } from './../scripts/configs';
import consola from 'consola';

Promise.all([envTask(), deployConfigTask()]).catch(err => {
  consola.error(err);
  process.exit(1);
});
