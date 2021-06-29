import type { FC } from 'react';

export const LinkText: FC = ({ children }) => {
  return <span className="text-blue-700 underline">{children}</span>;
};
