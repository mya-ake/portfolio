import { shallowFilterObject } from "@shared/utils/object/filter.ts";
import type { CSS } from "./core.ts";
export { css } from "./core.ts";
export type { CSS, FontSize, FontWeight } from "./core.ts";

export function filterInvalidStyle(input: CSS): CSS {
  return shallowFilterObject(input, (_, value) => Boolean(value));
}
