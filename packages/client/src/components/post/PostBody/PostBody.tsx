import { useMemo, VFC } from 'react';
import { RenderHTML } from '~/components/core';
import { parseHtml } from '@mya-ake-com/parser';
import { replacer } from './replacer';

export type PostBodyProps = {
  body: string;
};

export const PostBody: VFC<PostBodyProps> = ({ body }) => {
  const parsedBody = useMemo(() => {
    return parseHtml(body ?? '');
  }, [body]);

  return <RenderHTML htmlNodes={parsedBody} replacer={replacer} />;
};