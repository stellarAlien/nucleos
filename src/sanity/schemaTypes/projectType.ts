import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Biotech Project',
  type: 'document',
  fields: [
    // --- SECTION 1: IDENTITY ---
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // --- NEW: CATEGORY SELECTION ---
    // Moved outside of the references array so it's a top-level document property
    defineField({
      name: 'category',
      title: 'Content Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technical Briefing', value: 'technical' },
          { title: 'New Partnership', value: 'partnership' },
          { title: 'Event Announcement', value: 'event' },
          { title: 'Industry News', value: 'news' },
        ],
      },
      initialValue: 'technical'
    }),

    // --- SECTION 2: VISUALS & SUMMARY ---
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 3,
      description: 'A brief 2-3 sentence overview for the news listing page.',
    }),

    // --- SECTION 3: THE BODY ---
    defineField({
      name: 'body',
      title: 'Project Body',
      description: 'Main content area.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code/Log', value: 'code'}, 
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),

    // --- SECTION 4: DOCUMENTATION & REFERENCES ---
    defineField({
      name: 'references',
      title: 'External References',
      description: 'List of citations or external links.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'referenceItem',
          fields: [
            {
              name: 'label',
              title: 'Source Name',
              type: 'string',
              placeholder: 'e.g., ResearchGate, Nature, GitHub',
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
})