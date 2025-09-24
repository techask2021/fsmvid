import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon} from '@sanity/icons'

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    },
    {
      type: 'object',
      name: 'table',
      title: 'Table',
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Table Caption'
        },
        {
          name: 'rows',
          type: 'array',
          title: 'Table Rows',
          of: [
            {
              type: 'object',
              name: 'row',
              title: 'Table Row',
              fields: [
                {
                  name: 'cells',
                  type: 'array',
                  title: 'Cells',
                  of: [
                    {
                      type: 'string',
                      name: 'cell',
                      title: 'Cell Content'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      preview: {
        select: {
          title: 'caption',
          subtitle: 'rows.0.cells.0'
        },
        prepare(selection) {
          const {title, subtitle} = selection
          return {
            title: title || 'Table',
            subtitle: subtitle || 'Table with data'
          }
        }
      }
    },
  ],
})
