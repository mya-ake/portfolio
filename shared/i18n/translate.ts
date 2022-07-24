import i18n from "i18next";
import { LocaleResouce } from "./locales/mod.ts";

type TranslateKey = `profile:${keyof LocaleResouce["profile"]}`;

// https://www.i18next.com/translation-function/essentials#overview-options
type TranslateOption = {
  defaultValue?: string;
};

export const translate = (
  key: TranslateKey | TranslateKey[],
  option?: TranslateOption
) => {
  return i18n.t(key, option);
};
