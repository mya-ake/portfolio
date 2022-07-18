import { assert } from "std/testing/asserts.ts";
import { readNormalizeCss } from "./read_normalize_css.ts";

Deno.test({
  name: "read the normalize css file",
  async fn() {
    const css = await readNormalizeCss(Deno.cwd());
    assert(css.length > 0);
  },
});
