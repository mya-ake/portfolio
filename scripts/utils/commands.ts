import spawnCommand from 'cross-spawn';
import { ChildProcess } from 'child_process';

type spawn = (
  command: string,
  args?: string[],
  options?: { pararel?: boolean },
) => Promise<ChildProcess>;

export const spawn: spawn = (command, args = [], options = {}) => {
  return new Promise((resolve, reject) => {
    const { pararel = false } = options;

    const ps = spawnCommand(command, args, { stdio: 'inherit' });

    ps.on('error', data => {
      reject(data);
    });
    ps.on('close', () => {
      resolve(ps);
    });
    ps.on('exit', data => {
      if (data === 0) {
        return;
      }
      reject(data);
    });

    if (pararel) {
      resolve(ps);
      return;
    }
  });
};
