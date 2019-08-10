export const isEmptyString = (str: string) => {
  return str.length === 0;
};

export const isEmptyStringWithTrim = (str: string) => {
  return isEmptyString(str.trim());
};

export const hasExtension = (pathname: string) => {
  return pathname.includes('.');
};
