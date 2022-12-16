/** @jsx h */
import { ComponentChildren, h } from "preact";
import { CSS, css } from "@shared/styles/css.ts";

const style = css({
  display: "block",
});

type Props = {
  children: ComponentChildren;
  css?: CSS;
};

export function Box(props: Props) {
  const { children, css = {} } = props;

  const className = style({
    css,
  });

  return <div class={className}>{children}</div>;
}
