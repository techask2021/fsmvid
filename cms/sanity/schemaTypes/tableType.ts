import {defineType} from 'sanity'

export const tableType = defineType({
  name: 'table',
  type: 'object',
  title: 'Table',
  fields: [
    {
      name: 'rows',
      type: 'array',
      title: 'Rows',
      of: [
        {
          type: 'array',
          title: 'Row',
          of: [
            {
              type: 'string',
              name: 'cell',
              title: 'Cell'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'rows.0.0'
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Table',
        subtitle: 'Table'
      }
    }
  }
})
