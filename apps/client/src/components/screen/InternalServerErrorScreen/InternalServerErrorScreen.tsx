import { BaseErrorScreen } from '../BaseErrorScreen';
import type { VFC } from 'react';

export const InternalServerErrorScreen: VFC = () => {
  return <BaseErrorScreen title="500 Internal Server Error" />;
};
