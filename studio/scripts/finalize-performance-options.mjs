import {getCliClient} from 'sanity/cli'
import {mkdir, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {isDeepStrictEqual} from 'node:util'
import {servicesDefaults} from '../../web/src/sanity/services-defaults.ts'

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
  if (!documents.length) throw new Error('No standalone options remain; nothing to migrate.')
  const pages = await client.fetch('*[_id in ["servicesPage", "drafts.servicesPage", "homePage"]]')
  const draft = pages.find((page) => page._id === 'drafts.servicesPage')
  if (!draft) throw new Error('Services Page draft is missing.')
  if (pages.some((page) => page._id === 'servicesPage'))
    throw new Error('A published Services Page now exists. Review before migrating.')
  const selected = new Map()
  for (const document of documents.filter((doc) => !doc._id.startsWith('drafts.')))
    selected.set(document._id, document)
  for (const document of documents.filter((doc) => doc._id.startsWith('drafts.')))
    selected.set(document._id.replace(/^drafts\./, ''), document)
  for (const option of [...selected.values()].map(item)) {
    const copied = draft.performanceOptions?.find((value) => value._key === option._key)
    if (!isDeepStrictEqual(copied, option))
      throw new Error(`Draft copy changed or missing: ${option.title}. Originals retained.`)
  }
  const references = await client.fetch('*[references($ids)]{_id}', {
    ids: documents.map((doc) => doc._id),
  })
  if (references.length)
    throw new Error('Standalone options still have references. Originals retained.')
  const home = pages.find((page) => page._id === 'homePage')
  const publishedOptions = documents
    .filter((doc) => !doc._id.startsWith('drafts.') && doc.title && doc.image?.asset)
    .map(item)
  const published = {
    _id: 'servicesPage',
    _type: 'servicesPage',
    ...servicesDefaults,
    ...(home?.heroImage ? {heroImage: home.heroImage} : {}),
    performanceOptions: publishedOptions,
  }
  const directory = resolve('.sanity/backups')
  await mkdir(directory, {recursive: true})
  const backup = resolve(directory, `finalize-performance-options-${Date.now()}.ndjson`)
  await writeFile(
    backup,
    [...pages, ...documents].map((doc) => JSON.stringify(doc)).join('\n') + '\n',
    {flag: 'wx'},
  )
  console.log(`Backup: ${backup}`)
  let transaction = client
    .transaction()
    .patch(draft._id, (patch) =>
      patch.ifRevisionId(draft._rev).set({performanceOptions: draft.performanceOptions}),
    )
    .create(published)
  for (const document of documents)
    transaction = transaction
      .patch(document._id, (patch) =>
        patch.ifRevisionId(document._rev).set({title: document.title}),
      )
      .delete(document._id)
  await transaction.commit()
  const saved = await client.getDocument('servicesPage')
  const savedDraft = await client.getDocument(draft._id)
  for (const [key, value] of Object.entries(published))
    if (!isDeepStrictEqual(saved[key], value))
      throw new Error(`Published verification failed: ${key}`)
  for (const [key, value] of Object.entries(draft))
    if (!['_rev', '_updatedAt'].includes(key) && !isDeepStrictEqual(savedDraft[key], value))
      throw new Error(`Draft verification failed: ${key}`)
  const remaining = await client.fetch('count(*[_type == "performanceOption"])')
  if (remaining) throw new Error(`${remaining} standalone options remain.`)
  console.log(
    `Verified ${publishedOptions.length} live options and ${draft.performanceOptions.length} draft options. Pending draft edits preserved; ${documents.length} standalone records removed.`,
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
