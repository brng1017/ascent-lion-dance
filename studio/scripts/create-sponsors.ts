import {getCliClient} from 'sanity/cli'
import {sponsorDefaults} from '../../web/src/sanity/home-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  const references = []
  for (const name of sponsorDefaults) {
    const existing = await client.fetch<{_id: string}[]>(
      '*[_type == "sponsor" && name == $name]{_id}',
      {name},
    )
    const match = existing.find((document) => document._id.startsWith('drafts.')) ?? existing[0]
    const document = match ?? (await client.create({_id: 'drafts.', _type: 'sponsor', name}))
    references.push({
      _key: crypto.randomUUID(),
      _type: 'reference',
      _ref: document._id.replace(/^drafts\./, ''),
      _weak: true,
      _strengthenOnPublish: {type: 'sponsor'},
    })
    console.log(`${match ? 'Preserved' : 'Created draft'}: ${name}`)
  }
  let draft = await client.fetch<{_id: string; _rev: string; sponsors?: {_ref: string}[]} | null>(
    '*[_id == "drafts.homePage"][0]',
  )
  if (!draft) {
    const published = await client.getDocument('homePage')
    if (!published) throw new Error('Create the Home Page before adding sponsor references.')
    const {_id, _rev, _createdAt, _updatedAt, ...fields} = published
    draft = await client.create({...fields, _id: 'drafts.homePage'})
  }
  const existingRefs = new Set((draft.sponsors ?? []).map((item) => item._ref))
  const additions = references.filter((item) => !existingRefs.has(item._ref))
  if (additions.length) {
    await client
      .patch(draft._id)
      .ifRevisionId(draft._rev)
      .setIfMissing({sponsors: []})
      .append('sponsors', additions)
      .commit()
  }
  console.log(`Added ${additions.length} sponsors to the homepage draft. Nothing was published.`)
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
