import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/globals.css';
import 'highlight.js/styles/atom-one-dark.css';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <Head>
        <title>Next.js markdown blog</title>
      </Head>
      <body>
        <div className="p-8 max-w-4xl m-auto">
          <header>
            <Link
              href="/"
              className="w-fit flex items-center gap-2 text-4xl font-bold hover:underline"
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
          <main className="mt-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
