import { NotFoundScreen, InternalServerErrorScreen } from '~/components/screen';
import type { FC } from 'react';
import type { ErrorHandlerProps } from './ErrorHandler.type';

export const ErrorHandler: FC<ErrorHandlerProps> = ({ error, children }) => {
  if (!error) {
    return <>{children}</>;
  }

  switch (error.code) {
    case 'NOT_FOUND':
      return <NotFoundScreen />;
    default:
      return <InternalServerErrorScreen />;
  }
};
