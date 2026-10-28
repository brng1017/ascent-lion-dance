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
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'homePage'),
          ]),
    }),
    visionTool(),
  ],

  document: {
    singletons: [defineSingleton({documentId: 'homePage', schemaType: 'homePage'})],
  },

  schema: {
    types: schemaTypes,
  },
})
