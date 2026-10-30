import {defineField} from 'sanity'

export function photoField(name: string, title: string, group: string) {
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
