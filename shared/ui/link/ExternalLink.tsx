import { ComponentChildren, JSX } from "preact";
import { createActionComponent } from "@core/ui/create_action_component.ts";

export type ExternalLinkProps = JSX.HTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ComponentChildren;
};

export function ExternalLink(props: ExternalLinkProps) {
  const { children, ...restProps } = props;
  return createActionComponent("a", {
    rel: "noopener noreferrer",
    target: "_blank",
    ...restProps,
  }, children);
}
