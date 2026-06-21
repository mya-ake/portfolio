import { describe, it } from "std/testing/bdd.ts";
import { assertEquals } from "std/assert/mod.ts";
import { paginateAll } from "./list.ts";
import type { MicroCMSList } from "@shared/micro_cms/type.ts";

type Item = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

const item = (id: string): Item => ({
  id,
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  revisedAt: "",
});

const range = (n: number): Item[] =>
  Array.from({ length: n }, (_, i) => item(String(i)));

const ids = (list: { id: string }[]): string[] => list.map((c) => c.id);

// Records the offsets it is asked for and returns the matching slice of `all`
// with `totalCount` derived from the full list — mirroring the real MicroCMS
// list envelope so the mock matches the dependency contract.
function makeFetchPage(all: Item[], pageSize: number) {
  const offsets: number[] = [];
  const fetchPage = (offset: number): Promise<MicroCMSList<Item>> => {
    offsets.push(offset);
    return Promise.resolve({
      contents: all.slice(offset, offset + pageSize),
      totalCount: all.length,
      offset,
      limit: pageSize,
    });
  };
  return { fetchPage, offsets };
}

describe("paginateAll", () => {
  it("fetches a single page when totalCount is below the page size", async () => {
    const all = range(7);
    const { fetchPage, offsets } = makeFetchPage(all, 100);

    const result = await paginateAll(fetchPage);

    assertEquals(offsets, [0]);
    assertEquals(ids(result.contents), ids(all));
    assertEquals(result.totalCount, 7);
    assertEquals(result.offset, 0);
    assertEquals(result.limit, 7);
  });

  it("stops after one page when totalCount equals the page size", async () => {
    const all = range(100);
    const { fetchPage, offsets } = makeFetchPage(all, 100);

    const result = await paginateAll(fetchPage);

    // No second request at offset 100 — the loop ends once everything is in.
    assertEquals(offsets, [0]);
    assertEquals(result.contents.length, 100);
    assertEquals(ids(result.contents), ids(all));
  });

  it("pages through offsets until every item is fetched", async () => {
    const all = range(250);
    const { fetchPage, offsets } = makeFetchPage(all, 100);

    const result = await paginateAll(fetchPage);

    assertEquals(offsets, [0, 100, 200]);
    assertEquals(result.contents.length, 250);
    assertEquals(ids(result.contents), ids(all));
    assertEquals(result.offset, 0);
    assertEquals(result.limit, 250);
  });

  it("returns an empty list when there are no items", async () => {
    const { fetchPage, offsets } = makeFetchPage([], 100);

    const result = await paginateAll(fetchPage);

    assertEquals(offsets, [0]);
    assertEquals(result.contents, []);
    assertEquals(result.totalCount, 0);
  });

  it("stops defensively when a page is empty before totalCount is reached", async () => {
    const available = range(3);
    const offsets: number[] = [];
    const fetchPage = (offset: number): Promise<MicroCMSList<Item>> => {
      offsets.push(offset);
      return Promise.resolve({
        contents: available.slice(offset, offset + 100),
        totalCount: 5, // claims more than is actually returnable
        offset,
        limit: 100,
      });
    };

    const result = await paginateAll(fetchPage);

    assertEquals(offsets, [0, 3]);
    assertEquals(result.contents.length, 3);
  });
});
