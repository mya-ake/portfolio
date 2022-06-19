import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Underline: FC<Props> = ({ children }) => {
  return <u className="underline">{children}</u>;
};
