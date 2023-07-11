import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Next.js markdown blog</title>
      </Head>
      <header>
        <Link href="/">hhkim</Link>
      </header>
      {children}
    </>
  );
}
