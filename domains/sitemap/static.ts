import { stringify } from "xml";
import { formatDate } from "./_utils.ts";
import { getMicroCmsClient } from "@shared/micro_cms/client/mod.ts";
import { createFields } from "@shared/micro_cms/utils.ts";
import type { Item } from "./type.ts";
import type {
  MicroCMSList,
  Widget as OriginalWidget,
} from "@shared/micro_cms/type.ts";

const items: Item[] = [
  {
    loc: "https://mya-ake.com",
  },
];

const ids = ["privacy_policy"] as const;
const widgetFields = ["id", "updatedAt"] as const;
const fields = createFields(widgetFields);

type WidgetId = (typeof ids)[number];
type Widget = Pick<OriginalWidget, typeof widgetFields[number]>;
type Widgets = MicroCMSList<Widget>;
type WidgetMap<Id extends Widget["id"]> = Record<Id, Widget>;

async function createWidgetItems() {
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
      loc: "https://mya-ake.com/privacy_policy",
      lastmod: formatDate(widgetMap.privacy_policy.updatedAt),
    },
  ];
  return widgetItems;
}

export async function createStaticSitemap() {
  const widgetItems = await createWidgetItems();

  return stringify({
    urlset: {
      "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      url: [...items, ...widgetItems],
    },
  });
}
