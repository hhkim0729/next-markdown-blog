import Head from 'next/head';
import Image from 'next/image';
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
      <div className="p-8">
        <header>
          <Link
            href="/"
            className="flex items-center gap-2 text-4xl font-bold hover:underline"
          >
            <Image
              src="/favicon.ico"
              alt="logo"
              width="20"
              height="20"
              className="w-8 h-8"
            />
            <span>hh</span>
          </Link>
        </header>
        {children}
      </div>
    </>
  );
}
