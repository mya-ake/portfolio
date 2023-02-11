import { MicroCmsClient } from "./_client.ts";

let client: MicroCmsClient;
export function getMicroCmsClient(): MicroCmsClient {
  if (!client) {
    client = new MicroCmsClient();
  }
  return client;
}
