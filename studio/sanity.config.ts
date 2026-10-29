import {defineConfig, defineSingleton} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Ascent Lion Dance Website',

  projectId: 'e2taaqx6',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website content')
          .items([
            S.listItem().singleton('homePage'),
            S.listItem().singleton('aboutPage'),
            S.listItem().singleton('servicesPage'),
            S.listItem().singleton('joinPage'),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                !['homePage', 'aboutPage', 'servicesPage', 'joinPage'].includes(item.getId() ?? ''),
            ),
          ]),
    }),
    visionTool(),
  ],

  document: {
    singletons: [
      defineSingleton({documentId: 'homePage', schemaType: 'homePage'}),
      defineSingleton({documentId: 'aboutPage', schemaType: 'aboutPage'}),
      defineSingleton({documentId: 'servicesPage', schemaType: 'servicesPage'}),
      defineSingleton({documentId: 'joinPage', schemaType: 'joinPage'}),
    ],
  },

  schema: {
    types: schemaTypes,
  },
})
