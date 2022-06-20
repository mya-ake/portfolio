import type { ReactNode } from 'react';
import type { AppError } from '~/types';

export type ErrorHandlerProps = {
  error?: AppError;
  children: ReactNode;
};
