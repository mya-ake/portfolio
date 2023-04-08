import dayjs, { ConfigType } from "./_dayjs.ts";

export function isSameDate(
  date1: ConfigType,
  date2: ConfigType,
): boolean {
  return dayjs(date1).isSame(dayjs(date2), "day");
}
