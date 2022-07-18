import { createStitches, CSS } from "stitches";
export type { CSS };
export const { css, getCssText, reset, globalCss } = createStitches({
  theme: {
    colors: {
      gray100: "#f3f4f6",
      gray800: "#1e293b",
    },
    space: {
      2: "0.5rem",
    },
    fontSizes: {
      base: "1rem",
      "2xl": "1.5rem",
    },
  },
  utils: {
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});
