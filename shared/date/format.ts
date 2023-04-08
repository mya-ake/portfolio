import dayjs from "dayjs";

export function formatDate(value: dayjs.ConfigType, format: string) {
  return dayjs(value).format(format);
}
