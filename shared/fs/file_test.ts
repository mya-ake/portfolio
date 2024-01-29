import { afterAll, describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { join } from "std/path/mod.ts";
import { readFile, writeFile } from "./file.ts";

const tmpDir = join(Deno.cwd(), ".tmp", "file_test");

afterAll(() => {
  Deno.remove(tmpDir, { recursive: true });
});

describe("readFile, writeFile", () => {
  it("write and read a file", async () => {
    const data = JSON.stringify({ test: "test" });
    const path = join(tmpDir, "test.json");
    await writeFile(path, data);
    const readData = await readFile(path);
    assertEquals(readData, data);
  });
});
