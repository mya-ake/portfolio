import { translate } from "@shared/i18n/mod.ts";
import type { BreadcrumbItem } from "./components/Breadcrumbs.tsx";

export function getHomeItem(): BreadcrumbItem {
  return {
    label: translate("home:name"),
    to: "/",
  };
}
