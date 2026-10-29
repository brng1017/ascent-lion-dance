import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'
import {SparklesIcon} from '@sanity/icons/Sparkles'

const contentFields = [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
  defineField({
    name: 'slug',
    type: 'slug',
    options: {source: 'title', maxLength: 96},
    description: 'Use a single URL segment, for example about-us or wedding-performances.',
    validation: (rule) =>
      rule
        .required()
        .custom((slug) =>
          !slug?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)
            ? true
            : 'Use lowercase letters, numbers, and hyphens only.',
        ),
  }),
  defineField({name: 'summary', type: 'text', rows: 3}),
  defineField({
    name: 'body',
    type: 'array',
    of: [defineArrayMember({type: 'block'})],
  }),
]

export const performanceService = defineType({
  name: 'performanceService',
  title: 'Performance Service',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    ...contentFields,
    defineField({
      name: 'eventTypeLabel',
      title: 'Event type label',
      type: 'string',
      description:
        'Singular label for the booking form, for example Birthday, Grand Opening, or Wedding. The service title stays unchanged.',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      description: 'Short label shown above the service title on the homepage.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', validation: (rule) => rule.required()})],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'summary'}},
})

export const page = defineType({
  name: 'page',
  title: 'Website Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    ...contentFields,
    defineField({
      name: 'services',
      title: 'Featured performance services',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'performanceService'}]})],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'summary'}},
})
