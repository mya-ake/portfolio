import { Time } from '~/components/basic';
import type { VFC } from 'react';

export type PostHeader = {
  title: string;
  publishedAt?: string;
  revisedAt?: string;
};

export const PostHeader: VFC<PostHeader> = ({
  title,
  publishedAt,
  revisedAt,
}) => {
  return (
    <header className="py-8 px-4">
      <h1 className="text-4xl">{title}</h1>

      <div className="py-2 text-gray-300">
        {revisedAt && publishedAt !== revisedAt ? (
          <>
            <Time time={publishedAt ?? ''} />
            <span className="pl-1">更新</span>
            <span>（</span>
            <Time time={revisedAt ?? ''} />
            <span className="pl-1">公開</span>
            <span>）</span>
          </>
        ) : (
          <>
            <Time time={publishedAt ?? ''} />
            <span className="pl-1">公開</span>
          </>
        )}
      </div>
    </header>
  );
};
