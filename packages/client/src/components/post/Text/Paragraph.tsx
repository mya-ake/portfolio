import type { FC } from 'react';

export const Paragraph: FC = ({ children }) => {
  return <p className="text-base">{children}</p>;
};
