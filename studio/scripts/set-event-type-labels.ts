import {getCliClient} from 'sanity/cli'
import {serviceDefaults} from '../../web/src/sanity/home-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  const documents = await client.fetch<{_id: string; title?: string; slug?: string}[]>(
    '*[_type == "performanceService" && !defined(eventTypeLabel)]{_id, title, "slug": slug.current}',
  )
  for (const document of documents) {
    const label =
      serviceDefaults.find((service) => service.slug === document.slug)?.eventTypeLabel ??
      document.title
    if (!label) continue
    await client.patch(document._id).setIfMissing({eventTypeLabel: label}).commit()
    console.log(`Added event type label to ${document._id}: ${label}`)
  }
  console.log('Preserved all existing labels, service titles, copy, and images.')
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
