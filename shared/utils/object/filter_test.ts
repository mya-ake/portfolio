import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { Filter, shallowFilterObject } from "./filter.ts";

describe("shallowFilterObject behavior", () => {
  const filter: Filter = (_, value) => Boolean(value);

  it("filtered as per filter function", () => {
    const input = { name: "test name", email: undefined };
    const result = shallowFilterObject(input, filter);
    assertEquals(result, { name: "test name" });
  });

  it("not filtered to the inside of the object", () => {
    const input = {
      name: "test name",
      email: undefined,
      meta: { v1: "v1", v2: undefined },
    };
    const result = shallowFilterObject(input, filter);
    assertEquals(result, {
      name: "test name",
      meta: { v1: "v1", v2: undefined },
    });
  });
});
