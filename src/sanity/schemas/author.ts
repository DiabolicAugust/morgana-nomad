import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "Short byline, e.g. Immigration researcher",
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "credentials",
      type: "array",
      of: [{ type: "string" }],
      description: "Degrees, certifications, years of experience (E-E-A-T)",
    }),
    defineField({ name: "twitter", type: "url" }),
    defineField({ name: "linkedin", type: "url" }),
  ],
  preview: {
    select: { title: "name", media: "photo" },
  },
});
