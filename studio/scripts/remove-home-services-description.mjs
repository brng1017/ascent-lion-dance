import {getCliClient} from 'sanity/cli'
import {mkdir, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

const documents = await client.fetch(
  '*[_id in ["homePage", "drafts.homePage"] && defined(servicesDescription)]',
)
if (documents.length) {
  const directory = resolve('.sanity/backups')
  await mkdir(directory, {recursive: true})
  await writeFile(
    resolve(directory, `home-services-description-${Date.now()}.ndjson`),
    documents.map(document => JSON.stringify(document)).join('\n') + '\n',
    {flag: 'wx'},
  )
  let transaction = client.transaction()
  for (const document of documents)
    transaction = transaction.patch(document._id, patch =>
      patch.ifRevisionId(document._rev).unset(['servicesDescription']),
    )
  await transaction.commit()
}
console.log(`Removed obsolete description from ${documents.length} Home Page records. Other fields and draft status preserved.`)
