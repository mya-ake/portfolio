import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Can't read the type, so I copied it.
declare module "dayjs" {
  interface Dayjs {
    tz(timezone?: string, keepLocalTime?: boolean): Dayjs;
    offsetName(type?: "short" | "long"): string | undefined;
  }

  interface DayjsTimezone {
    (date: ConfigType, timezone?: string): Dayjs;
    (date: ConfigType, format: string, timezone?: string): Dayjs;
    guess(): string;
    setDefault(timezone?: string): void;
  }

  const tz: DayjsTimezone;
}

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Tokyo");

export default function (value?: dayjs.ConfigType) {
  return dayjs(value).tz();
}
export type ConfigType = dayjs.ConfigType;
