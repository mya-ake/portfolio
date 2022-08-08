import { ComponentChildren, JSX } from "preact";
import { createActionComponent } from "@core/ui/create_action_component.ts";

export type InternalLinkProps = JSX.HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ComponentChildren;
};

export function InternalLink(props: InternalLinkProps) {
  const { children, ...restProps } = props;
  return createActionComponent("a", {
    ...restProps,
  }, children);
}
