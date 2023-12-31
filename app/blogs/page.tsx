import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { FaUser, FaCalendar } from 'react-icons/fa';
import Layout from '../components/Layout';
import Image from 'next/image';

interface FrontMatter {
  title: string;
  author: string;
  date: string; // You might want to use a specific date type
  image: string;
  excerpt: string;
}

interface Post {
  frontMatter: FrontMatter;
  slug: string;
}

export default async function Blog() {
  const posts = await getPosts();
  posts.sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime());

  return (
    <Layout >
      <div className="overflow-y-auto">
        {posts.map((post, index) => (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4" key={index}>
            <Link href={`${post.slug}`} passHref>
              <div className="flex flex-col md:flex-row w-full">
                <Image
                  width={300}
                  height={300}
                  src={post.frontMatter.image}
                  alt={post.frontMatter.title}
                  className="object-cover "
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.frontMatter.title}</h2>
                  <div className="mb-2 flex items-center">
                    <FaUser size={16} className="mr-2" />
                    <p className="mr-10">{post.frontMatter.author}</p>
                    <FaCalendar size={16} className="mr-2" />
                    <p>{new Date(post.frontMatter.date).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-2">
                    <p>{post.frontMatter.excerpt}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}


async function getPosts(): Promise<Post[]> {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter: frontMatter as FrontMatter,
      slug: filename.split('.')[0],
    };
  });

  return posts; // Return the array of posts
}
