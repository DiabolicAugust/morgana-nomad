import { defineField, defineType } from "sanity";

export const city = defineType({
  name: "city",
  title: "City",
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
      name: "country",
      type: "string",
      initialValue: "Poland",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "country" },
  },
});
