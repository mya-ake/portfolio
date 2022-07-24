import i18n from "i18next";
import { LocaleResouce } from "./locales/mod.ts";

type TranslateKey =
  | `profile:${keyof LocaleResouce["profile"]}`
  | `footer:${keyof LocaleResouce["footer"]}`;

// https://www.i18next.com/translation-function/essentials#overview-options
type TranslateOption = {
  defaultValue?: string;
} & Record<string, string>;

export const translate = (
  key: TranslateKey | TranslateKey[],
  option?: TranslateOption,
) => {
  return i18n.t(key, option);
};
