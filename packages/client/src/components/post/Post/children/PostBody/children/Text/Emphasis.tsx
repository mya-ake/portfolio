import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Emphasis: FC<Props> = ({ children }) => {
  return <em className="not-italic font-semibold">{children}</em>;
};
