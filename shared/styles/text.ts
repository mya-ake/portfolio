import { css } from "@shared/stitches.ts";

export const baseHeadingStyle = css({
  margin: "0",
});

export const h1Style = () => baseHeadingStyle({
  css: {
    fontWeight: "bold",
  },
});
