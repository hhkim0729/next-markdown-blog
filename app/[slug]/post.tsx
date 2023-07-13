'use client';

import { useEffect } from 'react';
import hljs from 'highlight.js';
import { PostType } from '@/app/types';

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="py-6 border-y-2 border-gray-300">
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
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
        className="mt-8 prose"
      ></div>
    </div>
  );
}
