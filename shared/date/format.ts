import dayjs from "dayjs";
console.log(dayjs.locale());
export function formatDate(value: string | Date, format: string) {
  return dayjs(value).format(format);
}
