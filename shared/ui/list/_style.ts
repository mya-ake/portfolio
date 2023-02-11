import { CSS, css } from "@shared/styles/css.ts";

const _baseListStyle = css({
  display: "grid",
  rowGap: "$2",
  margin: 0,
  listStylePosition: "outside",
});

export function baseListStyle(css?: CSS) {
  return _baseListStyle({
    css: {
      [`.${_baseListStyle}`]: {
        marginTop: "$2",
      },
      ...css,
    },
  });
}
