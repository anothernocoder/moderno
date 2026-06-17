import { defineCollection } from 'astro:content'
import { z } from 'astro:schema'
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({
    loader: i18nLoader(),
    // Custom UI strings used by PageTitle.astro's "copy as Markdown" button.
    schema: i18nSchema({
      extend: z.object({
        'pageTitle.copyMarkdown': z.string().optional(),
        'pageTitle.copyMarkdownAria': z.string().optional(),
        'pageTitle.copied': z.string().optional(),
      }),
    }),
  }),
}
