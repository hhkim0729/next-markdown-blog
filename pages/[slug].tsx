import { useEffect } from 'react';
import { getPost, getPosts } from '@/lib/api';
import hljs from 'highlightjs';
import Layout from './layout';
import { PostType } from '@/types';
import 'highlightjs/styles/atom-one-dark.css';

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <Layout>
      <h1 className="text-6xl font-medium">{post.title}</h1>
      <p className="my-4">{post.date}</p>
      {post?.tags && (
        <div>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm mr-2 text-gray-500"
            >{`#${tag}`}</span>
          ))}
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="mt-8 prose"
      ></div>
    </Layout>
  );
}

export function getStaticPaths() {
  const posts = getPosts(['slug']);
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

type Params = {
  params: {
    slug: string;
  };
};

export function getStaticProps({ params }: Params) {
  const post = getPost(params.slug, ['title', 'date', 'content', 'tags']);
  return {
    props: { post },
  };
}
