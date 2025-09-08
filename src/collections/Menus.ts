import { CollectionConfig } from 'payload';

// Reusable fields for menu items
const menuItemFields: CollectionConfig['fields'] = [
  {
    name: 'label',
    type: 'text',
    label: 'Label (overrides related item’s title if set)',
  },
  {
    name: 'type',
    type: 'select',
    required: true,
    options: [
      { label: 'Category', value: 'category' },
      { label: 'Subcategory', value: 'subcategory' },
      { label: 'Article', value: 'article' },
      { label: 'Custom Link', value: 'custom' },
    ],
  },
  {
    name: 'category',
    type: 'relationship',
    relationTo: 'categories',
    required: true,
    admin: {
      condition: (data, siblingData) => siblingData.type === 'category',
    },
  },
  {
    name: 'subcategory',
    type: 'relationship',
    relationTo: 'subcategories',
    required: true,
    admin: {
      condition: (data, siblingData) => siblingData.type === 'subcategory',
    },
  },
  {
    name: 'article',
    type: 'relationship',
    relationTo: 'articles',
    required: true,
    admin: {
      condition: (data, siblingData) => siblingData.type === 'article',
    },
  },
  {
    name: 'url',
    type: 'text',
    label: 'Custom URL (e.g., /about or https://external.com)',
    required: true,
    admin: {
      condition: (data, siblingData) => siblingData.type === 'custom',
    },
  },
];

export const Menus: CollectionConfig = {
  slug: 'menus',
  admin: {
    useAsTitle: 'title',
    description: 'Manage menus for navbar or sidebar with dynamic, orderable items.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Menu Title (e.g., Sidebar or Navbar)',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      label: 'Menu Slug (unique identifier, e.g., sidebar-menu)',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      minRows: 0,
      fields: [
        ...menuItemFields,
        {
          name: 'children',
          type: 'array',
          label: 'Submenu Items (nested under this item)',
          fields: [...menuItemFields], // One level of nesting
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }
        return data;
      },
    ],
  },
};