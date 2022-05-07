import clsx from 'clsx';
import { baseHeading } from './styles';
import type { FC } from 'react';
import type { HeadingProps } from './type';

export const Heading4: FC<HeadingProps> = ({ children }) => {
  return <h4 className={clsx(baseHeading, 'text-2xl')}>{children}</h4>;
};
