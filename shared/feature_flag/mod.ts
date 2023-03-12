export function enableTextOgImage() {
  return Deno.env.get("APP_ENV") !== "prod";
}
