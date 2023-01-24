import type { Content, CustomDataValue } from "./type.ts";

type Nested<T extends Content<Record<string, CustomDataValue>>> = {
  [K in keyof T]?: T[K] extends Record<string, string> ? (string & keyof T[K])[]
    : T[K] extends Array<infer U>
      ? (string & keyof U)[] | readonly (string & keyof U)[]
    : never;
};

export function createFields<
  T extends Content<Record<string, CustomDataValue>>,
>(
  root: (string & keyof T)[] | readonly (string & keyof T)[],
  nested?: Nested<T>,
): string {
  const output: string[] = [...root];
  const nestedOutput = nested
    ? Object.entries(nested).flatMap(([key, value]) => {
      return (value as string[]).map((v) => `${key}.${v}`) ?? [];
    }).filter((v) => v.length > 0)
    : [];

  return [...output, ...nestedOutput].join(",");
}
