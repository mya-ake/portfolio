import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Strikethrough: FC<Props> = ({ children }) => {
  return <s className="line-through">{children}</s>;
};
