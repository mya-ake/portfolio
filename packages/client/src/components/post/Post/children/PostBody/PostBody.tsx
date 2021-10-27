import { memo, useMemo, useEffect } from 'react';
import { RenderHTML } from '~/components/core';
import { parseHtml } from '@mya-ake-com/parser';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.css';
import { replacer } from './replacer';

export type PostBodyProps = {
  body: string;
};

export const PostBody = memo<PostBodyProps>(({ body }) => {
  const parsedBody = useMemo(() => {
    return parseHtml(body ?? '');
  }, [body]);

  useEffect(() => {
    hljs.highlightAll();
  }, [parsedBody]);

  return <RenderHTML htmlNodes={parsedBody} replacer={replacer} />;
});
PostBody.displayName = 'PostBody';
