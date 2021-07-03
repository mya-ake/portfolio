import { ErrorCode } from '@mya-ake-com/error';

export type Error = {
  message?: string;
  code?: ErrorCode;
};

export type ErrorHandlerProps = {
  error?: Error;
};
