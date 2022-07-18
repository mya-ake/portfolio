import dayjs from "dayjs";

export const getCurrentYear = (): string => dayjs().get("year").toString();
