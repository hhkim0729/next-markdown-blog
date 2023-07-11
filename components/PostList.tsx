import { PostType } from '@/types';
import Link from 'next/link';

type Props = {
  posts: PostType[];
};

export default function PostList({ posts }: Props) {
  return (
    <div className="mt-4">
      {posts.map((post, i) => (
        <Link
          key={i}
          href={`/${post.slug}`}
          className="block border-b border-gray-300 p-2 hover:bg-gray-100"
        >
          <h2 className="text-2xl font-medium">{post.title}</h2>
          <p>{post.date}</p>
          <p className="text-sm">{post.description}</p>
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
        </Link>
      ))}
    </div>
  );
}
