import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';
import type { HeadingProps } from './type';

export const Heading3: FC<HeadingProps> = ({ children }) => {
  return <h3 className={clsx(baseHeading, 'text-3xl')}>{children}</h3>;
};
