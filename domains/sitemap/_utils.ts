import { formatDate as f } from "@shared/date/format.ts";

export function formatDate(date: string) {
  return f(date, "YYYY-MM-DD");
}

export function createLoc(path: string) {
  return new URL(path, "https://mya-ake.com").toString();
}
