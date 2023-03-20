import { getWidgets } from "@shared/widget/mod.ts";
import { Props } from "../DefaultAppShell.tsx";

export type DefaultAppShellWidgetMap = Props["widgetMap"];

export const defaultAppShellWidgetIds: (keyof DefaultAppShellWidgetMap)[] = [
  "footer_bio",
];
export function getDefaultAppShellWidgetMap(): Promise<
  DefaultAppShellWidgetMap
> {
  return getWidgets(defaultAppShellWidgetIds);
}
