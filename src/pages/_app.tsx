import { AppProps } from 'next/app';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Web3ModalProvider from '@/context';

interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & { bodyClassName?: string };
}

export const BodyClassContext = createContext<string>('body');

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [bodyClassName, setBodyClassName] = useState('body');
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const newBodyClassName = Component.bodyClassName || 'body';
      document.body.className = newBodyClassName;
      setBodyClassName(newBodyClassName);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Initial class setting
    handleRouteChange(router.asPath);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [Component, router.events, router.asPath]);

  return (
    <BodyClassContext.Provider value={bodyClassName}>
      <Web3ModalProvider>
        <Component {...pageProps} />
      </Web3ModalProvider>
    </BodyClassContext.Provider>
  );
}

export default MyApp;
