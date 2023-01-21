import { beforeEach, describe, it } from "std/testing/bdd.ts";
import { assertEquals, assertInstanceOf } from "std/testing/asserts.ts";
import { stub } from "std/testing/mock.ts";
import { MicroCmsClient } from "./_client.ts";
import { FetchError } from "@shared/fetch/error.ts";

const endpoint = Deno.env.get("MICRO_CMS_API_ENDPOINT");

describe("MicroCmsClient", () => {
  let client: MicroCmsClient;
  beforeEach(() => {
    client = new MicroCmsClient();
  });

  it("requestable", async () => {
    let error = undefined;
    await client.get({ resource: "posts" }).catch((_error) => {
      error = _error;
    });
    assertEquals(error, undefined);
  });

  it("expected URL is set in the case of a list request", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () => Promise.resolve(new Response(JSON.stringify({}))),
    );

    const response = await client.get({ resource: "posts" });

    const fetchArgs = fetchStub.calls[0].args;
    const fetchRequest = fetchArgs[0] as Request;

    assertEquals(response, {});
    assertEquals(
      fetchRequest.url,
      new URL("/api/v1/posts", endpoint).toString(),
    );

    fetchStub.restore();
  });

  it("expected URL is set in the case of a content request", async () => {
    const fetchStub = stub(
      globalThis,
      "fetch",
      () => Promise.resolve(new Response(JSON.stringify({}))),
    );

    const response = await client.get({ resource: "posts", id: "test" });

    const fetchArgs = fetchStub.calls[0].args;
    const fetchRequest = fetchArgs[0] as Request;

    assertEquals(response, {});
    assertEquals(
      fetchRequest.url,
      new URL("/api/v1/posts/test", endpoint).toString(),
    );

    fetchStub.restore();
  });

  describe("error", () => {
    it("in the case of FetchError", async () => {
      const fetchStub = stub(
        globalThis,
        "fetch",
        () =>
          Promise.resolve(new Response(JSON.stringify({}), { status: 404 })),
      );

      const response = await client.get({ resource: "posts", id: "test" })
        .catch((
          error,
        ) => error);

      assertInstanceOf(response, FetchError);
      assertEquals(response.response.status, 404);

      fetchStub.restore();
    });

    it("in the case of TypeError", async () => {
      const fetchStub = stub(
        globalThis,
        "fetch",
        () => Promise.reject(new TypeError("Network error")),
      );

      const response = await client.get({ resource: "posts", id: "test" })
        .catch((
          error,
        ) => error);

      assertInstanceOf(response, TypeError);

      fetchStub.restore();
    });
  });
});
