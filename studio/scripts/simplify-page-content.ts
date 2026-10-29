import {getCliClient} from 'sanity/cli'
import {servicesDefaults} from '../../web/src/sanity/services-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

type PageDocument = {
  _id: string
  _rev: string
  _type: string
  bookingSteps?: {
    _key: string
    _type: string
    title?: string
    description?: string
    buttonLabel?: string
  }[]
  [key: string]: unknown
}

async function main() {
  const documents = await client.fetch<PageDocument[]>(
    '*[_id in ["homePage", "drafts.homePage", "servicesPage", "drafts.servicesPage"]]',
  )
  const obsolete = [
    'heroButtonLabel',
    'bookingUrl',
    'requestButtonLabel',
    'includedHeading',
    'includedItems',
    'includedNote',
    'seoTitle',
    'seoDescription',
  ]
  // Remove only obsolete settings. Preserve all editable copy and image references.
  for (const document of documents) {
    const fields = document._type === 'servicesPage' ? obsolete : ['bookingUrl']
    const unset = fields.filter((field) => Object.hasOwn(document, field))
    if (document._type === 'servicesPage') {
      for (const [index, step] of (document.bookingSteps ?? []).entries()) {
        if (Object.hasOwn(step, 'buttonLabel')) unset.push(`bookingSteps[${index}].buttonLabel`)
      }
    }
    if (unset.length) {
      await client.patch(document._id).ifRevisionId(document._rev).unset(unset).commit()
      console.log(`Removed obsolete settings from ${document._id}`)
    }
  }
  // Update the booking content in a draft; do not publish editorial changes.
  let draft = await client.getDocument<PageDocument>('drafts.servicesPage')
  if (!draft) {
    const published = await client.getDocument<PageDocument>('servicesPage')
    if (!published) throw new Error('Create the Services Page before running this migration.')
    const {_id, _rev, _createdAt, _updatedAt, ...fields} = published
    draft = await client.create({...fields, _id: 'drafts.servicesPage'})
  }
  const steps = servicesDefaults.bookingSteps.map((fallback, index) => {
    const existing = draft.bookingSteps?.[index]
    return existing
      ? {
          _key: existing._key,
          _type: 'bookingStep',
          title: existing.title ?? fallback.title,
          description: existing.description ?? fallback.description,
        }
      : fallback
  })
  await client.patch(draft._id).ifRevisionId(draft._rev).set({bookingSteps: steps}).commit()
  console.log(
    'Services Page draft now has three booking steps. No editorial changes were published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
