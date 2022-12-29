export function extractParameter(url: URL): Record<string, string> {
  const obj: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
