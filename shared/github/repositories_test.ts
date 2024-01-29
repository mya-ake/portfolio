import { describe, it } from "std/testing/bdd.ts";
import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { getMyRepositories, Repository } from "./repositories.ts";
import { createOctokitMock } from "./_mock.ts";

describe("getMyRepositories", () => {
  it("response from octokit", async () => {
    const responseData: Repository[] = [{
      id: 0,
      name: "",
      full_name: "",
      html_url: "",
      description: "",
    }];
    const octokitMock = createOctokitMock({
      request: () => Promise.resolve({ data: responseData }),
    });
    const result = await getMyRepositories(octokitMock, { perPage: 3 });
    assertEquals(result, responseData);
  });

  it("if an error occurs, it will be rejected", async () => {
    const error = new Error("test_error");
    const octokitMock = createOctokitMock({
      request: () => Promise.reject(error),
    });
    await assertRejects(
      () => getMyRepositories(octokitMock, { perPage: 3 }),
      "test_error",
    );
  });
});
