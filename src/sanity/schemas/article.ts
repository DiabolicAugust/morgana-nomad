import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "featuredImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required().max(180),
        }),
      ],
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "city",
      type: "reference",
      to: [{ type: "city" }],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
    }),
    defineField({
      name: "relatedArticles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "faqs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            { name: "question", type: "string", validation: (Rule) => Rule.required() },
            { name: "answer", type: "text", validation: (Rule) => Rule.required() },
          ],
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Body",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "string",
                    title: "URL or path (e.g. /blog/other-slug)",
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    name: "openInNewTab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
        defineArrayMember({
          type: "object",
          name: "callout",
          fields: [
            defineField({
              name: "tone",
              type: "string",
              options: {
                list: [
                  { title: "Note", value: "note" },
                  { title: "Tip", value: "tip" },
                  { title: "Warning", value: "warning" },
                ],
                layout: "radio",
              },
              initialValue: "note",
            }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text" }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      type: "string",
      description: "≤60 characters recommended",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      rows: 3,
      description: "≤160 characters recommended",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "keywords",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "canonicalPath",
      type: "string",
      description: "Override path only (e.g. /blog/custom-slug). Leave empty for default.",
    }),
  ],
  preview: {
    select: { title: "title", media: "featuredImage" },
    prepare({ title, media }) {
      return { title: title ?? "Untitled", media };
    },
  },
});
