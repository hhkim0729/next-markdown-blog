import { getPosts } from '@/app/lib/api';
import PostList from '@/app/post-list';

export default function Page() {
  const posts = getPosts(['slug', 'title', 'date', 'tags', 'description']);

  return <PostList posts={posts} />;
}
