import { z } from "zod";
import { FetchError } from "@shared/fetch/error.ts";

const Config = z.object({
  apiKey: z.string().min(1),
  endpoint: z.string().min(1),
});
type Config = z.infer<typeof Config>;

type Resource = "posts";
export type RequestParameter = {
  resource: Resource;
  id?: string;
  fields?: string;
  orders?: "-publishedAt";
  limit?: number;
  offset?: number;
  richEditorFormat?: "html" | "object";
};

export class MicroCmsClient {
  #config: Config;

  constructor() {
    this.#config = this.#init();
  }

  #init() {
    const apiKey = Deno.env.get("MICRO_CMS_API_KEY");
    const endpoint = Deno.env.get("MICRO_CMS_API_ENDPOINT");

    return Config.parse({ apiKey, endpoint });
  }

  fetch(parameter: RequestParameter, config: RequestInit) {
    const { resource, id, ...rest } = parameter;
    const pathname = ["api", "v1", resource, id].filter(
      Boolean,
    ).join("/");
    const url = new URL(pathname, this.#config.endpoint);
    Object.entries(rest).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
    const request = new Request(url, {
      ...config,
      headers: {
        "X-MICROCMS-API-KEY": this.#config.apiKey,
        ...config.headers,
      },
    });
    return fetch(request);
  }

  get<Data>(parameter: RequestParameter): Promise<Data> {
    return this.fetch(parameter, { method: "get" }).then((res) => {
      if (res.ok === false) {
        throw new FetchError(res.statusText, res);
      }
      return res.json();
    });
  }
}
