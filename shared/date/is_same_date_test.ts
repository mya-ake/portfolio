import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { isSameDate } from "./is_same_date.ts";

describe("isSameDate", () => {
  it("two dates are same", () => {
    const result = isSameDate(
      "2023-04-01T00:00:00.000Z",
      "2023-04-01T03:00:00.000Z",
    );
    assertEquals(result, true);
  });

  it("two dates are not same", () => {
    const result = isSameDate(
      "2023-04-01T00:00:00.000Z",
      "2023-04-02T00:00:00.000Z",
    );
    assertEquals(result, false);
  });
});
