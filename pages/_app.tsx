import '@/styles/globals.css';
import 'highlightjs/styles/atom-one-dark.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
