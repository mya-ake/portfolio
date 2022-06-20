import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Blockquote: FC<Props> = ({ children }) => {
  return (
    <div className="px-4">
      <blockquote className="border-l-4 pl-2 border-gray-100">
        {children}
      </blockquote>
    </div>
  );
};
