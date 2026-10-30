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
    {name: 'lionDance', title: 'What is lion dance?'},
    {name: 'dragonDance', title: 'What is dragon dance?'},
    {name: 'values', title: 'Our values'},
    {name: 'journey', title: 'Our journey'},
    {name: 'gallery', title: 'Photo gallery'},
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
    defineField({name: 'lionDanceHeading', title: 'Heading', type: 'string', group: 'lionDance'}),
    defineField({
      name: 'lionDanceText',
      title: 'Description',
      type: 'text',
      rows: 5,
      group: 'lionDance',
    }),
    photo('lionDanceImage', 'Lion dance photograph', 'lionDance'),
    defineField({
      name: 'dragonDanceHeading',
      title: 'Heading',
      type: 'string',
      group: 'dragonDance',
    }),
    defineField({
      name: 'dragonDanceText',
      title: 'Description',
      type: 'text',
      rows: 5,
      group: 'dragonDance',
    }),
    photo('dragonDanceImage', 'Dragon dance photograph', 'dragonDance'),
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
    defineField({name: 'journeyHeading', title: 'Heading', type: 'string', group: 'journey'}),
    defineField({
      name: 'milestones',
      title: 'Milestones',
      type: 'array',
      group: 'journey',
      description:
        'Displayed in this order. Add the year and a short description of each milestone.',
      of: [
        defineArrayMember({
          name: 'milestone',
          title: 'Milestone',
          type: 'object',
          fields: [
            defineField({name: 'year', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'text',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'year', subtitle: 'text'}},
        }),
      ],
    }),
    defineField({
      name: 'galleryHeading',
      title: 'Heading',
      type: 'string',
      group: 'gallery',
      initialValue: 'Photo gallery',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Photos',
      type: 'array',
      group: 'gallery',
      description:
        'Upload or choose images, then drag to reorder them. Publish About Page to update the gallery. The section is hidden when there are no photos.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          validation: (rule) => rule.required().assetRequired(),
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              description: 'Describe the photograph for visitors using a screen reader.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'alt', media: 'asset'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'About Page', subtitle: 'Hero, dance traditions, values, and journey'}),
  },
})
