import { CollectionConfig } from 'payload';
import slugify from 'slugify';

const Subcategories: CollectionConfig = {
  slug: 'subcategories',
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
            return value || slugify(data?.title || '', { lower: true, strict: true });
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Parent Category',
    },
  ],
};

export default Subcategories;