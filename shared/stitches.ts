import { createStitches, CSS } from "stitches";
export type { CSS };
export const { css, getCssText, reset, globalCss } = createStitches({
  theme: {
    colors: {
      gray100: "#f3f4f6",
      gray800: "#1e293b",
    },
    space: {
      1: "0.25rem",
      2: "0.5rem",
      4: "1rem",
    },
    sizes: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontSizes: {
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
  },
  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
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
    mx: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    container: () => ({
      mx: "auto",
      "@sm": {
        maxWidth: "$sm",
      },
      "@md": {
        maxWidth: "$md",
      },
    }),
  },
});
