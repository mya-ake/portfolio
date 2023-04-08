import dayjs, { ConfigType } from "./_dayjs.ts";

export function formatDate(value: ConfigType, format: string) {
  return dayjs(value).format(format);
}
