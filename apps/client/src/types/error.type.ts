import { ErrorCode } from '@mya-ake-com/error';

export type AppError = {
  code: ErrorCode;
  message?: string;
};
