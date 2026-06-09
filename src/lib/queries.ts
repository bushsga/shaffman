import { client } from "./sanity";

// Fetch all posts
export const getAllPosts = async () => {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      mainImage {
        asset -> {
          _id,
          url
        }
      }
    }
  `);
};

// Fetch posts by category
export const getPostsByCategory = async (category: string) => {
  return await client.fetch(`
    *[_type == "post" && category == $category] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      mainImage {
        asset -> {
          _id,
          url
        }
      }
    }
  `, { category });
};

// Fetch single post by slug
export const getPostBySlug = async (slug: string) => {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      body,
      mainImage {
        asset -> {
          _id,
          url
        }
      }
    }
  `, { slug });
};

// Fetch featured post (latest one)
export const getFeaturedPost = async () => {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      mainImage {
        asset -> {
          _id,
          url
        }
      }
    }
  `);
};