/// <reference types="./type.d.ts" />

type Gtag = {
  (command: "js", date: Date): void;
  (
    command: "consent",
    type: "default",
    option?: Record<string, string>,
  ): void;
  (
    command: "config",
    id: string,
    option?: Record<string, string | boolean | number>,
  ): void;
};

export const gtag: Gtag = function () {
  window.dataLayer.push(arguments);
};
