import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Paragraph: FC<Props> = ({ children }) => {
  return <p className="text-base px-4">{children}</p>;
};
