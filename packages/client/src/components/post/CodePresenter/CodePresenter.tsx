import { FC } from 'react';

export const CodePresenter: FC = ({ children }) => {
  return (
    <pre className="language-typescript">
      <code className="lang-ts">{children}</code>
    </pre>
  );
};
