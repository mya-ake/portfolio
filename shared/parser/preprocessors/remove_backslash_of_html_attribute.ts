import type { Preprocessor } from "../html_parser.ts";

export const removeBackslashOfHTMLAttribute: Preprocessor = (html) =>
  html.replace(/\\"/g, '"');
