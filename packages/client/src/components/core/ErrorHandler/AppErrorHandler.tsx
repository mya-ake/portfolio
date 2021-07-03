import { DefaultLayout } from '~/components/layout';
import { ErrorHandler } from './ErrorHandler';
import type { FC } from 'react';
import type { ErrorHandlerProps } from './ErrorHandler.type';

export const AppErrorHandler: FC<ErrorHandlerProps> = ({ error, children }) => {
  if (!error) {
    return <>{children}</>;
  }

  return (
    <DefaultLayout>
      <ErrorHandler error={error}>{children}</ErrorHandler>
    </DefaultLayout>
  );
};
