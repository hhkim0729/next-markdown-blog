import { getPost, getPosts } from '@/app/lib/api';
import Post from '@/app/[slug]/post';
import { PostType } from '@/app/types';

type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  const post: PostType = getPost(params.slug, [
    'title',
    'date',
    'content',
    'tags',
  ]);

  return <Post post={post} />;
}

export function generateStaticParams() {
  const posts = getPosts(['slug']);
  return posts.map((post) => ({ slug: post.slug }));
}
