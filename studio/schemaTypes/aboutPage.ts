import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

function photo(name: string, title: string, group: string) {
  return defineField({
    name,
    title,
    group,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    ],
  })
}

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'story', title: 'Our story'},
    {name: 'values', title: 'Our values'},
    {name: 'community', title: 'Community'},
    {name: 'booking', title: 'Booking & contact'},
  ],
  fields: [
    defineField({name: 'eyebrow', title: 'Introduction', type: 'string', group: 'hero'}),
    defineField({
      name: 'heroTitle',
      title: 'Headline, first line',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Headline, second line',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    photo('heroImage', 'Hero photograph', 'hero'),
    defineField({name: 'storyHeading', type: 'string', group: 'story'}),
    defineField({name: 'storyText', type: 'text', rows: 7, group: 'story'}),
    defineField({
      name: 'valuesIntroduction',
      title: 'Introduction',
      type: 'string',
      group: 'values',
    }),
    defineField({name: 'valuesHeading', type: 'string', group: 'values'}),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      group: 'values',
      of: [
        defineArrayMember({
          name: 'aboutValue',
          title: 'Value',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
    }),
    defineField({name: 'communityHeading', type: 'string', group: 'community'}),
    defineField({name: 'communityText', type: 'text', rows: 4, group: 'community'}),
    photo('communityImage', 'Community photograph', 'community'),
    defineField({name: 'bookingHeading', type: 'string', group: 'booking'}),
    defineField({name: 'bookingDescription', type: 'text', rows: 3, group: 'booking'}),
    defineField({
      name: 'email',
      title: 'Team contact email',
      type: 'string',
      group: 'booking',
      validation: (rule) => rule.email(),
    }),
  ],
  preview: {prepare: () => ({title: 'About Page', subtitle: 'Hero, story, values, and community'})},
})
