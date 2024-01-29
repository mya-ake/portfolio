import { assertEquals } from "std/assert/mod.ts";
import { getCurrentYear } from "./get_current_year.ts";

Deno.test({
  name: "get current year",
  fn() {
    const result = getCurrentYear();
    assertEquals(result, String(new Date().getFullYear()));
  },
});
