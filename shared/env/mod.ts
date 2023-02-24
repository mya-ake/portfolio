export function getUseMicroCMSCache() {
  return Deno.env.get("APP_ENV") !== "prod";
}
