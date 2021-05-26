import type { PageInfo, ConnectionInput } from '../../generated/resolvers';

export const createPageInfo = (): PageInfo => {
  const pageInfo: PageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
    endCursor: '',
  };
  return pageInfo;
};

export const hasNextPage = (
  input: ConnectionInput,
  responseLength: number,
): boolean => {
  if (input.first) {
    return input.first < responseLength;
  }
  if (input.last) {
    return input.before ? true : false;
  }
  return false;
};

export const hasPreviousPage = (
  input: ConnectionInput,
  responseLength: number,
): boolean => {
  if (input.first) {
    return input.after ? true : false;
  }
  if (input.last) {
    return input.last < responseLength;
  }
  return false;
};
