import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';

export const Heading3: FC = ({ children }) => {
  return <h3 className={clsx(baseHeading, 'text-3xl')}>{children}</h3>;
};
