import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

const fields = [
  'communityHeading',
  'communityText',
  'communityImage',
  'bookingHeading',
  'bookingDescription',
  'email',
]

async function main() {
  const documents = await client.fetch<{_id: string; _rev: string; [key: string]: unknown}[]>(
    '*[_type == "aboutPage" && _id in ["aboutPage", "drafts.aboutPage"]]',
  )
  for (const document of documents) {
    const obsolete = fields.filter((field) => Object.hasOwn(document, field))
    if (!obsolete.length) continue
    await client.patch(document._id).ifRevisionId(document._rev).unset(obsolete).commit()
    console.log(`Removed retired section fields from ${document._id}`)
  }
  const remaining = await client.fetch<number>(
    'count(*[_type == "aboutPage" && _id in ["aboutPage", "drafts.aboutPage"] && (defined(communityHeading) || defined(communityText) || defined(communityImage) || defined(bookingHeading) || defined(bookingDescription) || defined(email))])',
  )
  if (remaining)
    throw new Error('Some retired section fields remain; retry after any concurrent edits finish.')
  console.log(
    'Verified cleanup. Other About Page fields, other pages, and image assets were preserved.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
