import type { FC } from 'react';

export const Strikethrough: FC = ({ children }) => {
  return <s className="line-through">{children}</s>;
};
