// https://cloud.google.com/apis/design/errors
import { ERROR_CODES, ErrorCode } from './code';

export const getErrorCode = (status: number): ErrorCode => {
  switch (status) {
    case 200:
      return ERROR_CODES.OK;
    case 400:
      // Possible: FAILED_PRECONDITION / OUT_OF_RANGE
      return ERROR_CODES.INVALID_ARGUMENT;
    case 401:
      return ERROR_CODES.UNAUTHENTICATED;
    case 403:
      return ERROR_CODES.PERMISSION_DENIED;
    case 404:
      return ERROR_CODES.NOT_FOUND;
    case 409:
      // Possible: ABORTED
      return ERROR_CODES.ALREADY_EXISTS;
    case 429:
      return ERROR_CODES.RESOURCE_EXHAUSTED;
    case 499:
      return ERROR_CODES.CANCELLED;
    case 500:
      // Possible: DATA_LOSS / UNKNOWN
      return ERROR_CODES.INTERNAL;
    case 501:
      return ERROR_CODES.NOT_IMPLEMENTED;
    case 503:
      return ERROR_CODES.UNAVAILABLE;
    case 504:
      return ERROR_CODES.DEADLINE_EXCEEDED;
    default:
      return ERROR_CODES.UNKNOWN;
  }
};
