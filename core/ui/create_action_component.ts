import { ComponentChildren, createElement, VNode } from "preact";

type ElementType = "a" | "button";

export function createActionComponent<P = Record<string, unknown>>(
  type: ElementType,
  props: P,
  children: ComponentChildren,
): VNode<P> {
  const component = createElement(type, props, children);
  // Provide some core functionality.

  return component;
}
