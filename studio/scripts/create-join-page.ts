import {getCliClient} from 'sanity/cli'
import {joinDefaults} from '../../web/src/sanity/join-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  const existing = await client.fetch<string | null>(
    '*[_id in ["joinPage", "drafts.joinPage"]][0]._id',
  )
  if (existing) {
    console.log('Join Page already exists. Preserved all existing content.')
    return
  }
  // Copy the image once; Join Page content is independent from the homepage.
  const home = await client.fetch<{heroImage?: unknown} | null>(
    '*[_id == "homePage"][0]{heroImage}',
  )
  await client.createIfNotExists({
    _id: 'drafts.joinPage',
    _type: 'joinPage',
    ...joinDefaults,
    ...(home?.heroImage ? {heroImage: home.heroImage} : {}),
  })
  console.log(
    'Created Join Page draft with its own hero, introduction, and contact details. Nothing was published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
