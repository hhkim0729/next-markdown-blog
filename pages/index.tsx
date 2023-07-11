import { getPosts } from '@/lib/api';
import Layout from '@/pages/layout';
import PostPreviewList from '@/components/PostList';
import { PostType } from '@/types';

type Props = {
  posts: PostType[];
};

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <PostPreviewList posts={posts} />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts(['slug', 'title', 'date', 'tags', 'description']);
  return {
    props: { posts },
  };
}
