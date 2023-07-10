import { join } from 'path';
import fs from 'fs';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = join(process.cwd(), '__posts');

export async function getPost(file: string) {
  const fullPath = join(postsDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const result = await remark().use(html).process(content);
  return result.toString();
}

export async function getPosts() {
  const files = fs.readdirSync(postsDir);
  const posts = await Promise.all(files.map((file) => getPost(file)));
  return posts;
}
