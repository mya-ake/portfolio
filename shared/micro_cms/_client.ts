import { z } from "zod";

const Config = z.object({
  apiKey: z.string(),
  endpoint: z.string(),
});
type Config = z.infer<typeof Config>;

type Resource = "posts";

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

  fetch(resource: Resource, config: RequestInit) {
    const url = new URL(`/api/v1/${resource}`, this.#config.endpoint);
    const request = new Request(url, {
      ...config,
      headers: {
        "X-MICROCMS-API-KEY": this.#config.apiKey,
        ...config.headers,
      },
    });
    return fetch(request);
  }

  get<Data>(resource: Resource): Promise<Data> {
    return this.fetch(resource, { method: "get" }).then((res) => res.json());
  }
}
