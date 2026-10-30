import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  const documents = await client.fetch<{_id: string; _rev: string}[]>(
    '*[_type == "homePage" && defined(sponsors)]{_id, _rev}',
  )
  for (const document of documents) {
    await client.patch(document._id).ifRevisionId(document._rev).unset(['sponsors']).commit()
    console.log(`Removed manual sponsor selection from ${document._id}`)
  }
  console.log(
    'Sponsor documents were preserved. The banner now queries published sponsors automatically.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
