import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { shouldShowMasthead } from "./should_show_masthead.ts";

const crumb = (label: string) => ({ label, to: `/${label}` });

describe("shouldShowMasthead", () => {
  it("is true on Home — only the prepended home crumb", () => {
    assertEquals(shouldShowMasthead([crumb("home")]), true);
  });

  it("is false on a sub-page — home plus at least one more crumb", () => {
    assertEquals(shouldShowMasthead([crumb("home"), crumb("posts")]), false);
  });

  it("is true for an empty list (defensive)", () => {
    assertEquals(shouldShowMasthead([]), true);
  });
});
