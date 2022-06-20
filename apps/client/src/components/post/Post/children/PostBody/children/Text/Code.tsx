import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Code: FC<Props> = ({ children }) => {
  return (
    <code className="bg-gray-600 text-sm py-[0.125rem] px-1 rounded-sm">
      {children}
    </code>
  );
};
