import type { FC } from 'react';

export const Paragraph: FC = ({ children }) => {
  return <p className="text-base px-4">{children}</p>;
};
