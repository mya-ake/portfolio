import { getWidgets, WidgetMap } from "@shared/widget/mod.ts";
import { defaultAppShellWidgetIds } from "@shared/ui/app_shells/services/default_app_shell_wedgets.ts";

const widgetIds = [
  "privacy_policy",
  ...defaultAppShellWidgetIds,
] as const;
type WidgetId = typeof widgetIds[number];

export type PrivacyPolicyWidgetMap = WidgetMap<WidgetId>;

export function getPrivacyPolicyWidgets(): Promise<PrivacyPolicyWidgetMap> {
  return getWidgets<WidgetId>(widgetIds);
}
