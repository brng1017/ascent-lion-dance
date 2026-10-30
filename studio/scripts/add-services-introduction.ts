import {getCliClient} from 'sanity/cli'
import {servicesDefaults} from '../../web/src/sanity/services-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  let draft = await client.getDocument('drafts.servicesPage')
  if (!draft) {
    const published = await client.getDocument('servicesPage')
    if (!published) throw new Error('Create Services Page before adding an introduction.')
    const {_id, _rev, _createdAt, _updatedAt, ...fields} = published
    draft = await client.create({...fields, _id: 'drafts.servicesPage'})
  }
  await client
    .patch(draft._id)
    .ifRevisionId(draft._rev)
    .setIfMissing({
      introHeading: servicesDefaults.introHeading,
      introText: servicesDefaults.introText,
    })
    .commit()
  console.log(
    'Added missing introduction copy to the Services Page draft. All existing content was preserved. Nothing was published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
