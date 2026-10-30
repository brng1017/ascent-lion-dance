import {getCliClient} from 'sanity/cli'
import {sponsorDefaults} from '../../web/src/sanity/home-defaults'

const client = getCliClient({apiVersion: '2026-10-19'}).withConfig({
  projectId: 'e2taaqx6',
  dataset: 'production',
  useCdn: false,
  perspective: 'raw',
})

async function main() {
  for (const name of sponsorDefaults) {
    const existing = await client.fetch<{_id: string}[]>(
      '*[_type == "sponsor" && name == $name]{_id}',
      {name},
    )
    const match = existing.find((document) => document._id.startsWith('drafts.')) ?? existing[0]
    if (!match) await client.create({_id: 'drafts.', _type: 'sponsor', name})
    console.log(`${match ? 'Preserved' : 'Created draft'}: ${name}`)
  }
  console.log('Publish sponsor documents to show them automatically. Nothing was published.')
}

main().catch((error) => {
  console.error(error.message)
  throw error
})
