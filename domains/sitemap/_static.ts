import { createLoc, formatDate } from "./_utils.ts";
import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { createFields } from "@shared/micro_cms/utils.ts";
import type { Item } from "./type.ts";
import type {
  MicroCMSList,
  Widget as OriginalWidget,
} from "@shared/micro_cms/type.ts";

const items: Item[] = [
  {
    loc: createLoc(""),
  },
];

// widgets
const ids = ["privacy_policy"] as const;
const widgetFields = ["id", "updatedAt"] as const;
const fields = createFields(widgetFields);

type WidgetId = (typeof ids)[number];
type Widget = Pick<OriginalWidget, typeof widgetFields[number]>;
type Widgets = MicroCMSList<Widget>;
type WidgetMap<Id extends Widget["id"]> = Record<Id, Widget>;

async function _createWidgetItems() {
  const client = getMicroCmsClient();
  const widgets = await client.get<Widgets>({
    resource: "widgets",
    ids: ids.map((i) => i),
    fields,
  });
  const widgetMap = widgets.contents.reduce<WidgetMap<WidgetId>>(
    (map, widget) => {
      map[widget.id as WidgetId] = widget;
      return map;
    },
    {} as WidgetMap<WidgetId>,
  );

  const widgetItems: Item[] = [
    {
      loc: createLoc("privacy_policy"),
      lastmod: formatDate(widgetMap.privacy_policy.updatedAt),
    },
  ];
  return widgetItems;
}

export async function createStaticItems() {
  const widgetItems = await _createWidgetItems();

  return [...items, ...widgetItems];
}
