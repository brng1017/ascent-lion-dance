import {getCliClient} from 'sanity/cli'
import {aboutDefaults} from '../../web/src/sanity/about-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  const existing = await client.fetch<string | null>(
    '*[_id in ["aboutPage", "drafts.aboutPage"]][0]._id',
  )
  if (existing) {
    console.log('About Page already exists. Preserved all existing content.')
    return
  }
  // Copy image references once; the About page never fetches homepage content at runtime.
  const images = await client.fetch<{heroImage?: unknown; communityImage?: unknown} | null>(
    '*[_id == "homePage"][0]{heroImage, communityImage}',
  )
  await client.createIfNotExists({
    _id: 'drafts.aboutPage',
    _type: 'aboutPage',
    ...aboutDefaults,
    ...(images?.heroImage ? {heroImage: images.heroImage} : {}),
    ...(images?.communityImage ? {communityImage: images.communityImage} : {}),
  })
  console.log(
    'Created About Page draft with independent hero, story, values, community, and call to action. Nothing was published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
