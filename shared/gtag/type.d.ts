interface Window {
  dataLayer: unknown[];
  gtag: {
    (action: "js", date: Date): void;
    (action: "config", value: string): void;
  };
}
