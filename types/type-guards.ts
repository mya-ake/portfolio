export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

export const isNUll = (value: any): value is null => {
  return value === null;
};

export const isUndefined = (value: any): value is undefined => {
  return typeof value === 'undefined';
};
