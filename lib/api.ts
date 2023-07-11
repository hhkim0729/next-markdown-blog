import { join } from 'path';
import fs from 'fs';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

const postsDir = join(process.cwd(), '__posts');

export function getPost(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const path = join(postsDir, `${realSlug}.md`);
  const { data, content } = matter.read(path);
  const parsedContent = remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .processSync(content)
    .toString();

  type Result = {
    [key: string]: string;
  };

  const result: Result = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      result[field] = realSlug;
    }
    if (field === 'content') {
      result[field] = parsedContent;
    }
    if (typeof data[field] !== 'undefined') {
      result[field] = data[field];
    }
  });

  return result;
}

export function getPosts(fields: string[] = []) {
  const files = fs.readdirSync(postsDir);
  const posts = files
    .map((file) => getPost(file, fields))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}
