import {heroFields} from './fields/hero'
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
    ...heroFields(),
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
