import {getCliClient} from 'sanity/cli'
import {mkdir, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {isDeepStrictEqual} from 'node:util'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

function item(document) {
  const {_id, _type, _rev, _createdAt, _updatedAt, ...fields} = document
  return {...fields, _key: _id.replace(/^drafts\./, ''), _type: 'performanceOptionItem'}
}

async function main() {
  const documents = await client.fetch(
    '*[_type == "performanceOption"] | order(_createdAt asc, _id asc)',
  )
  const pages = await client.fetch('*[_id in ["servicesPage", "drafts.servicesPage"]]')
  let draft = pages.find((page) => page._id === 'drafts.servicesPage')
  const published = pages.find((page) => page._id === 'servicesPage')
  if (!draft && !published) throw new Error('Services Page is missing.')
  const selected = new Map()
  for (const document of documents.filter((document) => !document._id.startsWith('drafts.')))
    selected.set(document._id, document)
  for (const document of documents.filter((document) => document._id.startsWith('drafts.')))
    selected.set(document._id.replace(/^drafts\./, ''), document)
  const directory = resolve('.sanity/backups')
  await mkdir(directory, {recursive: true})
  const backup = resolve(directory, `embed-performance-options-${Date.now()}.ndjson`)
  await writeFile(
    backup,
    [...pages, ...documents].map((document) => JSON.stringify(document)).join('\n') + '\n',
    {flag: 'wx'},
  )
  console.log(`Backup: ${backup}`)
  if (!draft) {
    const {_id, _rev, _createdAt, _updatedAt, ...fields} = published
    draft = await client.create({...fields, _id: 'drafts.servicesPage'})
  }
  const expected = [...selected.values()].map(item)
  const existing = draft.performanceOptions ?? []
  const keys = new Set(existing.map((option) => option._key))
  const additions = expected.filter((option) => !keys.has(option._key))
  if (additions.length)
    await client
      .patch(draft._id)
      .ifRevisionId(draft._rev)
      .set({performanceOptions: [...existing, ...additions]})
      .commit()
  const saved = await client.getDocument(draft._id)
  for (const option of expected) {
    const copied = saved.performanceOptions?.find((value) => value._key === option._key)
    if (!isDeepStrictEqual(copied, option))
      throw new Error(`Copy verification failed for ${option.title}. Originals retained.`)
  }
  console.log(
    `Verified ${expected.length} options in Services Page draft. Titles, images, and crops preserved. No public documents changed or deleted.`,
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
