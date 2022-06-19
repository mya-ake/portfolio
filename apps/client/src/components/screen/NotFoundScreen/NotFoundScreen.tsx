import { BaseErrorScreen } from '../BaseErrorScreen';
import type { VFC } from 'react';

export const NotFoundScreen: VFC = () => {
  return <BaseErrorScreen title="404 Not Found" />;
};
