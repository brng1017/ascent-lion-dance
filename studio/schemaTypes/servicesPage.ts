import {defineArrayMember, defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons/Sparkles'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: SparklesIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'booking', title: 'How to book'},
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
  ],
  preview: {
    prepare: () => ({title: 'Services Page', subtitle: 'Hero and how to book'}),
  },
})
