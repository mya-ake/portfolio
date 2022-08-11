/** @jsx h */
import { ComponentChildren, h } from "preact";
import { css } from "@shared/styles/css.ts";

const style = css({
  margin: 0,
  listStylePosition: "outside",
});

type ListStyleType = "disc" | "none";
type Props = {
  children: ComponentChildren;
  listStyleType?: ListStyleType;
};

const computePadding = (listStyleType: ListStyleType) => {
  switch (listStyleType) {
    case "disc":
      return "0 0 0 $4";
    default:
      return "0";
  }
};

export function StyledUnorderList(props: Props) {
  const { children, listStyleType = "disc" } = props;

  return (
    <ul
      class={style({
        css: {
          padding: computePadding(listStyleType),
          listStyleType,
        },
      })}
    >
      {children}
    </ul>
  );
}
