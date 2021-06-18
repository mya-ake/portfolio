export const removeBackslashOfHTMLAttribute = (html: string): string =>
  html.replace(/\\"/g, '"');
