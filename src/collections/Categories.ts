

import { CollectionConfig } from 'payload';
import slugify from 'slugify';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
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
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            // Generate slug from title if not provided or empty
            return value || slugify(data?.title || '', { lower: true, strict: true });
          },
        ],
      },
    },
  ],
};

export default Categories;