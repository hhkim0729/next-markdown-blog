# next-markdown-blog

Next.js로 마크다운으로 작성한 블로그를 정적 페이지(SSG)로 작성하기

- 블로그는 SEO가 중요하기 때문에 서버사이드에서 렌더링되는 것이 좋음
- 또한 변경이 잦지 않고 클라이언트에서는 이미 작성된 글을 보기만 하면 되기 때문에 빌드 타임에 페이지를 미리 렌더링해두고 완성된 HTML을 응답하는 SSG 방식이 사용자 경험에 좋음

# 요구사항

- 사용자는 루트 경로의 `__posts` 폴더에 작성된 마크다운 파일(`.md`)를 작성할 수 있어야 합니다. 해당 파일은 마크다운 본문과 게시물에 대한 meta data를 담을 수 있어야 합니다.
- 블로그에 작성된 게시물을 렌더링하는 `목록 페이지`와 개별 게시물을 렌더링하는 `상세 페이지`로 나누어 작성해주세요.
  - `/` - 목록 페이지
  - `/[id]` - 상세 페이지
- Next.js 12에서 지원하는 Prefetching 메서드를 적절히 사용해주세요.
- Next.js 13을 설치하고 Pages Router를 사용하셔도 됩니다.

# 환경 설정

- 프로젝트 생성

