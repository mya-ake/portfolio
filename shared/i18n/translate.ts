import i18n from "i18next";
import { LocaleResouce } from "./locales/mod.ts";

type TranslateKey =
  | `profile:${keyof LocaleResouce["profile"]}`
  | `description:${keyof LocaleResouce["description"]}`
  | `footer:${keyof LocaleResouce["footer"]}`
  | `home:${keyof LocaleResouce["home"]}`
  | `posts:${keyof LocaleResouce["posts"]}`
  | `social:${keyof LocaleResouce["social"]}`
  | `immutable:${keyof LocaleResouce["immutable"]}`;

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
