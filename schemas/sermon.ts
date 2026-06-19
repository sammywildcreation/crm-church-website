import { defineField, defineType } from 'sanity'

export const sermonSchema = defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preacher',
      title: 'Preacher',
      type: 'string',
      initialValue: 'Apostle (Dr) K.K Bello',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: { accept: 'audio/*' },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'preacher',
      date: 'date',
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle} · ${date ?? 'No date'}`,
      }
    },
  },
})
