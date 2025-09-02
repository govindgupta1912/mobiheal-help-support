import { CollectionConfig } from 'payload';
import slugify from 'slugify';

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Adjust permissions as needed
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      // Optional: Auto-generate slug hook as above
       hooks: {
              beforeValidate: [
                ({ data, value }) => {
                  return value || slugify(data?.title || '', { lower: true, strict: true });
                },
              ],
            },
      
    },
    {
      name: 'readTime',
      type: 'number',
      required: true,
      label: 'Read Time (in minutes)',
      min: 1,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Excerpt',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
      // Customize richText options as needed, e.g., enable specific lexical features
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: ['categories', 'subcategories'],
      required: true,
      label: 'Parent (Category or Subcategory)',
      // This polymorphic relation allows the article to belong directly to a category or a subcategory
      // In the admin UI, you'll select the collection type first, then the item
    },
    // Optional: Add a publish date if you want a custom "date" for cards (otherwise use timestamps)
    {
      name: 'publishDate',
      type: 'date',
      label: 'Publish Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  timestamps: true, // Enables createdAt/updatedAt for default dates
};

export default Articles;