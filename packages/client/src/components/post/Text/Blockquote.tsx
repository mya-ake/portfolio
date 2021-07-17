import type { FC } from 'react';

export const Blockquote: FC = ({ children }) => {
  return (
    <blockquote className="border-l-4 pl-2 border-gray-100">
      {children}
    </blockquote>
  );
};
