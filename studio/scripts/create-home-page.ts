import {getCliClient} from 'sanity/cli'
import {homeDefaults, serviceDefaults} from '../../web/src/sanity/home-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

// Source photographs are from the existing Ascent website. Sanity deduplicates assets.
const imageSources: Record<string, string> = {
  grandOpening: '/static/d1e0e0ee870bf542be005a9f6cc86c03/4e7ce/whatis.jpg',
  performance: '/static/90297e0e62602d00ac7036c244ca3735/755f3/hero-01.jpg',
  celebration: '/static/6f3de9edeef09165ed4030c3b189e173/942c2/hero-02.jpg',
  lunarNewYear: '/static/2b3aa8786fbe4aad8dfe3ae488ae0f03/4e7ce/services-01.jpg',
  wedding: '/static/474a8820d393e246ac852e0441519887/f8d6b/services-02.jpg',
  community: '/static/3aeed0dc344f4b4e5d83d07937fb486e/755f3/about-01.jpg',
}

const serviceImages: Record<string, string> = {
  'lunar-new-year': imageSources.lunarNewYear,
  'grand-openings': imageSources.grandOpening,
  'wedding-performances': imageSources.wedding,
  'banquets-events': imageSources.community,
  birthdays: imageSources.grandOpening,
  'company-events': imageSources.performance,
}

async function uploadImage(path: string, alt: string) {
  const response = await fetch(`https://ascentliondance.org${path}`)
  if (!response.ok) throw new Error(`Could not load image: ${path}`)
  const asset = await client.assets.upload('image', await response.blob(), {
    filename: path.split('/').pop(),
  })
  return {_type: 'image', alt, asset: {_type: 'reference', _ref: asset._id}}
}

async function main() {
  const existingHome = await client.fetch<string | null>(
    '*[_id in ["homePage", "drafts.homePage"]][0]._id',
  )
  if (existingHome) {
    console.log(
      'Home Page already exists; preserving its copy and adding missing service references to a draft.',
    )
  }

  const featuredServices = []
  for (const service of serviceDefaults) {
    const matches = await client.fetch<{_id: string; title?: string}[]>(
      '*[_type == "performanceService" && slug.current == $slug]{_id, title}',
      {slug: service.slug},
    )
    const existing = matches.find((document) => document._id.startsWith('drafts.')) ?? matches[0]
    let id = existing?._id
    const image = await uploadImage(serviceImages[service.slug], service.title)
    if (!id) {
      const document = await client.create({
        _id: 'drafts.',
        _type: 'performanceService',
        title: service.title,
        eventTypeLabel: service.eventTypeLabel,
        slug: {_type: 'slug', current: service.slug},
        tagline: service.tagline,
        summary: service.summary,
        image,
      })
      id = document._id
      console.log(`Created service draft: ${service.title}`)
    } else if (id.startsWith('drafts.')) {
      // Add only missing display fields, preserving the existing title and copy.
      await client
        .patch(id)
        .setIfMissing({image, tagline: service.tagline, eventTypeLabel: service.eventTypeLabel})
        .commit()
      if (
        (service.slug === 'banquets-events' && existing?.title === 'Banquets & Events') ||
        (service.slug === 'wedding-performances' && existing?.title === 'Wedding Performances')
      ) {
        await client.patch(id).set({title: service.title}).commit()
      }
      console.log(`Preserved existing draft: ${service.title}; filled missing image/tagline.`)
    }
    featuredServices.push({
      _key: crypto.randomUUID(),
      _type: 'reference',
      _ref: id.replace(/^drafts\./, ''),
      _weak: true,
      _strengthenOnPublish: {type: 'performanceService'},
    })
  }

  if (existingHome) {
    let draft = await client.fetch<{
      _id: string
      _rev: string
      featuredServices?: {_ref: string}[]
    } | null>('*[_id == "drafts.homePage"][0]')
    if (!draft) {
      const published = await client.getDocument('homePage')
      if (!published) throw new Error('Existing homepage could not be read.')
      const {_id, _rev, _createdAt, _updatedAt, ...fields} = published
      draft = await client.create({...fields, _id: 'drafts.homePage'})
    }
    const existingRefs = new Set((draft.featuredServices ?? []).map((item) => item._ref))
    const additions = featuredServices.filter((item) => !existingRefs.has(item._ref))
    if (additions.length) {
      await client
        .patch(draft._id)
        .ifRevisionId(draft._rev)
        .setIfMissing({featuredServices: []})
        .append('featuredServices', additions)
        .commit()
    }
    console.log(
      `Added ${additions.length} service references to the homepage draft. Nothing was published.`,
    )
    return
  }

  await client.createIfNotExists({
    _id: 'drafts.homePage',
    _type: 'homePage',
    ...homeDefaults,
    featuredServices,
    heroImage: await uploadImage(imageSources.performance, 'Ascent lion dance performance'),
    communityImage: await uploadImage(imageSources.celebration, 'The Ascent lion dance team'),
  })
  console.log(
    'Created Home Page draft with copy, photographs, service references, and contact details. Nothing was published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
