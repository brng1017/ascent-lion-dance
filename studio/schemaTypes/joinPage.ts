import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const joinPage = defineType({
  name: 'joinPage',
  title: 'Join Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'story', title: 'Introduction'},
    {name: 'contact', title: 'Contact'},
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
    defineField({
      name: 'heroImage',
      title: 'Hero photograph',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({name: 'storyHeading', type: 'string', group: 'story'}),
    defineField({name: 'storyText', type: 'text', rows: 5, group: 'story'}),
    defineField({name: 'contactHeading', type: 'string', group: 'contact'}),
    defineField({name: 'contactText', type: 'text', rows: 3, group: 'contact'}),
    defineField({
      name: 'email',
      title: 'Team contact email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
  ],
  preview: {prepare: () => ({title: 'Join Page', subtitle: 'Hero, introduction, and contact'})},
})
