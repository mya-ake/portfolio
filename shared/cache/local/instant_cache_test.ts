import { afterEach } from "std/testing/bdd.ts";
import { join } from "std/path/mod.ts";
import { testBasicSpec } from "../_instant_cache_test_case.ts";
import { createInstantCache } from "./instant_cache.ts";

const tmpDir = join(Deno.cwd(), ".tmp/cache");

afterEach(async () => {
  await Deno.remove(tmpDir, { recursive: true }).catch(() => undefined);
});

testBasicSpec(createInstantCache("test"));
