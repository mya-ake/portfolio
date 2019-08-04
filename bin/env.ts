import { envTask, deployConfigTask } from './../scripts/configs';
import consola from 'consola';

(async () => {
  await envTask();
  await deployConfigTask();
})().catch(err => {
  consola.error(err);
  process.exit(1);
});
