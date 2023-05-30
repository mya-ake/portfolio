import { createStitches, CSS as BaseCSS } from "stitches";

export type FontSize =
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";
const createFontSize = (sizes: Record<FontSize, string>) => sizes;

export type FontWeight = BaseCSS["fontWeight"];

const sizes = {
  1: "4px",
  2: "8px",
  4: "16px",
  8: "32px",
  12: "48px",
  16: "64px",
};

export const stitches = createStitches({
  theme: {
    colors: {
      text: "#f3f4f6", // #gray100
      background: "#1e293b", // gray800
      link: "#7dd3fc", // sky300
      code: "#f3f4f6", // #gray100
      codeBackground: "#4b5563", // #gray600
    },
    space: {
      ...sizes,
    },
    sizes: {
      ...sizes,
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontSizes: createFontSize({
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    }),
    radii: {
      4: "4px",
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
    my: (value: string) => ({
      marginTop: value,
      marginBottom: value,
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

type Config = typeof stitches.config;
type CSS = BaseCSS<Config>;
export type { CSS };
