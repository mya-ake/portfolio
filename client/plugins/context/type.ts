import { IHttp } from '@/lib/http';

export type AppHttp = IHttp<undefined>;

export type AppContext = {
  http: AppHttp;
};
