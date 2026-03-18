import { defineField, defineType } from 'sanity'

export const trainingType = defineType({
  name: 'training',
  title: 'Training Program',
  type: 'document',
  fields: [
    // --- SECTION 1: IDENTITY ---
    defineField({
      name: 'title',
      title: 'Training Name',
      type: 'string',
      description: 'The full name of the training program.',
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

    // --- SECTION 2: SCHEDULE ---
    defineField({
      name: 'dateFrom',
      title: 'Start Date & Time',
      type: 'datetime',
      description: 'When the training begins.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateTo',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'When the training ends.',
      validation: (Rule) => Rule.required(),
    }),

    // --- SECTION 3: LOGISTICS ---
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Physical address or "Online / Virtual".',
      validation: (Rule) => Rule.required(),
    }),

    // --- SECTION 4: INSTRUCTOR ---
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Job Title / Credentials',
          type: 'string',
        },
        {
          name: 'bio',
          title: 'Short Bio',
          type: 'text',
          rows: 3,
        },
        {
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),

    // --- SECTION 5: REQUIREMENTS & TAGS ---
    defineField({
      name: 'specialties',
      title: 'Specialties Required',
      type: 'array',
      description: 'Add each required specialty as a tag.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'applications',
      title: 'Applications (Tags)',
      type: 'array',
      description: 'Relevant application areas, technologies, or industries (e.g. CRISPR, Cell Therapy, QC/QA).',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // --- SECTION 6: CONTENT ---
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
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
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      description: 'A concise 2–3 sentence description for the training listing page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Full Description',
      type: 'array',
      description: 'Detailed content about the training program.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),

    // --- SECTION 7: META ---
    defineField({
      name: 'capacity',
      title: 'Max Capacity',
      type: 'number',
      description: 'Maximum number of participants.',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration / Apply URL',
      type: 'url',
      description: 'External link where users can register or apply.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dateFrom',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('en-AE', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : 'No date set',
        media,
      }
    },
  },
})
