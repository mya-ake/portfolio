import type { FC } from 'react';

export const Code: FC = ({ children }) => {
  return (
    <code className="bg-gray-600 text-sm py-[0.125rem] px-1 rounded-sm">
      {children}
    </code>
  );
};
