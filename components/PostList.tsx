import { PostType } from '@/types';
import Link from 'next/link';

type Props = {
  posts: PostType[];
};

export default function PostList({ posts }: Props) {
  return (
    <div>
      {posts.map((post, i) => (
        <Link
          key={i}
          href={`/${post.slug}`}
          className="block border-b border-gray-300 p-2 hover:bg-gray-100"
        >
          <h2 className="text-3xl font-medium">{post.title}</h2>
          <p className="my-2">{post.date}</p>
          <p>{post.description}</p>
          {post?.tags && (
            <div className="mt-2">
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
