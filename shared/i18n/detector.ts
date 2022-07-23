type Option = {
  acceptLanguageHeader: string;
};

let currentDetectedLang = "";

export const detectLang = (option?: Option) => {
  if (!option) {
    return currentDetectedLang;
  }
  currentDetectedLang = "ja";
  return currentDetectedLang;
};
