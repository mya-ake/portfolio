import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Strong: FC<Props> = ({ children }) => {
  return <strong className="font-bold">{children}</strong>;
};
