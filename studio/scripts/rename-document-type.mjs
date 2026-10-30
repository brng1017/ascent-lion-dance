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

async function main() {
  const source = process.env.SANITY_SOURCE_TYPE
  const destination = process.env.SANITY_DESTINATION_TYPE
  if (!source || !destination || source === destination)
    throw new Error('Provide different source and destination document types.')
  const documents = await client.fetch('*[_type == $source]', {source})
  if (!documents.length) {
    console.log('No documents require renaming.')
    return
  }
  for (const document of documents) {
    const references = await client.fetch('count(*[references($id)])', {
      id: document._id.replace(/^drafts\./, ''),
    })
    if (references)
      throw new Error(
        `Document ${document._id} has incoming references; migrate references before renaming.`,
      )
  }
  const backupDirectory = resolve('.sanity/backups')
  await mkdir(backupDirectory, {recursive: true})
  const backupPath = resolve(backupDirectory, `document-type-rename-${Date.now()}.ndjson`)
  await writeFile(
    backupPath,
    documents.map((document) => JSON.stringify(document)).join('\n') + '\n',
    {flag: 'wx'},
  )
  console.log(`Backed up ${documents.length} documents to ${backupPath}`)
  for (const document of documents) {
    const {_rev, _createdAt, _updatedAt, ...fields} = document
    await client
      .transaction()
      .patch(document._id, (patch) => patch.ifRevisionId(_rev).set({title: document.title}))
      .delete(document._id)
      .commit()
    try {
      await client.create({...fields, _type: destination})
    } catch (error) {
      await client.createIfNotExists(fields)
      throw error
    }
    const renamed = await client.getDocument(document._id)
    for (const [field, value] of Object.entries(fields)) {
      if (field === '_type') continue
      if (!isDeepStrictEqual(renamed?.[field], value))
        throw new Error(`Verification failed for ${document._id}.${field}. Backup: ${backupPath}`)
    }
    console.log(`Renamed ${document._id}: ${document.title}`)
  }
  const remaining = await client.fetch('count(*[_type == $source])', {source})
  if (remaining)
    throw new Error('Some documents still need renaming. Rerun after resolving concurrent edits.')
  console.log(
    'Verified all document content and IDs. Drafts remain drafts; published documents remain published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
