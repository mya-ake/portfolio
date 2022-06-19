import dayjs from 'dayjs';

export type DateInput = string | number | Date;

export const getCurrentYear = (): string => dayjs().get('year').toString();

export const createDayjs = (input: DateInput): dayjs.Dayjs => {
  return /^[0-9]{10}$/.test(String(input))
    ? dayjs(Number(`${input}000`))
    : dayjs(input);
};

export const formatDisplayDate = (input: DateInput): string => {
  return createDayjs(input).format('YYYY.MM.DD');
};

export const formatDatetimeAttribute = (input: DateInput): string => {
  return createDayjs(input).format('YYYY-MM-DD');
};
