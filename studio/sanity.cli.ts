import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'e2taaqx6',
    dataset: 'production',
  },
  typegen: {
    enabled: true,
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
  deployment: {
    appId: 'bnc0xqed6nlyauy3033qu7d5',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
