import {
  Attributes,
  ClassAttributes,
  ComponentChildren,
  createElement,
  VNode,
} from "preact";

type ElementType = "a" | "button";

export function createActionComponent(
  type: ElementType,
  props: Attributes,
  children: ComponentChildren,
): VNode<(ClassAttributes<HTMLElement> & Attributes) | null> {
  const component = createElement(type, props, children);
  // Provide some core functionality.

  return component;
}
