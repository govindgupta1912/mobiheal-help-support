import { CollectionConfig } from 'payload';

export const HelpArticles: CollectionConfig = {
  slug: 'help-articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Adjust permissions as needed (e.g., for public access)
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, originalDoc, data }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase().replace(/\s+/g, '-');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'overview',
      type: 'richText',
      required: true,
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'sectionContent',
          type: 'richText',
          required: true,
        },
        {
          name: 'subsections',
          type: 'array',
          fields: [
            {
              name: 'subsectionTitle',
              type: 'text',
            },
            {
              name: 'subsectionContent',
              type: 'richText',
            },
            {
              name: 'steps',
              type: 'array',
              fields: [
                {
                  name: 'stepDescription',
                  type: 'richText',
                },
              ],
            },
            {
              name: 'examples',
              type: 'richText',
            },
          ],
        },
      ],
    },
    {
      name: 'bestPractices',
      type: 'array', // Changed to array for numbered lists
      fields: [
        {
          name: 'practiceTitle',
          type: 'text',
        },
        {
          name: 'practiceDescription',
          type: 'richText',
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'nextUp',
      type: 'relationship', // Relation to another HelpArticle for linking (e.g., "Content Management")
      relationTo: 'help-articles', // Self-relation
      hasMany: false, // Single relation; change to true if multiple
    },
  ],
};