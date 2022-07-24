type Option = {
  acceptLanguageHeader: string;
};

let currentDetectedLang = "";

export const detectLang = (option?: Option) => {
  if (!option) {
    return currentDetectedLang;
  }
  // TODO: Implement.
  currentDetectedLang = "ja";
  return currentDetectedLang;
};

export const getCurrentLang = () => {
  if (currentDetectedLang === "") {
    throw new Error("[i18n] Language not detected.");
  }
  return currentDetectedLang;
};
