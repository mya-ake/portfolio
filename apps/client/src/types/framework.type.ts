import type { GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { AppError } from './error.type';

type WithError<Props extends Record<string, unknown>> = Props & {
  error?: AppError;
};

export type GetStaticPropsWithError<
  Props extends Record<string, unknown>,
  Query extends ParsedUrlQuery = ParsedUrlQuery,
> = GetStaticProps<WithError<Props>, Query>;
