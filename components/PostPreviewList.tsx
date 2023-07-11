import { PostType } from '@/types';
import Link from 'next/link';

type Props = {
  posts: PostType[];
};

export default function PostPreviewList({ posts }: Props) {
  return (
    <div>
      {posts.map((post, i) => (
        <Link key={i} href={`/${post.slug}`}>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{post.description}</p>
          {post?.tags && (
            <div>
              {post.tags.map((tag) => (
                <span key={tag}>{`#${tag}`}</span>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
