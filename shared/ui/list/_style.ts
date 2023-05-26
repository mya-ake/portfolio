import { CSS, css } from "@shared/styles/css.ts";

const _baseListStyle = css({
  display: "grid",
  margin: 0,
  listStylePosition: "outside",
});

export function baseListStyle(css?: CSS) {
  return _baseListStyle({
    css: {
      ...css,
    },
  });
}
