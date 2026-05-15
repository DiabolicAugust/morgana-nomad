import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      description: "Canonical site URL",
    }),
    defineField({
      name: "ogImage",
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
    defineField({ name: "twitterHandle", type: "string", description: "Without @" }),
  ],
});
