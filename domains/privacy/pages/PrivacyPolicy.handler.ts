import { page } from "fresh";
import type { FreshContext } from "fresh";
import { pageCacheHeaders } from "@shared/middleware/cache.ts";
import {
  getPrivacyPolicyWidgets,
  PrivacyPolicyWidgetMap,
} from "./resource/mod.ts";

export type Data = {
  widgetMap: PrivacyPolicyWidgetMap;
};

export const handler = {
  async GET(_ctx: FreshContext) {
    const widgetMap = await getPrivacyPolicyWidgets();
    const data: Data = {
      widgetMap,
    };
    return page(data, {
      headers: pageCacheHeaders({ time: 60 * 60 * 24 * 7 }),
    });
  },
};
