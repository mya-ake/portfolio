import { getWidgets, WidgetMap } from "@shared/widget/mod.ts";
import { defaultAppShellWidgetIds } from "@shared/ui/app_shells/services/default_app_shell_wedgets.ts";

const widgetIds = [
  "home_about",
  "home_recent_activities",
  ...defaultAppShellWidgetIds,
] as const;
type WidgetId = typeof widgetIds[number];

export type HomeWidgetMap = WidgetMap<WidgetId>;

export function getHomeWidgets(): Promise<HomeWidgetMap> {
  return getWidgets<WidgetId>(widgetIds);
}
