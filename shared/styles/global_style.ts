import { globalCss } from "@shared/stitches.ts";

export const globalStyles = globalCss({
  body: {
    color: "$gray100",
    backgroundColor: "$gray800",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
});
