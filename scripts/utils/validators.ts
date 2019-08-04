export const truthyProperties = (object: Object): boolean => {
  return Object.values(object).every(values => !!values);
};
