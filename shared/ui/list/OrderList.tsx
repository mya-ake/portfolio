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

export function OrderList(props: Props) {
  const { children } = props;

  return (
    <ol
      class={style({
        css: {
          display: "grid",
          rowGap: "$2",
        },
      })}
    >
      {children}
    </ol>
  );
}
