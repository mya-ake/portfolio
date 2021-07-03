import { SWRConfig, SWRConfiguration } from 'swr';
import { AppErrorHandler } from '~/components/core';
import 'tailwindcss/tailwind.css';
import type { FC } from 'react';
import type { AppProps } from 'next/app';

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig value={swrConfig}>
      <AppErrorHandler error={pageProps.error}>
        <Component {...pageProps} />
      </AppErrorHandler>
    </SWRConfig>
  );
};

export default App;
