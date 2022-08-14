export type Filter = (key: string, value: unknown) => boolean;
export function shallowFilterObject<
  Input extends Record<string, unknown>,
  Output extends Record<string, unknown> = Record<string, unknown>,
>(
  inputObject: Input,
  filter: Filter,
): Output {
  return Object.entries(inputObject).reduce(
    (o, [key, value]) => {
      if (filter(key, value)) {
        // deno-lint-ignore no-explicit-any
        o[key as keyof Output] = value as any;
      }
      return o;
    },
    {} as Output,
  );
}
