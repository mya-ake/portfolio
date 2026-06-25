import { describe, it } from "std/testing/bdd.ts";
import { assert, assertEquals, assertRejects } from "std/assert/mod.ts";
import { getMyRepositories, Repository } from "./repositories.ts";
import { createOctokitMock } from "./_mock.ts";

// Narrow the request signal out of the captured input without `as`.
// `input.request` is `unknown`; guard it down to an AbortSignal.
function extractSignal(
  input: Record<string, unknown> | undefined,
): AbortSignal | undefined {
  const request = input?.request;
  if (typeof request !== "object" || request === null) {
    return undefined;
  }
  if (!("signal" in request)) {
    return undefined;
  }
  const { signal } = request;
  return signal instanceof AbortSignal ? signal : undefined;
}

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

  it("attaches a timeout AbortSignal to the octokit request", async () => {
    let captured: Record<string, unknown> | undefined;
    const octokitMock = createOctokitMock({
      request: (_resource, input) => {
        captured = input;
        return Promise.resolve({ data: [] });
      },
    });
    await getMyRepositories(octokitMock, { perPage: 3 });

    const signal = extractSignal(captured);
    assert(signal instanceof AbortSignal);
    // The signal is fresh per-call: not yet aborted right after the request.
    assertEquals(signal.aborted, false);
  });

  it("defaults perPage to 3 when no option is given", async () => {
    let captured: Record<string, unknown> | undefined;
    const octokitMock = createOctokitMock({
      request: (_resource, input) => {
        captured = input;
        return Promise.resolve({ data: [] });
      },
    });
    await getMyRepositories(octokitMock);

    assertEquals(captured?.per_page, 3);
  });

  it("AbortSignal.timeout aborts with a TimeoutError", async () => {
    const signal = AbortSignal.timeout(0);
    // Let the microtask/timer queue flush so the 0ms timeout fires.
    await new Promise((resolve) => setTimeout(resolve, 0));

    assertEquals(signal.aborted, true);
    assert(signal.reason instanceof DOMException);
    assertEquals(signal.reason.name, "TimeoutError");
  });
});
