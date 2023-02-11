import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { getMicroCmsClient } from "./core.ts";

describe("getMicroCmsClient", () => {
  it("same instance", () => {
    const client1 = getMicroCmsClient();
    const client2 = getMicroCmsClient();
    assertEquals(client1 === client2, true);
  });
});
