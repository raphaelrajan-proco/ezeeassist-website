/**
 * Sanity schema for EZee Assist blog.
 *
 * To use:
 * 1. Run `npm create sanity@latest` in a separate directory (or alongside this project)
 * 2. Copy this schema into your Sanity studio's `schemaTypes` folder
 * 3. Add the `post` type to the schema array in `schemaTypes/index.ts`
 */

const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on listing and meta tags.",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Franchise Operations", value: "franchise-operations" },
          { title: "AI & Technology",      value: "ai-technology" },
          { title: "Customer Success",     value: "customer-success" },
          { title: "Product Updates",      value: "product-updates" },
          { title: "Company News",         value: "company-news" },
        ],
      },
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "mainImage" },
  },
};

export default post;
