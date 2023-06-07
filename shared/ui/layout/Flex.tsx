import { ComponentChildren } from "preact";
import { CSS, css, filterInvalidStyle } from "@shared/styles/css.ts";

const style = css({
  display: "flex",
});

type Props = {
  gap?: CSS["gap"];
  justifyContent?: CSS["justifyContent"];
  alignItems?: CSS["alignItems"];
  children: ComponentChildren;
  css?: CSS;
};

export function Flex(props: Props) {
  const { children, css = {} } = props;

  const className = style({
    css: {
      ...filterInvalidStyle({
        gap: props.gap,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
      }),
      ...css,
    },
  });

  return <div class={className}>{children}</div>;
}
