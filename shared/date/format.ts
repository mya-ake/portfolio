import dayjs from "./_dayjs.ts";

export function formatDate(value: dayjs.ConfigType, format: string) {
  return dayjs(value).format(format);
}
