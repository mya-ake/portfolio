import dayjs from "./_dayjs.ts";

export const getCurrentYear = (): string => dayjs().get("year").toString();
