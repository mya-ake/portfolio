import { Attributes, ComponentChildren, createElement } from "preact";

type ElementType = "a" | "button";

export function createActionComponent(
  type: ElementType,
  props: Attributes,
  children: ComponentChildren,
) {
  const component = createElement(type, props, children);
  // Provide some core functionality.

  return component;
}
