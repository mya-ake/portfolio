import type { Handlers } from "$fresh/server.ts";
import { cacheMiddleware } from "@shared/middleware/cache.ts";
import {
  getPrivacyPolicyWidgets,
  PrivacyPolicyWidgetMap,
} from "./resource/mod.ts";

export type Data = {
  widgetMap: PrivacyPolicyWidgetMap;
};

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const widgetMap = await getPrivacyPolicyWidgets();
    const data: Data = {
      widgetMap,
    };

    const resp = await ctx.render(data);
    cacheMiddleware(resp, { time: 60 * 60 * 24 * 7 });
    return resp;
  },
};
