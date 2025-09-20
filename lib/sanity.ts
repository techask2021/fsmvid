import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to fetch blog posts
export async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title
    }
  `)
}

// Helper function to fetch a single blog post by slug
export async function getPost(slug: string) {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content,
      mainImage,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title
    }
  `,
    { slug },
  )
}

// Helper function to fetch pages
export async function getPages() {
  return client.fetch(`
    *[_type == "page"] | order(title asc) {
      _id,
      title,
      slug,
      metaTitle,
      metaDescription,
      lastUpdated
    }
  `)
}

// Helper function to fetch a single page by slug
export async function getPage(slug: string) {
  return client.fetch(
    `
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content,
      metaTitle,
      metaDescription,
      lastUpdated
    }
  `,
    { slug },
  )
}
