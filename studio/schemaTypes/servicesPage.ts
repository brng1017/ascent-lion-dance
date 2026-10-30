import {defineArrayMember, defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons/Sparkles'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: SparklesIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'introduction', title: 'Introduction'},
    {name: 'booking', title: 'How to book'},
    {name: 'options', title: 'Performance options'},
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
    defineField({name: 'introHeading', title: 'Heading', type: 'string', group: 'introduction'}),
    defineField({
      name: 'introText',
      title: 'Team and services summary',
      type: 'text',
      rows: 7,
      group: 'introduction',
    }),
    defineField({
      name: 'bookingSteps',
      validation: (rule) => rule.required().length(3),
      title: 'Booking steps',
      type: 'array',
      group: 'booking',
      description:
        'Three steps in order: request, confirmation, and performance. Numbers are added automatically.',
      of: [
        defineArrayMember({
          name: 'bookingStep',
          title: 'Booking step',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
    defineField({
      name: 'performanceOptions',
      title: 'Performance options',
      type: 'array',
      group: 'options',
      description:
        'Add a title and photograph for each option, then drag items to set their display order. Publish Services Page to update the website.',
      of: [
        defineArrayMember({
          name: 'performanceOptionItem',
          title: 'Performance option',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'image',
              title: 'Photograph',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required().assetRequired(),
            }),
          ],
          preview: {select: {title: 'title', media: 'image'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Services Page', subtitle: 'Hero, introduction, and how to book'}),
  },
})
