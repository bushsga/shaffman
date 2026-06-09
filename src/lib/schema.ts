export const postSchema = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Politics", value: "politics" },
          { title: "General News", value: "general" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary of the article",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
  ],
};