[Getting Started: Installation](https://nextjs.org/docs/getting-started/installation#automatic-installation)

```bash
yarn create next-app

✔ What is your project named? … next-markdown-blog
✔ Would you like to use TypeSc₩o use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias? … No / Yes
```

App Router 사용만 ‘No’, 나머지는 기본 설정

- yarn berry 환경 설정

```bash
yarn set version berry
yarn dlx @yarnpkg/sdks vscode
yarn
# 이후 typescript 버전을 workspace로 변경
# => tsx 파일의 빨간 줄 사라짐

# 잘 실행되는지 확인
yarn dev
```

- `.gitignore`에 아래 추가

```
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

.vscode
```

# Next.js 대충 사용법 (feat. Pages Router)

## 파일 구조

[Getting Started: Installation](https://nextjs.org/docs/getting-started/installation#the-pages-directory-optional)

- `/pages` 하위의 `index.tsx`는 홈페이지(`/`)
- 아래의 두 파일은 꼭 없어도 되는 파일

### `_app.tsx`

전역 레이아웃 정의

[Routing: Custom App](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)

```jsx
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

- `Component`에는 현재 탐색중인 경로의 페이지 컴포넌트가 들어감
- `pageProps`에는 Next.js에서 제공하는 데이터 페칭 메소드의 결과가 들어감 (사용하지 않으면 빈 객체)
  - `App` 내부에서는 이런 메소드 사용 불가

### `_document.tsx`

서버에 대한 초기 응답 정의

[Routing: Custom Document](https://nextjs.org/docs/pages/building-your-application/routing/custom-document)

```jsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

- 서버에서 렌더링되기 때문에 `onClick` 같은 이벤트 핸들러 사용 불가
- `Main` 바깥은 브라우저에서 초기화되지 않으므로 앱 로직이나 커스텀 CSS 추가 불가
  - 모든 페이지에서 사용되는 공통 컴포넌트(툴바 등)는 레이아웃 패턴 활용
- Next.js에서 제공하는 데이터 페칭 메소드 사용 불가

## 라우팅

[Routing: Pages and Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)

- `/pages` 디렉토리 하위에 만든 파일들의 이름이 라우트가 됨
  예) `pages/about.js` 파일은 `/about`으로 접근 가능
- 각 폴더의 루트 경로는 `index.js` 파일에 작성
- 도메인 하위에 `/`로 구분되는 각 단위를 세그먼트라고 부름

## 동적 라우팅

[Routing: Dynamic Routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)

- 요청을 받거나 빌드 되기 전까지 정확한 세그먼트 이름을 알 수 없는 경우 사용
- 파일 이름을 `[]`로 감싸면 됨
- `pages/blog/[slug].js` 파일 ⇒ `blog/1` 같은 경로로 접근 가능

```jsx
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  return <p>Post: {router.query.slug}</p>;
}
```

## API 라우팅

[Routing: API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

- `/pages/api` 하위의 파일들은 `/api/*`로 매핑되고 페이지가 아니라 API 엔드포인트로 간주됨

# SSG(Static Site Generation)

[Rendering: Static Site Generation (SSG)](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

HTML 페이지가 빌드 타임에 생성되는 방식

- CDN(Content Delivery Network)에 캐싱되어 재사용될 수 있음
- 기본적으로 어떤 데이터도 사용하지 않는 경우 Next.js가 SSG 방식으로 페이지를 프리렌더링함

## 데이터가 있는 SSG

### 정적 페이지에 필요한 데이터 생성: `getStaticProps()`

[Data Fetching: getStaticProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)

```jsx
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

// 빌드타임에 호출됨
export async function getStaticProps() {
  // 포스트 목록을 가져오는 외부 API 호출
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // 빌드 타임에 Blog 컴포넌트가 props로 `posts`를 받음
  return {
    props: {
      posts,
    },
  };
}
```

### 페이지 경로가 외부 데이터에 의존적일 때: `getStaticPaths()`

[Data Fetching: getStaticPaths](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths)

- `pages/posts/[id].js` 파일

```jsx
export default function Post({ post }) {
  // post 렌더링...
}

// 빌드 타임에 호출됨
export async function getStaticPaths() {
  // 포스트 목록을 가져오는 외부 API 호출
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // 포스트 목록을 기반으로 프리렌더링할 패스 가져오기
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // 이 패스만 빌드 타임에 프리렌더링하겠다고 명시
  // { fallback: false } => 다른 라우트는 404 에러 발생
  return { paths, fallback: false };
}

// 페이지를 프리렌더링하려면 getstaticProps 설정도 필요
export async function getStaticProps({ params }) {
  // params는 포스트의 id를 가짐
  // 라우트가 /posts/1이면 params.id는 1
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // post를 props로 전달
  return { props: { post } };
}
```

위의 설명은 Pages Router 방식

13버전에서 도입된 App Router 방식에서는 정적 렌더링과 정적 데이터 페칭이 기본값

[Rendering: Static and Dynamic](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#static-data-fetching-default)

# 개발

> 전체적으로 이 예제를 많이 참고했다.
>
> [next.js/examples/blog-starter at canary · vercel/next.js](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)

## 마크다운 파일 읽어오기

1. `__posts` 디렉토리의 절대 경로 찾기
2. 디렉토리의 모든 파일 읽어오기
3. 각 파일의 절대 경로를 찾기
4. 각 파일의 내용 읽기
5. [remark](https://github.com/remarkjs/remark), [remark-html](https://github.com/remarkjs/remark-html), [remark-gfm](https://github.com/remarkjs/remark-gfm)을 활용하여 읽은 내용을 html로 만들기

   - 설치

   ```bash
   yarn add remark remark-html@14.0.0 remark-gfm
   ```

   remark-html 최신 버전(15)을 설치했더니 자꾸 타입 오류가 나서 버전을 명시했다.

   [Typescript Error: "No overload matches this call." · vercel/next.js · Discussion #52369](https://github.com/vercel/next.js/discussions/52369)

💡 이 외에는 [remark plugin](https://github.com/remarkjs/remark/blob/main/doc/plugins.md) 목록을 보면서 기능 추가하면 됨

## 마크다운의 메타데이터 읽어오기

https://jekyllrb.com/docs/front-matter/

https://gohugo.io/content-management/front-matter/

frontmatter 문법을 JSON으로 파싱해주는 [gray-matter](https://github.com/jonschlinkert/gray-matter) 사용

## 메인에서 목록 가져오기

`getStaticProps()` 사용

## 동적 라우팅하기

`pages/[slug.tsx]` 파일 생성 및 `getStaticPath()`, `getStaticProps()` 사용

## 마크다운 스타일링

[@tailwindcss/typography - Tailwind CSS](https://tailwindcss.com/docs/typography-plugin)

## 코드 하이라이팅

[How to use Highlight.js on a Next.js site](https://dev.to/kontent_ai/how-to-use-highlight-js-on-a-next-js-site-f9)

https://github.com/highlightjs/highlight.js/

https://highlightjs.org/static/demo/

```bash
yarn add highlightjs
```

```jsx
import hljs from 'highlightjs';
import 'highlightjs/styles/atom-one-dark.css';
import { useEffect } from 'react';

...
export default function Post({ post }: Props) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    ...
  );
}
```

## 배포

[New Project – Vercel](https://vercel.com/new)

1. Import Git Repository에서 레포 선택
2. Deploy
