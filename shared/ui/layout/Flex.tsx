import { ComponentChildren } from "preact";
import { clsx } from "clsx";

type Props = {
  class?: string;
  children: ComponentChildren;
};

export function Flex(props: Props) {
  return <div class={clsx("flex", props.class)}>{props.children}</div>;
}
