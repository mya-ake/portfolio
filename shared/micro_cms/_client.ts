import { z } from "zod";
import { FetchError } from "@shared/fetch/error.ts";

const Config = z.object({
  apiKey: z.string(),
  endpoint: z.string(),
});
type Config = z.infer<typeof Config>;

type Resource = "posts";
type RequestParameter = {
  resource: Resource;
  id?: string;
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
    const pathname = ["api", "v1", parameter.resource, parameter.id].filter(
      Boolean,
    ).join("/");
    const url = new URL(pathname, this.#config.endpoint);
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
        return new FetchError(res.statusText, res);
      }
      return res.json();
    });
  }
}
