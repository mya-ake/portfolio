import dayjs from "dayjs";

export function isSameDate(
  date1: dayjs.ConfigType,
  date2: dayjs.ConfigType,
): boolean {
  return dayjs(date1).isSame(dayjs(date2), "day");
}
