import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { createInstantCache } from "@shared/cache/local/instant_cache.ts";
import { getUseMicroCMSCache } from "@shared/env/mod.ts";
import { createFields } from "@shared/micro_cms/utils.ts";
import type {
  MicroCMSList,
  Widget as OriginalWidget,
} from "@shared/micro_cms/type.ts";

const widgetFields = ["id", "content"] as const;
const fields = createFields(widgetFields);

export type Widget = Pick<OriginalWidget, typeof widgetFields[number]>;
export type Widgets = MicroCMSList<Widget>;
export type WidgetMap<Id extends Widget["id"]> = Record<Id, Widget["content"]>;

async function getWidgetsFromCMS<Id extends Widget["id"]>(
  ids: readonly Id[],
): Promise<WidgetMap<Id>> {
  const client = getMicroCmsClient();
  const widgets = await client.get<Widgets>({
    resource: "widgets",
    ids: ids.map((i) => i),
    fields,
    richEditorFormat: "html",
  });

  return widgets.contents.reduce<WidgetMap<Id>>((map, widget) => {
    map[widget.id as Id] = widget.content;
    return map;
  }, {} as WidgetMap<Id>);
}

export const getWidgets = getUseMicroCMSCache()
  ? createInstantCache("widget")(getWidgetsFromCMS)
  : getWidgetsFromCMS;
