import { join } from 'path';
import fs from 'fs';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

const postsDir = join(process.cwd(), '__posts');

export function getPost(file: string, fields: string[] = []) {
  const path = join(postsDir, file);
  const { data, content } = matter.read(path);
  const parsedContent = remark().use(html).processSync(content).toString();

  type Result = {
    [key: string]: string;
  };

  const result: Result = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      result[field] = file.replace(/\.md$/, '');
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
