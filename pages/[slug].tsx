import { getPost, getPosts } from '@/lib/api';
import { PostType } from '@/types';
import Layout from './layout';

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  return (
    <Layout>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
  const post = getPost(params.slug, ['title', 'data', 'content', 'tags']);
  console.log(post);
  return {
    props: { post },
  };
}
