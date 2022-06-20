export const decideExternalUrl = (value: string): boolean => {
  return /^https?:\/\//.test(value);
};
