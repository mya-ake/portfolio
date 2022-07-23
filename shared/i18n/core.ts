import i18n from "i18next";
import { ja } from "./locales/mod.ts";

type Option = {
  lang: string;
};

export const init = async ({ lang }: Option) => {
  if (i18n.isInitialized) {
    return;
  }

  await i18n.init({
    lng: lang,
    resources: {
      ja,
    },
  });
};

export const translate = i18n.t;
