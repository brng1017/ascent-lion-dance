import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  const draftId = 'drafts.servicesPage'
  const draft = await client.getDocument(draftId)
  if (!draft) throw new Error('Create the Services Page draft before adding options.')
  const existing = (draft.performanceOptions ?? []) as {title?: string}[]
  const additions = []
  for (const title of ['Lion Dance', 'Dragon Dance', 'LED Lion', 'Benches', 'Jongs']) {
    if (existing.some((option) => option.title === title)) {
      console.log(`Preserved: ${title}`)
      continue
    }
    additions.push({_type: 'performanceOptionItem', title})
  }
  if (additions.length)
    await client
      .patch(draftId)
      .ifRevisionId(draft._rev)
      .setIfMissing({performanceOptions: []})
      .append('performanceOptions', additions)
      .commit({autoGenerateArrayKeys: true})
  console.log(
    'Add photographs and arrange the options in Services Page, then publish the page. Nothing was published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
