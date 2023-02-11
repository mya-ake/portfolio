import dayjs from "dayjs";

export function formatDate(value: string | Date, format: string) {
  return dayjs(value).format(format);
}
