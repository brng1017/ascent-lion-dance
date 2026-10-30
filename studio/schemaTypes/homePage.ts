import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

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

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'story', title: 'Our story'},
    {name: 'services', title: 'Services'},
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
    defineField({
      name: 'occasions',
      title: 'Celebration ribbon',
      type: 'array',
      group: 'hero',
      hidden: true,
      readOnly: true,
      deprecated: {reason: 'The ribbon now uses the featured service titles automatically.'},
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'storyHeading', type: 'string', group: 'story'}),
    defineField({name: 'storyText', type: 'text', rows: 7, group: 'story'}),
    defineField({name: 'storyUrl', title: 'Learn more URL', type: 'url', group: 'story'}),
    defineField({name: 'servicesHeading', type: 'string', group: 'services'}),
    defineField({name: 'servicesDescription', type: 'text', rows: 2, group: 'services'}),
    defineField({
      name: 'featuredServices',
      type: 'array',
      group: 'services',
      of: [defineArrayMember({type: 'reference', to: [{type: 'performanceService'}]})],
      validation: (rule) => rule.unique(),
      description:
        'Services in carousel order, with no item limit. Publish the referenced services to display them.',
    }),
    defineField({name: 'communityHeading', type: 'string', group: 'community'}),
    defineField({name: 'communityText', type: 'text', rows: 4, group: 'community'}),
    photo('communityImage', 'Community photograph', 'community'),
    defineField({name: 'bookingHeading', type: 'string', group: 'booking'}),
    defineField({name: 'bookingDescription', type: 'text', rows: 3, group: 'booking'}),
    defineField({
      name: 'email',
      type: 'string',
      group: 'booking',
      validation: (rule) => rule.email(),
    }),
    defineField({name: 'phone', type: 'string', group: 'booking'}),
    defineField({name: 'instagramUrl', title: 'Instagram URL', type: 'url', group: 'booking'}),
  ],
  preview: {prepare: () => ({title: 'Home Page', subtitle: 'Hero, story, services, and booking'})},
})
