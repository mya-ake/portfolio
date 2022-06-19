import dayjs from 'dayjs';

export const createDate = (): string => dayjs().unix().toString();
