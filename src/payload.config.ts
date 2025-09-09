// storage-adapter-import-placeholder
// import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// import {
//   lexicalEditor,
//   // ✅ Correct feature names:
//   BoldFeature,
//   ItalicFeature,
//   UnderlineFeature,
//   StrikethroughFeature,
//   SubscriptFeature,
//   SuperscriptFeature,
//   InlineCodeFeature,
//   ParagraphFeature,
//   HeadingFeature,
//   AlignFeature,
//   IndentFeature,
//   UnorderedListFeature,
//   OrderedListFeature,
//   ChecklistFeature,
//   LinkFeature,
//   RelationshipFeature,
//   BlockquoteFeature,
//   UploadFeature,
//   HorizontalRuleFeature,
//   FixedToolbarFeature,
//   EXPERIMENTAL_TableFeature, // tables
// } from '@payloadcms/richtext-lexical'
// import path from 'path'
// import { buildConfig } from 'payload'
// import { fileURLToPath } from 'url'
// import sharp from 'sharp'

// import { Users } from './collections/Users'
// import { Media } from './collections/Media'
// import { HelpArticles } from './collections/HelpArticles'
// import Articles from './collections/Articles'
// import Categories from './collections/Categories'
// import Subcategories from './collections/Subcategories'
// import { Menus } from './collections/Menus'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

// export default buildConfig({
//   admin: {
//     user: Users.slug,
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//   },

//   collections: [Users, Media, HelpArticles, Articles, Categories, Subcategories, Menus],

//   // ✅ Lexical editor with rich features enabled
//   editor: lexicalEditor({
//     features: ({ defaultFeatures }) => [
//       // Keep Payload’s good defaults (already includes lists, links, quotes, uploads, etc.)
//       ...defaultFeatures,

//       // Explicitly include / customize extras:
//       FixedToolbarFeature({ applyToFocusedEditor: true }),
//       HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
//       EXPERIMENTAL_TableFeature(),

//       // (These are part of defaults, but listing them is harmless if you want to be explicit)
//       BoldFeature(),
//       ItalicFeature(),
//       UnderlineFeature(),
//       StrikethroughFeature(),
//       SubscriptFeature(),
//       SuperscriptFeature(),
//       InlineCodeFeature(),
//       ParagraphFeature(),
//       AlignFeature(),
//       IndentFeature(),
//       UnorderedListFeature(),
//       OrderedListFeature(),
//       ChecklistFeature(),
//       LinkFeature({}),
//       RelationshipFeature({}),
//       BlockquoteFeature(),
//       UploadFeature(),
//       HorizontalRuleFeature(),
//     ],
//   }),

//   secret: process.env.PAYLOAD_SECRET || '',

//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },

//   db: mongooseAdapter({
//     url: process.env.DATABASE_URI || '',
//   }),

//   sharp,

//   plugins: [
//     payloadCloudPlugin(),
//     // storage-adapter-placeholder
//   ],
// })


// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  HeadingFeature,
  AlignFeature,
  IndentFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  LinkFeature,
  RelationshipFeature,
  BlockquoteFeature,
  UploadFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { searchPlugin } from '@payloadcms/plugin-search';
import { lexicalToText } from './app/(frontend)/utils/lexicalToText';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { HelpArticles } from './collections/HelpArticles';
import Articles from './collections/Articles';
import Categories from './collections/Categories';
import Subcategories from './collections/Subcategories';
import { Menus } from './collections/Menus';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, HelpArticles, Articles, Categories, Subcategories, Menus],

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature({ applyToFocusedEditor: true }),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      EXPERIMENTAL_TableFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      InlineCodeFeature(),
      ParagraphFeature(),
      AlignFeature(),
      IndentFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),
      LinkFeature({}),
      RelationshipFeature({}),
      BlockquoteFeature(),
      UploadFeature(),
      HorizontalRuleFeature(),
    ],
  }),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  plugins: [
    payloadCloudPlugin(),
    searchPlugin({
      collections: ['articles'],
      searchOverrides: {
        slug: 'help-search',
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'excerpt',
            type: 'text',
            index: true,
          },
          {
            name: 'contentExcerpt',
            type: 'text',
            index: true,
          },
          {
            name: 'parentData',
            type: 'array',
            fields: [
              { name: 'type', type: 'text' },
              { name: 'name', type: 'text' },
              { name: 'slug', type: 'text' },
              { name: 'description', type: 'text' },
            ],
            index: true,
          },
        ],
      },
      beforeSync: ({ originalDoc, searchDoc }) => {
        const contentExcerpt = originalDoc.content ? lexicalToText(originalDoc.content).slice(0, 500) + '...' : '';
       let parentData: {
          type: string;
          name: string;
          slug: string;
          description: string;
        }[] = [];
        if (originalDoc.parent && originalDoc.parent.relationTo && originalDoc.parent.value) {
          const parentValue = originalDoc.parent.value;
          parentData = [{
            type: originalDoc.parent.relationTo,
            name: parentValue.name || '',
            slug: parentValue.slug || '',
            description: parentValue.description || '',
          }];
        }
        return {
          ...searchDoc,
          title: originalDoc.title,
          excerpt: originalDoc.excerpt,
          contentExcerpt,
          parentData,
        };
      },
      defaultPriorities: {
        articles: 10,
      },
      syncDrafts: true,
      reindexBatchSize: 50,
    }),
  ],
});