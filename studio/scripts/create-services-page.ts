import {getCliClient} from 'sanity/cli'
import {servicesDefaults} from '../../web/src/sanity/services-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  const existing = await client.fetch<string | null>(
    '*[_id in ["servicesPage", "drafts.servicesPage"]][0]._id',
  )
  if (existing) {
    console.log('Services Page already exists. Preserved all existing content.')
    return
  }
  const home = await client.fetch<{heroImage?: unknown} | null>(
    '*[_id == "homePage"][0]{heroImage}',
  )
  await client.createIfNotExists({
    _id: 'drafts.servicesPage',
    _type: 'servicesPage',
    ...servicesDefaults,
    ...(home?.heroImage ? {heroImage: home.heroImage} : {}),
  })
  console.log(
    'Created Services Page draft with hero and three booking steps. Nothing was published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
