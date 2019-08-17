import { ResponseError } from './../models';

export const createNotFoundError = () => {
  return new ResponseError({ status: 404, message: 'Not Found.' });
};
