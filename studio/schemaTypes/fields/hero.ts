import {defineField} from 'sanity'
import {photoField} from './photo'

export function heroFields() {
  return [
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
    photoField('heroImage', 'Hero photograph', 'hero'),
  ]
}
