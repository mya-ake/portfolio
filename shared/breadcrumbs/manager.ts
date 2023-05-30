import { getHomeItem } from "./_config.ts";
import type { BreadcrumbItem } from "./components/Breadcrumbs.tsx";

export function createBreadcrumbs(
  ...items: BreadcrumbItem[]
): BreadcrumbItem[] {
  return [getHomeItem(), ...items];
}
