import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  const documents = await client.fetch<
    {_id: string; _rev: string; galleryImages?: {caption?: string}[]}[]
  >(
    '*[_type == "aboutPage" && count(galleryImages[defined(caption)]) > 0]{_id, _rev, galleryImages}',
  )
  for (const document of documents) {
    const fields = (document.galleryImages ?? []).flatMap((image, index) =>
      Object.hasOwn(image, 'caption') ? [`galleryImages[${index}].caption`] : [],
    )
    await client.patch(document._id).ifRevisionId(document._rev).unset(fields).commit()
    console.log(`Removed gallery captions from ${document._id}`)
  }
  const remaining = await client.fetch<number>(
    'count(*[_type == "aboutPage" && count(galleryImages[defined(caption)]) > 0])',
  )
  if (remaining) throw new Error('Some captions remain; retry after concurrent edits finish.')
  console.log(
    'Verified: no saved gallery captions remain. Images, order, alt text, and crops were preserved.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
