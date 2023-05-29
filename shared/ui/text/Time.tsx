import { formatDate } from "@shared/date/format.ts";

export type Props = {
  datetime: string;
  displayFormat: string;
  timeFormat?: string;
};

export function Time(props: Props) {
  const {
    datetime,
    displayFormat,
    timeFormat = "YYYY-MM-DDTHH:mm:ss.SSS",
  } = props;

  const datetimeAttribute = formatDate(datetime, timeFormat);
  const text = formatDate(datetime, displayFormat);

  return <time dateTime={datetimeAttribute}>{text}</time>;
}
