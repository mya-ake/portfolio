import { globalCss } from "./core.ts";

export const globalStyles = globalCss({
  body: {
    color: "$text",
    backgroundColor: "$background",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
});
