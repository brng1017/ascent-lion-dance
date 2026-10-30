import {getCliClient} from 'sanity/cli'
import {mkdir, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})
const documents = await client.fetch('*[_type == "performanceService" && defined(body)]')
if (documents.length) {
  const directory = resolve('.sanity/backups')
  await mkdir(directory, {recursive: true})
  await writeFile(
    resolve(directory, `service-body-${Date.now()}.ndjson`),
    documents.map((document) => JSON.stringify(document)).join('\n') + '\n',
    {flag: 'wx'},
  )
  let transaction = client.transaction()
  for (const document of documents)
    transaction = transaction.patch(document._id, (patch) =>
      patch.ifRevisionId(document._rev).unset(['body']),
    )
  await transaction.commit()
}
const remaining = await client.fetch('count(*[_type == "performanceService" && defined(body)])')
if (remaining) throw new Error(`Body still exists on ${remaining} service records.`)
console.log(
  `Removed Body from ${documents.length} performance service records. Backups saved; other fields and draft status preserved.`,
)
