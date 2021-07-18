import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';

export const Heading1: FC = ({ children }) => {
  return <h1 className={clsx(baseHeading, 'text-5xl')}>{children}</h1>;
};
