import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fsmvid.com';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-04-14',
  useCdn: process.env.NODE_ENV === 'production',
});

// Helper function to generate full URL for a blog post
function getPostUrl(slug: string): string {
  return `${baseUrl}/blog/${slug}`;
}

// Helper function for Sanity image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types for the blog data
export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: any;
  bio?: any[];
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author: Author;
  mainImage?: any;
  categories?: Category[];
  publishedAt: string;
  excerpt?: string;
  content?: any[];
}

// Function to get featured blog posts
export async function getFeaturedPosts(limit = 3) {
  const posts = await client.fetch<Post[]>(`
    *[_type == "post"] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "author": author->{name, slug, image},
      "categories": categories[]->title
    }
  `);
  
  // Automatically index featured posts
  if (posts.length > 0) {
    const urls = posts.map(post => getPostUrl(post.slug.current));
  }
  
  return posts;
}

// Function to get all blog posts with pagination
export async function getAllPosts(page = 1, postsPerPage = 9) {
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;

  const totalPosts = await client.fetch<number>('count(*[_type == "post"])');
  
  const posts = await client.fetch<Post[]>(`
    *[_type == "post"] | order(publishedAt desc)[${start}...${end}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "author": author->{name, slug, image},
      "categories": categories[]->title
    }
  `);

  // Index new posts
  if (posts.length > 0) {
    const urls = posts.map(post => getPostUrl(post.slug.current));
  }

  return {
    posts,
    totalPages: Math.ceil(totalPosts / postsPerPage),
    currentPage: page,
  };
}

// Function to get a blog post by slug
export async function getPostBySlug(slug: string) {
  const post = await client.fetch<Post>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      content,
      publishedAt,
      "author": author->{name, slug, image, bio},
      "categories": categories[]->title
    }`,
    { slug }
  );

  if (post) {
    // Index individual post when fetched
  }

  return post;
}

// Function to get all categories
export async function getAllCategories() {
  return client.fetch<Category[]>(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      description
    }`
  );
}

// Function to get posts by category
export async function getPostsByCategory(categoryId: string, page = 1, postsPerPage = 9) {
  const skip = (page - 1) * postsPerPage;
  
  const posts = await client.fetch<Post[]>(
    `*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc)[$skip...$end] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "author": author->{_id, name, slug, image},
      "categories": categories[]->{ _id, title }
    }`,
    { categoryId, skip, end: skip + postsPerPage - 1 }
  );
  
  const totalPosts = await client.fetch<number>(
    `count(*[_type == "post" && $categoryId in categories[]._ref])`,
    { categoryId }
  );
  
  return {
    posts,
    totalPages: Math.ceil(totalPosts / postsPerPage),
    currentPage: page
  };
}

// Function to get previous and next post for navigation
export async function getPostNavigation(currentSlug: string) {
  const allPosts = await client.fetch<{ slug: { current: string }, title: string }[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      slug,
      title
    }`
  );
  
  const currentIndex = allPosts.findIndex(post => post.slug.current === currentSlug);
  
  return {
    previous: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null
  };
}
