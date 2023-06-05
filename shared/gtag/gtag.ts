/// <reference types="./type.d.ts" />

type Gtag = {
  (action: "js", date: Date): void;
  (
    action: "config",
    value: string,
    option?: Record<string, string | boolean | number>,
  ): void;
};

export const gtag: Gtag = (...args) => {
  window.dataLayer.push(args);
};
