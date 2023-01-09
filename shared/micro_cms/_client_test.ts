import { describe, it } from "std/testing/bdd.ts";
import { assertEquals, assertInstanceOf } from "std/testing/asserts.ts";
import { MicroCmsClient } from "./_client.ts";

describe("MicroCmsClient", () => {
  it("constructor", () => {
    const client = new MicroCmsClient();
    assertInstanceOf(client, MicroCmsClient);
  });

  it("if get posts resource, do not throw an error", async () => {
    const client = new MicroCmsClient();
    await client.get("posts");
    assertEquals(true, true);
  });
});
