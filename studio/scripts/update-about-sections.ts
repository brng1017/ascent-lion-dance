import {getCliClient} from 'sanity/cli'
import {aboutDefaults} from '../../web/src/sanity/about-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  let draft = await client.getDocument('drafts.aboutPage')
  if (!draft) {
    const published = await client.getDocument('aboutPage')
    if (!published) throw new Error('Create About Page before adding the new sections.')
    const {_id, _rev, _createdAt, _updatedAt, ...fields} = published
    draft = await client.create({...fields, _id: 'drafts.aboutPage'})
  }
  let patch = client.patch(draft._id).ifRevisionId(draft._rev).setIfMissing({
    lionDanceHeading: aboutDefaults.lionDanceHeading,
    lionDanceText: aboutDefaults.lionDanceText,
    dragonDanceHeading: aboutDefaults.dragonDanceHeading,
    dragonDanceText: aboutDefaults.dragonDanceText,
    journeyHeading: aboutDefaults.journeyHeading,
    milestones: aboutDefaults.milestones,
  })
  if (draft.valuesHeading === 'More than a performance.')
    patch = patch.set({valuesHeading: aboutDefaults.valuesHeading})
  await patch.commit()
  console.log(
    'Added missing lion dance, dragon dance, and journey content to About Page draft. Preserved all existing content. Nothing was published.',
  )
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
