import type {
  ClientError,
  GraphQLResponse,
  GraphQLError,
} from 'graphql-request/dist/types';
import type { AppError } from '~/types';
import type { ErrorCode } from '@mya-ake-com/error';

type GraphQLErrorWithExtensions = GraphQLError & {
  extensions: {
    code: ErrorCode;
  };
};

const isClientError = (value: unknown): value is ClientError => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return 'response' in value;
};

const createLocalGraphQLError = (
  message: string,
  code?: ErrorCode,
): GraphQLErrorWithExtensions => {
  return {
    message,
    path: [],
    locations: [],
    extensions: {
      code: code ?? 'UNKNOWN',
    },
  };
};

export const handleError = (value: unknown): GraphQLResponse => {
  if (!isClientError(value)) {
    return {
      status: 500, // TODO: The appropriate value may vary, as it may not be strictly server-based.
      errors: [createLocalGraphQLError('unknown response')],
    };
  }
  return value.response;
};

export const convertAppError = (errors: GraphQLError[]): AppError => {
  const { message, extensions } = errors[0] as GraphQLErrorWithExtensions;
  return {
    message,
    code: extensions?.code,
  };
};
