import {defineField, defineType} from 'sanity'
import {HeartIcon} from '@sanity/icons/Heart'

export const sponsor = defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Company name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional. When no logo is provided, the company name is displayed.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Defaults to the company name.',
        }),
      ],
    }),
    defineField({
      name: 'website',
      type: 'url',
      description: 'Optional link to the sponsor’s website.',
    }),
  ],
  preview: {select: {title: 'name', media: 'logo'}},
})
