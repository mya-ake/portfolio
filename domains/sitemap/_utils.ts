import { formatDate as f } from "@shared/date/format.ts";

export function formatDate(date: string) {
  return f(date, "YYYY-MM-DD");
}
