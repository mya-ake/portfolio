import type { BreadcrumbItem } from "@shared/breadcrumbs/components/Breadcrumbs.tsx";

// The editorial masthead is shown only on Home. `createBreadcrumbs()` always
// prepends the home item, so Home is exactly `[homeItem]` (length 1) while every
// sub-page adds at least one more crumb (length >= 2).
export function shouldShowMasthead(breadcrumbs: BreadcrumbItem[]): boolean {
  return breadcrumbs.length <= 1;
}
