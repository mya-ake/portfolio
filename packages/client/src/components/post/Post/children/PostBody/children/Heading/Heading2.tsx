import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';

export const Heading2: FC = ({ children }) => {
  return <h2 className={clsx(baseHeading, 'text-4xl')}>{children}</h2>;
};
