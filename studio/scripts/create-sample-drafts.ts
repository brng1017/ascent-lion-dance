import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

const samples = [
  {
    _type: 'page',
    title: 'About Ascent Lion Dance',
    slug: {current: 'about-us', _type: 'slug'},
    summary: 'Discover Ascent Lion Dance.',
    text: 'Sample copy for review: Introduce your team, your story, and the communities you serve here.',
  },
  {
    _type: 'performanceService',
    title: 'Wedding Performances',
    slug: {current: 'wedding-performances', _type: 'slug'},
    summary: 'Celebrate your wedding with a lion dance performance.',
    text: 'Sample copy for review: Describe your wedding performance options, planning process, and how couples can inquire. Confirm the details before publishing.',
  },
  {
    _type: 'performanceService',
    title: 'Community and Business Celebrations',
    slug: {current: 'community-business-celebrations', _type: 'slug'},
    summary: 'Bring lion dance to a community gathering or business celebration.',
    text: 'Sample copy for review: Describe the celebrations your team supports and how organizers can request a performance. Confirm availability and booking details before publishing.',
  },
]

async function main() {
  const existing = await client.fetch<{_id: string; _type: string; title?: string}[]>(
    '*[_type in ["page", "performanceService"]][0...10]{_id, _type, title}',
  )
  console.log('Existing content:', JSON.stringify(existing))
  for (const {text, ...sample} of samples) {
    // Check before creating so rerunning this script does not duplicate the samples.
    const found = await client.fetch<string | null>(
      '*[_type == $type && slug.current == $slug][0]._id',
      {type: sample._type, slug: sample.slug.current},
    )
    if (found) {
      console.log(`Skipped existing ${sample._type}: ${sample.title}`)
      continue
    }
    const document = await client.create({
      ...sample,
      // Sanity generates the ID after this prefix, keeping the document unpublished.
      _id: 'drafts.',
      ...(sample._type === 'page'
        ? {
            body: [
              {
                _type: 'block',
                _key: crypto.randomUUID(),
                style: 'normal',
                markDefs: [],
                children: [{_type: 'span', _key: crypto.randomUUID(), marks: [], text}],
              },
            ],
          }
        : {}),
    })
    console.log(`Created draft ${document._id}: ${sample.title}`)
  }
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
